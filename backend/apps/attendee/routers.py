from sys import maxsize

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.param_functions import Body
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer

from .models import AnswerModel, AttendeeModel, CommentModel, PostCommentModel

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


async def get_alias(request, access_token):
    if access_token == "Host":
        return "Host"

    attendee = await request.app.mongodb["attendees"].find_one({
        "access_token": access_token
    })

    if attendee is None:
        return None

    return attendee["alias"]


async def check_event_exists(request, code):
    if code == "{event}":
        return

    event = await request.app.mongodb["events"].find_one({
        "code": code
    })

    if event is None or not event["active"]:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")


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

    if alias == "Host":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Alias not allowed")

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

    for comment in await request.app.mongodb["comments"].find({
        "event": attendee["event"]
    }).to_list(length=maxsize):
        comment["id"] = comment.pop("_id")
        comment["author"] = await get_alias(request, comment["author"])
        comment["liked"] = access_token in comment["likes"]
        comment["likes"] = len(comment["likes"])
        comments.append(comment)

    return JSONResponse(status_code=status.HTTP_200_OK, content=comments)


@router.post("/comment/like/{id}")
async def like_comment(id: str, request: Request, access_token: str = Depends(oauth2_scheme)):
    attendee = await get_attendee_profile(request, access_token)

    comment = await request.app.mongodb["comments"].find_one({
        "_id": id,
        "event": attendee["event"]
    })

    if comment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not found")

    if access_token in comment["likes"]:
        comment["likes"].remove(access_token)
    else:
        comment["likes"].append(access_token)

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

    for poll in await request.app.mongodb["polls"].find({
        "event": attendee["event"]
    }).to_list(length=maxsize):
        poll["id"] = poll.pop("_id")
        polls.append(poll)

    return JSONResponse(status_code=status.HTTP_200_OK, content=polls)


@router.post("/poll/{id}/answer")
async def answer(id: str, request: Request, access_token: str = Depends(oauth2_scheme), answer: AnswerModel = Body(...)):
    attendee = await get_attendee_profile(request, access_token)

    poll = await request.app.mongodb["polls"].find_one({
        "_id": id,
        "event": attendee["event"]
    })

    if poll is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not found")

    poll["answers"].append(answer.content)

    await request.app.mongodb["polls"].update_one({
        "_id": id
    }, {
        "$set": poll
    })

    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")
