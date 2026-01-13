from pydantic import BaseModel, Field
from typing import Optional

class TicketBase(BaseModel):
    codigo: str = Field(..., min_length=1, max_length=100, description="Código del ticket")
    estado: Optional[str] = Field(default="en_proceso", description="Estado del ticket")
    detalles: Optional[str] = Field(default=None, description="Información del ticket")


class TicketCreate(TicketBase):
    pass


class TicketUpdate(BaseModel):
    estado: Optional[str] = None
    detalles: Optional[str] = None


class Ticket(TicketBase):
    id: int
    fecha: str
    hora_creacion: str


class Config:
    from_attributes = True