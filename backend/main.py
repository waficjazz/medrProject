from fastapi import FastAPI,status
from models import Books
from database import engine
from sqlmodel import Session,select
from typing import List

app=FastAPI()

session = Session(bind=engine)

@app.get('/',response_model=List[Books],status_code=status.HTTP_200_OK)
async def get_all():
    statement=select(Books)
    results=session.exec(statement).all()
    return results