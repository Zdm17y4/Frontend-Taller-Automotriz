from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class Tecnico(Base):
    __tablename__ = "tecnico"

    id = Column(Integer, primary_key=True, index=True)
    persona_id = Column(Integer, ForeignKey("persona.id"), unique=True, nullable=False)
    especialidad = Column(String(100), nullable=True)

    persona = relationship("Persona")


class OST(Base):
    __tablename__ = "ost"

    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String(20), unique=True, index=True, nullable=False)
    estado = Column(String(20), nullable=False, default="PENDIENTE")

    cliente_id = Column(Integer, ForeignKey("cliente.id"), nullable=False)
    placa = Column(String(10), nullable=False)
    marca = Column(String(50), nullable=False)
    modelo = Column(String(50), nullable=False)
    falla_reportada = Column(Text, nullable=False)

    fecha_ingreso = Column(DateTime(timezone=True), server_default=func.now())
    fecha_cierre = Column(DateTime(timezone=True), nullable=True)

    cliente = relationship("Cliente")
    tecnicos_asignados = relationship("OSTTecnico", back_populates="ost")
    informe = relationship("InformeTecnico", back_populates="ost", uselist=False)


class OSTTecnico(Base):
    __tablename__ = "ost_tecnico"

    id = Column(Integer, primary_key=True, index=True)
    ost_id = Column(Integer, ForeignKey("ost.id"), nullable=False)
    tecnico_id = Column(Integer, ForeignKey("tecnico.id"), nullable=False)
    tarea = Column(Text, nullable=True)

    ost = relationship("OST", back_populates="tecnicos_asignados")
    tecnico = relationship("Tecnico")
