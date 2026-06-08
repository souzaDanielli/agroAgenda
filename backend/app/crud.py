from sqlalchemy.orm import Session, joinedload
import datetime
from . import models, schemas, auth

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(
        name=user.name,
        email=user.email,
        password_hash=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_clients(db: Session, user_id: int):
    return db.query(models.Client).filter(models.Client.user_id == user_id).all()

def create_client(db: Session, client: schemas.ClientCreate, user_id: int):
    db_client = models.Client(**client.model_dump(), user_id=user_id)
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

# Services
def get_services(db: Session, user_id: int):
    return db.query(models.Service).filter(models.Service.user_id == user_id).all()

def create_service(db: Session, service: schemas.ServiceCreate, user_id: int):
    db_service = models.Service(**service.model_dump(), user_id=user_id)
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service

# Appointments
def get_appointments(db: Session, user_id: int, date=None):
    query = db.query(models.Appointment).options(
        joinedload(models.Appointment.client),
        joinedload(models.Appointment.service)
    ).filter(models.Appointment.user_id == user_id)
    if date:
        day_start = datetime.datetime.combine(date, datetime.time.min)
        day_end = datetime.datetime.combine(date, datetime.time.max)
        query = query.filter(models.Appointment.appointment_date >= day_start, 
                             models.Appointment.appointment_date <= day_end)
    return query.all()

def create_appointment(db: Session, appointment: schemas.AppointmentCreate, user_id: int):
    db_appointment = models.Appointment(**appointment.model_dump(), user_id=user_id)
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    # Recarregar com os relacionamentos para retorno consistente com AppointmentDisplay
    return db.query(models.Appointment).options(
        joinedload(models.Appointment.client),
        joinedload(models.Appointment.service)
    ).filter(models.Appointment.id == db_appointment.id).first()
