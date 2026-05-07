from pydantic import BaseModel
from app.schemas.persona import PersonaOut, PersonaCreate

class ClienteBase(BaseModel):
    pass

class ClienteCreate(BaseModel):
    persona: PersonaCreate

class ClienteOut(ClienteBase):
    id: int
    persona_id: int
    persona: PersonaOut
    
    class Config:
        from_attributes = True
