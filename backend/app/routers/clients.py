from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, models, auth
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.ClientDisplay)
def create_client(
    client: schemas.ClientCreate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.create_client(db=db, client=client, user_id=current_user.id)

@router.get("/", response_model=List[schemas.ClientDisplay])
def read_clients(
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth.get_current_user)
):
    clients = crud.get_clients(db, user_id=current_user.id)
    return clients