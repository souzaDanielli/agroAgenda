from fastapi import FastAPI, Depends, HTTPException
from database import engine, Base
import models
from routers import auth, clients, services, appointments

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AgroAgenda API")

app.include_router(auth.router)
app.include_router(clients.router, prefix="/clients", tags=["Clients"])
app.include_router(services.router, prefix="/services", tags=["Services"])
app.include_router(appointments.router, prefix="/appointments", tags=["Appointments"])

@app.get("/")
async def root():
    return {"message": "Bem-vindo à API AgroAgenda"}
