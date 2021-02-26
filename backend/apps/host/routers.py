import copy
from math import sqrt
from random import random
from sys import maxsize
from time import time

import numpy as np
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

# check if host owns event with specified code


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

    # get events from database
    for event in await request.app.mongodb["events"].find({
        "host": host["username"]
    }).to_list(length=maxsize):
        del event["_id"]
        events.append(event)

    return JSONResponse(status_code=status.HTTP_200_OK, content=events)


@router.get("/event/{code}")
async def get_event(code: str, request: Request, access_token: str = Depends(oauth2_scheme)):
    host = await get_host_profile(request, access_token)

    # get event from database
    event = await request.app.mongodb["events"].find_one({
        "host": host["username"],
        "code": code
    })

    # return error if event was not found
    if event is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    del event["_id"]

    return JSONResponse(status_code=status.HTTP_200_OK, content=event)


@router.put("/event/{code}")
async def update_event(code: str, request: Request, new_event: UpdateEventModel = Body(...), access_token: str = Depends(oauth2_scheme)):
    host = await get_host_profile(request, access_token)

    # create dict from UpdateEventModel object
    event = {k: v for k, v in new_event.dict().items() if v is not None}

    # update event
    if len(event) >= 1:
        update_result = await request.app.mongodb["events"].update_one(
            {"code": code, "host": host["username"]}, {"$set": event}
        )

    # if succesfull, return ok
        if update_result.modified_count == 1:
            if (
               await request.app.mongodb["events"].find_one({"code": code})
               ) is not None:
                return JSONResponse(status_code=status.HTTP_200_OK, content="ok")

    if (
        await request.app.mongodb["events"].find_one({"code": code})
    ) is not None:
        return JSONResponse(status_code=status.HTTP_200_OK, content="ok")

    # otherwise, return error
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
    new_comment.moods = list(np.random.dirichlet(np.ones(5), size=1)[0])
    new_comment.polarity = 2 * random() - 1
    new_comment = jsonable_encoder(new_comment)

    # save comment
    await request.app.mongodb["comments"].insert_one(new_comment)

    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


@router.post("/event/{code}/comment/like/{id}")
async def like_comment(code: str, id: str, request: Request, access_token: str = Depends(oauth2_scheme)):
    host = await get_host_profile(request, access_token)
    await check_event(request, host["username"], code)

    # find comment in database
    comment = await request.app.mongodb["comments"].find_one({
        "_id": id,
        "event": code
    })

    # return error if not found
    if comment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not found")

    # like if comment was not liked, unlike if it was already liked
    if "Host" in comment["likes"]:
        comment["likes"].remove("Host")
    else:
        comment["likes"].append("Host")

    # update in db
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

    # go through each comment in database
    for comment in await request.app.mongodb["comments"].find({
        "event": code
    }).to_list(length=maxsize):
        comment["id"] = comment.pop("_id")
        # change author id to alias
        comment["author"] = await get_alias(request, comment["author"])
        # check whether attendee has liked the comment
        comment["liked"] = "Host" in comment["likes"]
        # count number of likes
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

    # go through each poll in database
    for poll in await request.app.mongodb["polls"].find({
        "event": code
    }).to_list(length=maxsize):
        poll["id"] = poll.pop("_id")
        # remove ids from answers
        poll["answers"] = [x["content"] for x in poll["answers"]]
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

    # return error if poll was not found
    if poll is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Poll not found")

    # update poll content
    poll["content"] = new_poll.content

    # update database
    await request.app.mongodb["polls"].update_one(
        {"_id": id}, {"$set": poll}
    )

    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")


@router.get("/event/{code}/attendees")
async def get_attendees(code: str, request: Request, access_token: str = Depends(oauth2_scheme)):
    host = await get_host_profile(request, access_token)
    await check_event(request, host["username"], code)

    attendees = []

    # go through each attendee in database
    for attendee in await request.app.mongodb["attendees"].find({
        "event": code
    }).to_list(length=maxsize):
        # change id to alias
        attendee = await get_alias(request, attendee["access_token"])
        attendees.append(attendee)

    return JSONResponse(status_code=status.HTTP_200_OK, content=attendees)


@router.get("/event/{code}/mood/polarity")
async def get_polarity(code: str, request: Request, access_token: str = Depends(oauth2_scheme), interval: int = 300):
    host = await get_host_profile(request, access_token)
    await check_event(request, host["username"], code)

    # return error if interval is non-positive
    if interval <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Interval must be positive")

    polarities = {}
    first_time = None

    # go through each comment in database
    for comment in await request.app.mongodb["comments"].find({
        "event": code
    }).sort("timestamp").to_list(length=maxsize):
        # remember time of first comment
        if first_time is None:
            first_time = comment["timestamp"]

        # calculate the index of the interval the comment is in
        time_bin = int(comment["timestamp"] - first_time) // (interval * 60)

        # add probablity to interval and weight it by (1 + no likes)
        if time_bin not in polarities:
            polarities[time_bin] = []
        polarities[time_bin] += (1 + len(comment["likes"])
                                 ) * [comment["polarity"]]

    # average each interval
    last_bin = int(time() - first_time) // (interval * 60)

    polarities_list = []

    for i in range(last_bin + 1):
        polarity = polarities.get(i, [0])
        polarities_list.append(sum(polarity) / len(polarity))

    for i in range(last_bin + 1):
        polarity = polarities.get(i, [0])
        polarities_list.append({
            # time since first comment in minutes with one decimal place
            "x": "{:.1f}".format(interval * i),
            "y": sum(polarity) / len(polarity)
        })

    return JSONResponse(status_code=status.HTTP_200_OK, content=[{
        "id": "Polarity",
        "data": polarities_list
    }])


@router.get("/event/{code}/mood/{emotion}")
async def get_mood(code: str, emotion: str, request: Request, access_token: str = Depends(oauth2_scheme), interval: int = 300):
    host = await get_host_profile(request, access_token)
    await check_event(request, host["username"], code)

    emotions = ["joy", "anger", "fear", "sadness", "love"]

    # return error if interval is non-positive
    if interval <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Interval must be positive")

    # return error if emotion is not in list
    if emotion not in emotions:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Mood not found :(")

    moods = {}
    first_time = None

    # go through each comment in database
    for comment in await request.app.mongodb["comments"].find({
        "event": code
    }).sort("timestamp").to_list(length=maxsize):
        # remember time of first comment
        if first_time is None:
            first_time = comment["timestamp"]

        # calculate the index of the interval the comment is in
        time_bin = int(comment["timestamp"] - first_time) // (interval * 60)

        # add probablity to interval and weight it by (1 + no likes)
        if time_bin not in moods:
            moods[time_bin] = []
        moods[time_bin] += (1 + len(comment["likes"])) * \
            [comment["moods"][emotions.index(emotion)]]

    # average each interval
    last_bin = int(time() - first_time) // (interval * 60)

    moods_list = []

    for i in range(last_bin + 1):
        mood = moods.get(i, [0])
        moods_list.append(sum(mood) / len(mood))

    return JSONResponse(status_code=status.HTTP_200_OK, content=moods_list)


@router.get("/event/{code}/mood")
async def get_current_mood(code: str, request: Request, access_token: str = Depends(oauth2_scheme), interval: int = 300):
    host = await get_host_profile(request, access_token)
    await check_event(request, host["username"], code)

    emotions = ["joy", "anger", "fear", "sadness", "love"]

    # return error if interval is non-positive
    if interval <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Interval must be positive")

    moods = []

    # go through each comment in database and remember weighted by likes mood
    for comment in await request.app.mongodb["comments"].find({
        "event": code,
        "timestamp": {"$gt": time() - 60 * interval}
    }).to_list(length=maxsize):
        moods += (1 + len(comment["likes"])) * [comment["moods"]]

    if len(moods) == 0:
        return JSONResponse(status_code=status.HTTP_200_OK, content={
            "joy": 0,
            "anger": 0,
            "fear": 0,
            "sadness": 0,
            "love": 0
        })

    # average mood and take square root (moods will be represented as areas)
    moods = [sqrt(sum(i) / len(i)) for i in zip(*moods)]

    # label avarages
    result = {}

    for k, v in zip(emotions, moods):
        result[k] = v

    return JSONResponse(status_code=status.HTTP_200_OK, content=result)
