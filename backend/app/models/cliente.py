from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Cliente(Base):
    __tablename__ = "cliente"

    id = Column(Integer, primary_key=True, index=True)
    persona_id = Column(Integer, ForeignKey("persona.id"), unique=True, nullable=False)
    
    persona = relationship("Persona")
