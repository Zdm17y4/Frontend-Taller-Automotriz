from pydantic import BaseModel, EmailStr

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None

class UsuarioLogin(BaseModel):
    email: EmailStr
    password: str

class UsuarioCreate(BaseModel):
    email: EmailStr
    password: str
    persona_id: int
    rol_id: int

class UsuarioOut(BaseModel):
    id: int
    email: EmailStr
    persona_id: int
    rol_id: int

    class Config:
        from_attributes = True
