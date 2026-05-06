from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import crud, schemas, models, auth
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.ServiceDisplay)
def create_service(
    service: schemas.ServiceCreate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.create_service(db=db, service=service, user_id=current_user.id)

@router.get("/", response_model=List[schemas.ServiceDisplay])
def read_services(
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.get_services(db, user_id=current_user.id)

@router.delete("/{service_id}")
def delete_service(
    service_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    db_service = db.query(models.Service).filter(
        models.Service.id == service_id, 
        models.Service.user_id == current_user.id
    ).first()
    
    if not db_service:
        raise HTTPException(status_code=404, detail="Serviço não encontrado")
    
    db.delete(db_service)
    db.commit()
    return {"message": "Serviço excluído com sucesso"}
