from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.schemas.catalogos import TipoDocumentoOut, SexoOut

class PersonaBase(BaseModel):
    tipo_documento_id: int
    numero_documento: str
    nombres: str
    apellido_paterno: str
    apellido_materno: str
    direccion: Optional[str] = None
    telefono: Optional[str] = None
    sexo_id: int

class PersonaCreate(PersonaBase):
    pass

class PersonaOut(PersonaBase):
    id: int
    created_at: datetime
    
    tipo_documento: TipoDocumentoOut
    sexo: SexoOut
    
    class Config:
        from_attributes = True
