from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db, engine
import models
import crud
import schemas

models.Base.metadata.create_all(bind=engine)

api = APIRouter()

@api.get("/")
def root():
    return {
        "message": "API de gestión de tickets funcionando ✅",
        "version": "1.0.0",
        "endpoints": {
            "docs": "/docs",
            "tickets": "/tickets/"
        }
    } 

@api.get("/tickets")
def obtener_todos_tickets(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tickets = crud.obtener_tickets(db=db, skip=skip, limit=limit)
    return tickets

@api.post("/tickets")
def crear_ticket(ticket: schemas.TicketCreate, db: Session = Depends(get_db)):
    return crud.crear_ticket(db=db, ticket=ticket)

@api.put("/tickets/{id}")
def actualizar_ticket(id: int, ticket_update: schemas.TicketUpdate, db: Session = Depends(get_db)):
    ticket = crud.actualizar_ticket(db=db, ticket_id=id, ticket_update=ticket_update)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no Encontrado")
    return ticket

@api.delete("/tickets/{id}")
def eliminar_ticket(id: int, db: Session = Depends(get_db)):
    ticket = crud.eliminar_ticket(db=db, ticket_id=id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no Eliminado")
    return ticket