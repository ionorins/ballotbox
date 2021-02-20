from sys import maxsize

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.param_functions import Body
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer

from .models import AnswerModel, AttendeeModel, CommentModel, PostAnswerModel, PostCommentModel

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="attendee/login/{event}")

# retreives attendee's profile from db, raises error if something goes wrong


async def get_attendee_profile(request, access_token):
    attendee = await request.app.mongodb["attendees"].find_one({
        "access_token": access_token
    })

    if attendee is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

    if attendee["event"] == "{event}":
        return attendee

    event = await request.app.mongodb["events"].find_one({
        "code": attendee["event"]
    })

    if event is None or not event["active"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

    return attendee

# returns alias given access token


async def get_alias(request, access_token):
    if access_token == "Host":
        return {"id": "Host", "name": "Host"}

    attendee = await request.app.mongodb["attendees"].find_one({
        "access_token": access_token
    })

    if attendee is None:
        return None

    return {"id": str(attendee["_id"]), "name": attendee["alias"]}

# checks whether received event code is valid


async def check_event_exists(request, code):
    if code == "{event}":
        return

    event = await request.app.mongodb["events"].find_one({
        "code": code
    })

    if event is None or not event["active"]:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")

# checks if attendee is part of the event with specified code


async def check_event(request, access_token, code):
    if code == "{event}":
        return

    attendee = await request.app.mongodb["attendees"].find_one({
        "access_token": access_token
    })

    event = await request.app.mongodb["events"].find_one({
        "code": code
    })

    if attendee is None or event is None or not event["active"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")


@router.post("/login/{event}")
async def login(request: Request, event: str):
    await check_event_exists(request, event)

    # generate attendee
    attendee = AttendeeModel()
    attendee.event = event
    attendee = jsonable_encoder(attendee)

    # save attendee
    await request.app.mongodb["attendees"].insert_one(attendee)

    return JSONResponse(status_code=status.HTTP_200_OK, content={"access_token": attendee["access_token"]})


@router.post("/logout")
async def logout(request: Request, access_token: str = Depends(oauth2_scheme)):
    # delete session from database
    await request.app.mongodb["attendees"].delete_one({
        "access_token": access_token
    })

    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


@router.post("/alias/{alias}")
async def change_alias(alias: str, request: Request, access_token: str = Depends(oauth2_scheme)):
    await get_attendee_profile(request, access_token)

    # do not allow alias to clash with host's alias
    if alias == "Host":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Alias not allowed")

    # update in database
    await request.app.mongodb["attendees"].update_one({
        "access_token": access_token
    }, {
        "$set": {
            "alias": alias
        }
    })

    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


@router.post("/comment")
async def comment(request: Request, access_token: str = Depends(oauth2_scheme), comment: PostCommentModel = Body(...)):
    attendee = await get_attendee_profile(request, access_token)

    # create comment
    new_comment = CommentModel()
    new_comment.content = comment.content
    new_comment.author = attendee["access_token"]
    new_comment.event = attendee["event"]
    new_comment = jsonable_encoder(new_comment)

    # save comment
    await request.app.mongodb["comments"].insert_one(new_comment)

    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


@router.get("/comments")
async def get_comments(request: Request, access_token: str = Depends(oauth2_scheme)):
    attendee = await get_attendee_profile(request, access_token)

    comments = []

    # go through each comment in database
    for comment in await request.app.mongodb["comments"].find({
        "event": attendee["event"]
    }).to_list(length=maxsize):
        comment["id"] = comment.pop("_id")
        # change author id to alias
        comment["author"] = await get_alias(request, comment["author"])
        # check whether attendee has liked the comment
        comment["liked"] = access_token in comment["likes"]
        # count number of likes
        comment["likes"] = len(comment["likes"])
        comments.append(comment)

    return JSONResponse(status_code=status.HTTP_200_OK, content=comments)


@router.post("/comment/like/{id}")
async def like_comment(id: str, request: Request, access_token: str = Depends(oauth2_scheme)):
    attendee = await get_attendee_profile(request, access_token)

    # find comment
    comment = await request.app.mongodb["comments"].find_one({
        "_id": id,
        "event": attendee["event"]
    })

    # return error if comment was not found
    if comment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not found")

    # like if comment was not liked, unlike if it was already liked
    if access_token in comment["likes"]:
        comment["likes"].remove(access_token)
    else:
        comment["likes"].append(access_token)

    # update in db
    await request.app.mongodb["comments"].update_one({
        "_id": id
    }, {
        "$set": comment
    })

    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


@router.get("/polls")
async def get_polls(request: Request, access_token: str = Depends(oauth2_scheme)):
    attendee = await get_attendee_profile(request, access_token)

    polls = []

    # go through each comment in database
    for poll in await request.app.mongodb["polls"].find({
        "event": attendee["event"]
    }).to_list(length=maxsize):
        poll["id"] = poll.pop("_id")
        # check whether attendee has answered the poll
        poll["answered"] = any(
            x["attendee"] == access_token for x in poll["answers"])
        # remove answers
        del poll["answers"]
        polls.append(poll)

    return JSONResponse(status_code=status.HTTP_200_OK, content=polls)


@router.post("/poll/{id}/answer")
async def answer(id: str, request: Request, access_token: str = Depends(oauth2_scheme), new_answer: PostAnswerModel = Body(...)):
    attendee = await get_attendee_profile(request, access_token)

    # find poll in database
    poll = await request.app.mongodb["polls"].find_one({
        "_id": id,
        "event": attendee["event"]
    })

    # return error if poll was not found
    if poll is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not found")

    # create anwer object containing received content
    answer = AnswerModel()
    answer.attendee = access_token
    answer.content = new_answer.content
    answer = jsonable_encoder(answer)

    # add answer to poll
    poll["answers"].append(answer)

    # update in db
    await request.app.mongodb["polls"].update_one({
        "_id": id
    }, {
        "$set": poll
    })

    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")
