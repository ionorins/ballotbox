import bcrypt
from fastapi import APIRouter, Body, Depends, HTTPException, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from .models import HostModel, HostSessionModel

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


@router.post("/create")
async def create(request: Request, host: HostModel = Body(...)):
    # check if email already exists
    check = await request.app.mongodb["hosts"].find_one({
        "username": host.username,
    })

    if check is not None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Email already has an account")

    # create account
    hashed = bcrypt.hashpw(host.password, bcrypt.gensalt())
    host.password = hashed
    host = jsonable_encoder(host)
    await request.app.mongodb["hosts"].insert_one(host)

    # create and return session
    session = HostSessionModel()
    session.username = host['username']
    session.token_type = "bearer"
    session = jsonable_encoder(session)
    await request.app.mongodb["hostSessions"].insert_one(session)

    del session["_id"]

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=session)


@router.post("/login")
async def login(request: Request, form_data: OAuth2PasswordRequestForm = Depends()):
    # check email and password
    check = await request.app.mongodb["hosts"].find_one({
        "username": form_data.username,
    })

    if check is None or not bcrypt.checkpw(form_data.password.encode(), check["password"].encode()):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Email or password is incorrect")

    # create and return session
    session = HostSessionModel()
    session.username = form_data.username
    session.token_type = "bearer"
    session = jsonable_encoder(session)
    await request.app.mongodb["hostSessions"].insert_one(session)

    del session["_id"]

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=session)


@router.post("/logout")
async def logout(request: Request, access_token: str = Depends(oauth2_scheme)):
    # delete session from database
    await request.app.mongodb["hostSessions"].delete_one({
        "access_token": access_token
    })

    return JSONResponse(status_code=status.HTTP_200_OK, content="ok")
