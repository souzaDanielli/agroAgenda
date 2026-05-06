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

@router.delete("/{client_id}")
def delete_client(
    client_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    db_client = db.query(models.Client).filter(
        models.Client.id == client_id, 
        models.Client.user_id == current_user.id
    ).first()
    
    if not db_client:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    
    db.delete(db_client)
    db.commit()
    return {"message": "Cliente excluído com sucesso"}