from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date
from .. import crud, schemas, models, auth
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.AppointmentDisplay)
def create_appointment(
    appointment: schemas.AppointmentCreate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth.get_current_user)
):
    # Opcional: Validar se cliente e serviço pertencem ao usuário
    client = db.query(models.Client).filter(models.Client.id == appointment.client_id, models.Client.user_id == current_user.id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    
    service = db.query(models.Service).filter(models.Service.id == appointment.service_id, models.Service.user_id == current_user.id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Serviço não encontrado")

    return crud.create_appointment(db=db, appointment=appointment, user_id=current_user.id)

@router.get("/", response_model=List[schemas.AppointmentDisplay])
def read_appointments(
    date: Optional[date] = None,
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth.get_current_user)
):
    return crud.get_appointments(db, user_id=current_user.id, date=date)
