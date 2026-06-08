from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.catalogos import TipoDocumentoOut, SexoOut
from app.services import catalogos_service

router = APIRouter()

@router.get("/tipo-documento", response_model=List[TipoDocumentoOut])
def listar_tipos_documento(db: Session = Depends(get_db)):
    return catalogos_service.obtener_tipos_documento(db)

@router.get("/sexo", response_model=List[SexoOut])
def listar_sexos(db: Session = Depends(get_db)):
    return catalogos_service.obtener_sexos(db)
