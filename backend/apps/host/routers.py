import copy
from sys import maxsize
from time import time

from fastapi import APIRouter, Body, Depends, HTTPException, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer

from .models import (CommentModel, EventModel, PollModel, PostCommentModel,
                     PostEventModel, PostPollModel, UpdateEventModel)

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# retreives host's profile from db, raises error if something goes wrong


async def get_host_profile(request, access_token):
    if access_token == "Host":
        return "Host"

    session = await request.app.mongodb["hostSessions"].find_one({
        "access_token": access_token
    })

    if session is None or session["expiration"] < time():
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed")

    host = await request.app.mongodb["hosts"].find_one({
        "username": session["username"]
    })

    if host is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed")

    del host["_id"]

    return host


async def get_alias(request, access_token):
    if access_token == "Host":
        return {"id": "Host", "name": "Host"}

    attendee = await request.app.mongodb["attendees"].find_one({
        "access_token": access_token
    })

    if attendee is None:
        return None

    return {"id": str(attendee["_id"]), "name": attendee["alias"]}


async def check_event(request, host, code):
    if code == "{event}":
        return

    event = await request.app.mongodb["events"].find_one({
        "code": code
    })

    if event is None or event["host"] != host:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")


@router.post("/event")
async def create_event(request: Request, access_token: str = Depends(oauth2_scheme), new_event: PostEventModel = Body(...)):
    host = await get_host_profile(request, access_token)

    # create event
    event = EventModel()
    event.host = host["username"]
    event.name = new_event.name
    event.timestamp = new_event.timestamp
    event = jsonable_encoder(event)

    # save event
    await request.app.mongodb["events"].insert_one(copy.deepcopy(event))

    return JSONResponse(status_code=status.HTTP_200_OK, content=event)


@router.get("/events")
async def get_events(request: Request, access_token: str = Depends(oauth2_scheme)):
    host = await get_host_profile(request, access_token)

    events = []

    for event in await request.app.mongodb["events"].find({
        "host": host["username"]
    }).to_list(length=maxsize):
        del event["_id"]
        events.append(event)

    return JSONResponse(status_code=status.HTTP_200_OK, content=events)


@router.get("/event/{code}")
async def get_event(code: str, request: Request, access_token: str = Depends(oauth2_scheme)):
    host = await get_host_profile(request, access_token)

    event = await request.app.mongodb["events"].find_one({
        "host": host["username"],
        "code": code
    })

    if event is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    del event["_id"]

    return JSONResponse(status_code=status.HTTP_200_OK, content=event)


@router.put("/event/{code}")
async def update_event(code: str, request: Request, new_event: UpdateEventModel = Body(...), access_token: str = Depends(oauth2_scheme)):
    host = await get_host_profile(request, access_token)

    event = {k: v for k, v in new_event.dict().items() if v is not None}

    if len(event) >= 1:
        update_result = await request.app.mongodb["events"].update_one(
            {"code": code, "host": host["username"]}, {"$set": event}
        )

        if update_result.modified_count == 1:
            if (
               await request.app.mongodb["events"].find_one({"code": code})
               ) is not None:
                return JSONResponse(status_code=status.HTTP_200_OK, content="ok")

    if (
        await request.app.mongodb["events"].find_one({"code": code})
    ) is not None:
        return JSONResponse(status_code=status.HTTP_200_OK, content="ok")

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail="Event not found")


@router.post("/event/{code}/comment")
async def comment(code: str, request: Request, access_token: str = Depends(oauth2_scheme), comment: PostCommentModel = Body(...)):
    host = await get_host_profile(request, access_token)

    await check_event(request, host["username"], code)

    # create comment
    new_comment = CommentModel()
    new_comment.content = comment.content
    new_comment.author = "Host"
    new_comment.event = code
    new_comment = jsonable_encoder(new_comment)

    # save comment
    await request.app.mongodb["comments"].insert_one(new_comment)

    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")

@router.post("/event/{code}/comment/like/{id}")
async def like_comment(code: str, id: str, request: Request, access_token: str = Depends(oauth2_scheme)):
    host = await get_host_profile(request, access_token)

    await check_event(request, host["username"], code)

    comment = await request.app.mongodb["comments"].find_one({
        "_id": id,
        "event": code
    })

    if comment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not found")

    if "Host" in comment["likes"]:
        comment["likes"].remove("Host")
    else:
        comment["likes"].append("Host")

    await request.app.mongodb["comments"].update_one({
        "_id": id
    }, {
        "$set": comment
    })

    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")

@router.get("/event/{code}/comments")
async def get_comments(code: str, request: Request, access_token: str = Depends(oauth2_scheme)):
    host = await get_host_profile(request, access_token)

    await check_event(request, host["username"], code)

    comments = []

    for comment in await request.app.mongodb["comments"].find({
        "event": code
    }).to_list(length=maxsize):
        comment["id"] = comment.pop("_id")
        comment["author"] = await get_alias(request, comment["author"])
        comment["liked"] = "Host" in comment["likes"]
        comment["likes"] = len(comment["likes"])
        comments.append(comment)

    return JSONResponse(status_code=status.HTTP_200_OK, content=comments)


@router.post("/event/{code}/poll")
async def create_poll(code: str, request: Request, access_token: str = Depends(oauth2_scheme), poll: PostPollModel = Body(...)):
    host = await get_host_profile(request, access_token)

    await check_event(request, host["username"], code)

    # create comment
    new_poll = PollModel()
    new_poll.content = poll.content
    new_poll.event = code
    new_poll = jsonable_encoder(new_poll)

    # save comment
    await request.app.mongodb["polls"].insert_one(new_poll)

    return JSONResponse(status_code=status.HTTP_200_OK, content=new_poll["_id"])


@router.get("/event/{code}/polls")
async def get_polls(code: str, request: Request, access_token: str = Depends(oauth2_scheme)):
    host = await get_host_profile(request, access_token)

    await check_event(request, host["username"], code)

    polls = []

    for poll in await request.app.mongodb["polls"].find({
        "event": code
    }).to_list(length=maxsize):
        poll["id"] = poll.pop("_id")
        polls.append(poll)

    return JSONResponse(status_code=status.HTTP_200_OK, content=polls)


@router.put("/event/{code}/poll/{id}")
async def update_poll(code: str, id: str, request: Request, new_poll: PostPollModel = Body(...), access_token: str = Depends(oauth2_scheme)):
    host = await get_host_profile(request, access_token)
    await check_event(request, host["username"], code)

    # check poll exists
    poll = await request.app.mongodb["polls"].find_one({
        "_id": id,
        "event": code
    })

    if poll is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Event not found")

    # update poll
    poll["content"] = new_poll.content

    await request.app.mongodb["polls"].update_one(
        {"_id": id}, {"$set": poll}
    )

    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


@router.get("/event/{code}/attendees")
async def get_attendees(code: str, request: Request, access_token: str = Depends(oauth2_scheme)):
    host = await get_host_profile(request, access_token)

    await check_event(request, host["username"], code)

    attendees = []

    for attendee in await request.app.mongodb["attendees"].find({
        "event": code
    }).to_list(length=maxsize):
        attendee = await get_alias(request, attendee["access_token"])
        attendees.append(attendee)

    return JSONResponse(status_code=status.HTTP_200_OK, content=attendees)
