from fastapi.param_functions import Body
from .models import AttendeeModel, CommentModel, PostCommentModel
from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from sys import maxsize

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="attendee/login/{event}")

# retreives attendee's profile from db, raises error if something goes wrong


async def get_attendee_profile(request, access_token):
    attendee = await request.app.mongodb["attendees"].find_one({
        "access_token": access_token
    })

    if attendee is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed")

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
    if code == '{event}':
        return

    event = await request.app.mongodb["events"].find_one({
        "code": code
    })

    if event is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")

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
async def logout(alias: str, request: Request, access_token: str = Depends(oauth2_scheme)):
    await get_attendee_profile(request, access_token)

    if alias == 'Host':
        alias = 'Not host'

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
    new_comment.author = attendee['access_token']
    new_comment.event = attendee['event']
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
async def get_comments(id: str, request: Request, access_token: str = Depends(oauth2_scheme)):
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
