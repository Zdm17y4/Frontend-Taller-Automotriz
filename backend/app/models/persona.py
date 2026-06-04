from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Persona(Base):
    __tablename__ = "persona"

    id = Column(Integer, primary_key=True, index=True)
    tipo_documento_id = Column(Integer, ForeignKey("tipo_documento.id"), nullable=False)
    numero_documento = Column(String(20), unique=True, index=True, nullable=False)
    
    nombres = Column(String(100), nullable=False)
    apellido_paterno = Column(String(100), nullable=False)
    apellido_materno = Column(String(100), nullable=False)
    
    direccion = Column(String(255), nullable=True)
    telefono = Column(String(20), nullable=True)
    sexo_id = Column(Integer, ForeignKey("sexo.id"), nullable=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    tipo_documento = relationship("TipoDocumento")
    sexo = relationship("Sexo")
