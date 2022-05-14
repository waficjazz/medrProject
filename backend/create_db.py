from re import S
from sqlmodel import SQLModel
from models import Books
from database import engine


SQLModel.metadata.create_all(engine)