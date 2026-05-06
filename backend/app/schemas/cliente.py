from pydantic import BaseModel
from app.schemas.persona import PersonaOut, PersonaCreate

class ClienteBase(BaseModel):
    pass

class ClienteCreate(BaseModel):
    # Cuando creamos un cliente desde el frontend, enviamos los datos de persona
    persona: PersonaCreate

class ClienteOut(ClienteBase):
    id: int
    persona_id: int
    
    # Esto traerá toda la data de la persona (nombres, dni, etc.) automáticamente
    persona: PersonaOut
    
    class Config:
        from_attributes = True
