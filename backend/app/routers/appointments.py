from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
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

@router.patch("/{appointment_id}", response_model=schemas.AppointmentDisplay)
def update_appointment_status(
    appointment_id: int,
    appointment_update: schemas.AppointmentUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    db_appointment = db.query(models.Appointment).filter(
        models.Appointment.id == appointment_id, 
        models.Appointment.user_id == current_user.id
    ).first()
    
    if not db_appointment:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado")
    
    db_appointment.status = appointment_update.status
    db.commit()
    db.refresh(db_appointment)
    
    # Recarregar com relacionamentos para o response_model
    return db.query(models.Appointment).options(
        joinedload(models.Appointment.client),
        joinedload(models.Appointment.service)
    ).filter(models.Appointment.id == appointment_id).first()

@router.delete("/{appointment_id}")
def delete_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    db_appointment = db.query(models.Appointment).filter(
        models.Appointment.id == appointment_id, 
        models.Appointment.user_id == current_user.id
    ).first()
    
    if not db_appointment:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado")
    
    db.delete(db_appointment)
    db.commit()
    return {"message": "Agendamento excluído com sucesso"}

@router.put("/{appointment_id}", response_model=schemas.AppointmentDisplay)
def update_appointment(
    appointment_id: int,
    appointment: schemas.AppointmentCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    db_appointment = db.query(models.Appointment).filter(
        models.Appointment.id == appointment_id, 
        models.Appointment.user_id == current_user.id
    ).first()
    
    if not db_appointment:
        raise HTTPException(status_code=404, detail="Agendamento não encontrado")
    
    # Atualizar campos
    for key, value in appointment.model_dump().items():
        setattr(db_appointment, key, value)
    
    db.commit()
    db.refresh(db_appointment)
    
    return db.query(models.Appointment).options(
        joinedload(models.Appointment.client),
        joinedload(models.Appointment.service)
    ).filter(models.Appointment.id == appointment_id).first()
