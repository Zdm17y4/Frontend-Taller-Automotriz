from sqlalchemy import Column, Integer, String
from app.core.database import Base

class TipoDocumento(Base):
    __tablename__ = "tipo_documento"

    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String(5), unique=True, index=True, nullable=False)
    descripcion = Column(String(50), nullable=False)

class Sexo(Base):
    __tablename__ = "sexo"

    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String(1), unique=True, index=True, nullable=False)
    descripcion = Column(String(20), nullable=False)
