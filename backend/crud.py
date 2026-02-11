from sqlalchemy.orm import Session
from datetime import datetime
import models as models
import schemas as schemas

def crear_ticket(db:Session, ticket:schemas.TicketCreate):
    ahora = datetime.now()

    db_ticket = models.Ticket(
        codigo=ticket.codigo,
        estado=ticket.estado or "en_proceso",
        fecha=ahora.strftime("%Y-%m-%d"),
        hora_creacion=ahora.strftime("%H:%M:%S"),
        detalles=ticket.detalles
    )

    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)

    return db_ticket

def obtener_tickets(db:Session, skip: int = 0, limit: int = 100):
    return db.query(models.Ticket)\
        .order_by(models.Ticket.fecha.desc(), models.Ticket.hora_creacion.desc())\
        .offset(skip)\
        .limit(limit)\
        .all()


def obtener_ticket_por_id(db:Session, id: int):
    return db.query(models.Ticket)\
        .filter(models.Ticket.id == id)\
        .first()


def actualizar_ticket(db:Session, ticket_id: int, ticket_update: schemas.TicketUpdate):
    db_ticket = obtener_ticket_por_id(db, ticket_id)

    if not db_ticket:
        return None
    
    if ticket_update.estado is not None:

        if ticket_update.estado == "solucionado":
            db_ticket.fecha_cierre = datetime.now().strftime("%Y-%m-%d")

        else:
            db_ticket.fecha_cierre = None
            
        db_ticket.estado = ticket_update.estado

    if ticket_update.detalles is not None:
        db_ticket.detalles = ticket_update.detalles

    db.commit()
    db.refresh(db_ticket)

    return db_ticket


def eliminar_ticket(db:Session, ticket_id: int):
    db_ticket = obtener_ticket_por_id(db, ticket_id)

    if not db_ticket:
        return False
    
    db.delete(db_ticket)
    db.commit()

    return True

def obtener_historial_solucionados(db: Session):
    return db.query(models.Ticket).filter(models.Ticket.estado == "solucionado")\
    .order_by(models.Ticket.fecha.desc(), models.Ticket.hora_creacion).all()