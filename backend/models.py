from sqlmodel import SQLModel,Field
from typing import Optional

class Books(SQLModel,table=True):
    id:Optional[int]=Field(default=None,primary_key=True)
    title:str
    description:str