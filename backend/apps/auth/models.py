import re
from typing import Optional

from pydantic import BaseModel, Field, validator
from pydantic.networks import EmailStr
from secrets import token_urlsafe
from time import time

password_regex = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
pattern = re.compile(password_regex)
expiration_factory = lambda : time() + 259200

class HostModel(BaseModel):
    username: EmailStr = Field(index=True)
    password: bytes = Field(...)

    @validator('password')
    def name_must_contain_space(cls, v):
        if pattern.match(v.decode()) is None:
            raise ValueError('Password is weak')
        return v

    class Config:
        allow_population_by_field_name = True

class HostSessionModel(BaseModel):
    username: Optional[EmailStr] = Field(index=True)
    access_token: str = Field(default_factory=token_urlsafe, index=True)
    expiration: float = Field(default_factory=expiration_factory)
    token_type: Optional[str] = Field(dafault='bearer')

    class Config:
        allow_population_by_field_name = True
