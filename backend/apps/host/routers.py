from .models import EventModel, UpdateEventModel
from fastapi import APIRouter, Body, Depends, HTTPException, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from time import time
from sys import maxsize
import copy

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# retreives host's profile from db, raises error if something goes wrong


async def get_host_profile(request, access_token):
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

    del host['_id']

    return host


@router.post("/event")
async def create_event(request: Request, access_token: str = Depends(oauth2_scheme)):
    host = await get_host_profile(request, access_token)

    # create event
    event = EventModel()
    event.host = host["username"]
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
async def update_event(code: str, request: Request, task: UpdateEventModel = Body(...), access_token: str = Depends(oauth2_scheme)):
    host = await get_host_profile(request, access_token)

    event = {k: v for k, v in task.dict().items() if v is not None}

    if len(event) >= 1:
        update_result = await request.app.mongodb["events"].update_one(
            {"code": code, "host": host['username']}, {"$set": event}
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
