from typing import List, Optional

from pydantic import BaseModel, Field
import secrets
from time import time

id_factory = lambda : secrets.token_urlsafe(64)

class AttendeeModel(BaseModel):
    access_token: str = Field(index=True, default_factory=id_factory)
    event: str = Field(default=None)
    alias: str = Field(default=None)

    class Config:
        allow_population_by_field_name = True

class CommentModel(BaseModel):
    id: str = Field(index=True, default_factory=id_factory, alias='_id')
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
