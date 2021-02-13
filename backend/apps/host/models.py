import secrets
import string
from time import time
from typing import List, Optional

from pydantic import BaseModel, Field

alphabet = string.ascii_letters + string.digits
event_code_factory = lambda : "".join(secrets.choice(alphabet) for _ in range(8))
id_factory = lambda : secrets.token_urlsafe(64)

class EventModel(BaseModel):
    code: str = Field(index=True, default_factory=event_code_factory)
    host: Optional[str] = Field(index=True)
    active: bool = Field(default=True)

    class Config:
        allow_population_by_field_name = True

class UpdateEventModel(BaseModel):
    active: bool = Field(default=True)

    class Config:
        allow_population_by_field_name = True

class CommentModel(BaseModel):
    id: str = Field(index=True, default_factory=id_factory, alias="_id")
    content: str = Field(default=None)
    event: str = Field(index=True, default=None)
    author: str = Field(default=None)
    likes: List[str] = Field(default=[])
    moods: List[float] = Field(default=None)
    positivity: float = Field(default=None)
    timestamp: float = Field(default_factory=time)

    class Config:
        allow_population_by_field_name = True

class PostCommentModel(BaseModel):
    content: str

class PollModel(BaseModel):
    id: str = Field(index=True, default_factory=id_factory, alias="_id")
    event: str = Field(index=True, default=None)
    content: dict = Field(default=None)
    answers: List = Field(default=[])

class PostPollModel(BaseModel):
    content: dict = Field(default=None)

class AnswerModel(BaseModel):
    id: str = Field(index=True, default_factory=id_factory, alias="_id")
    content: dict = Field(default=None)

class PostAnswerModel(BaseModel):
    content: dict = Field(default=None)
