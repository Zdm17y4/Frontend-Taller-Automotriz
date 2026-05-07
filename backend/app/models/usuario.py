from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Rol(Base):
    __tablename__ = "rol"

    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String(20), unique=True, index=True, nullable=False)
    descripcion = Column(String(100), nullable=False)

class Usuario(Base):
    __tablename__ = "usuario"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(150), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    
    persona_id = Column(Integer, ForeignKey("persona.id"), unique=True, nullable=False)
    rol_id = Column(Integer, ForeignKey("rol.id"), nullable=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    persona = relationship("Persona")
    rol = relationship("Rol")
