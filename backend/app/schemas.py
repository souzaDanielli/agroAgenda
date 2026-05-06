from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserDisplay(UserBase):
    id: int
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user_name: str

class TokenData(BaseModel):
    email: Optional[str] = None

class ClientBase(BaseModel):
    name: str
    farm_name: Optional[str] = None
    location: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None

class ClientCreate(ClientBase):
    pass

class ClientDisplay(ClientBase):
    id: int
    user_id: int
    class Config:
        from_attributes = True

class ServiceBase(BaseModel):
    name: str
    description: Optional[str] = None
    base_price: Optional[float] = None
    estimated_duration: Optional[int] = None

class ServiceCreate(ServiceBase):
    pass

class ServiceDisplay(ServiceBase):
    id: int
    user_id: int
    class Config:
        from_attributes = True

class AppointmentBase(BaseModel):
    client_id: int
    service_id: int
    appointment_date: datetime
    status: Optional[str] = "scheduled"
    observations: Optional[str] = None

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentUpdate(BaseModel):
    status: str

class AppointmentDisplay(AppointmentBase):
    id: int
    user_id: int
    client: ClientDisplay
    service: ServiceDisplay
    class Config:
        from_attributes = True
