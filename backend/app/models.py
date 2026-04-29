from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, Text
from sqlalchemy.orm import relationship
from app.database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)

    clients = relationship("Client", back_populates="owner")
    services = relationship("Service", back_populates="owner")

class Client(Base):
    __tablename__ = "clients"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String, nullable=False)
    farm_name = Column(String)
    location = Column(String)
    phone = Column(String)
    email = Column(String)

    owner = relationship("User", back_populates="clients")
    appointments = relationship("Appointment", back_populates="client")

class Service(Base):
    __tablename__ = "services"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String, nullable=False)
    description = Column(Text)
    base_price = Column(Float)
    estimated_duration = Column(Integer) # Em minutos

    owner = relationship("User", back_populates="services")
    appointments = relationship("Appointment", back_populates="service")

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    client_id = Column(Integer, ForeignKey("clients.id"))
    service_id = Column(Integer, ForeignKey("services.id"))
    appointment_date = Column(DateTime, nullable=False)
    status = Column(String, default="scheduled") # scheduled, completed, cancelled
    observations = Column(Text)

    client = relationship("Client", back_populates="appointments")
    service = relationship("Service", back_populates="appointments")
