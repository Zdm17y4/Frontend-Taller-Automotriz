from pydantic import BaseModel

class CatalogoBase(BaseModel):
    codigo: str
    descripcion: str

class TipoDocumentoOut(CatalogoBase):
    id: int

    class Config:
        from_attributes = True

class SexoOut(CatalogoBase):
    id: int

    class Config:
        from_attributes = True
