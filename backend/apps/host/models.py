from typing import Optional

from pydantic import BaseModel, Field
import string
import secrets

alphabet = string.ascii_letters + string.digits
event_code_factory = lambda : ''.join(secrets.choice(alphabet) for _ in range(8))

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
