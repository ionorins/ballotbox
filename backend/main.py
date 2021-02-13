import uvicorn
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient

from apps.attendee.routers import router as attendee_router
from apps.auth.routers import router as auth_router
from apps.host.routers import router as host_router
from apps.todo.routers import router as todo_router
from config import settings

app = FastAPI()


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

app.mongodb_client = AsyncIOMotorClient(settings.DB_URL)
app.mongodb = app.mongodb_client[settings.DB_NAME]
# app.include_router(todo_router, tags=["tasks"], prefix="/task")
app.include_router(auth_router, tags=["auth"], prefix="/auth")
app.include_router(attendee_router, tags=["attendee"], prefix="/attendee")
app.include_router(host_router, tags=["host"], prefix="/host")


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        reload=settings.DEBUG_MODE,
        port=settings.PORT,
    )
