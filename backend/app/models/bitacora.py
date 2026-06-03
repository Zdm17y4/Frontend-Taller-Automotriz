from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class Bitacora(Base):
    __tablename__ = "bitacora"

    id = Column(Integer, primary_key=True, index=True)
    problema = Column(Text, nullable=False)
    solucion = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class InformeTecnico(Base):
    __tablename__ = "informe_tecnico"

    id = Column(Integer, primary_key=True, index=True)
    ost_id = Column(Integer, ForeignKey("ost.id"), unique=True, nullable=False)
    bitacora_id = Column(Integer, ForeignKey("bitacora.id"), nullable=True)
    diagnostico = Column(Text, nullable=False)
    solucion_aplicada = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    ost = relationship("OST", back_populates="informe")
    bitacora = relationship("Bitacora")
