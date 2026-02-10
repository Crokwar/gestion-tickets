from sqlalchemy import Column, Integer, String
from database import Base

class Ticket(Base):

    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String, index=True, nullable=False)
    estado = Column(String, default="en_proceso", nullable=False)
    fecha = Column(String, nullable=False)
    hora_creacion = Column(String, nullable=False)
    fecha_cierre = Column(String, nullable=True)
    detalles = Column(String, nullable=True)

    def __repr__(self):
        #Así se verá representado el objeto
        return f"<Ticket(id={self.id}, codigo={self.codigo}, estado={self.estado})"