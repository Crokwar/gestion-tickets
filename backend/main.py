from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
import crud
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Gestión Tickets API",
    description="API para gestionar tickets de soporte técnico",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                   "https://gestion-tickets-frontend.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def root():
    return {
        "message": "API de gestión de tickets funcionando ✅",
        "version": "1.0.0",
        "endpoints": {
            "docs": "/docs",
            "tickets": "/tickets/"
        }
    }

@app.post("/tickets/", response_model=schemas.Ticket, status_code=201)
def crear_ticket(ticket: schemas.TicketCreate, db: Session = Depends(get_db)):
    return crud.crear_ticket(db=db, ticket=ticket)

@app.get("tickets/", response_model=List[schemas.Ticket])
def obtener_todos_los_tickets(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    tickets = crud.obtener_tickets(db=db, skip=skip, limit=limit)
    return tickets

@app.get("/tickets/fecha/{fecha}", response_model=List[schemas.Ticket])
def obtener_tickets_por_fecha(fecha:str, db:Session = Depends(get_db)):
    tickets = crud.obtener_tickets_por_fecha(db=db, fecha=fecha)
    return tickets

@app.get("/tickets/{ticket_id}", response_model=schemas.Ticket)
def obtener_ticket(ticket_id: int, db: Session = Depends(get_db)):
    ticket = crud.obtener_ticket_por_id(db=db, ticket_id=ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no Encontrado")
    return ticket


@app.put("/tickets/{ticket_id}", response_model=schemas.Ticket)
def actualizar_ticket(
    ticket_id: int,
    ticket_update: schemas.TicketUpdate,
    db: Session =Depends(get_db)
):
    ticket = crud.actualizar_ticket(db=db, ticket_id=ticket_id, ticket_update=ticket_update)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no Encontrado")
    return ticket

@app.delete("/tickets/{ticket_id}", status_code=204)
def eliminar_ticket(ticket_id: int, db: Session = Depends(get_db)):
    eliminado = crud.eliminar_ticket(db=db, ticket_id=ticket_id)
    if not eliminado:
        raise HTTPException(status_code=404, detail="Ticket no Encontrado")
    return None


@app.get("/healt")
def health_check():
    return {
        "status": "healthy",
        "service": "gestion-tickets-api"
    }


