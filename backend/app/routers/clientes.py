from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.cliente import ClienteOut
from app.schemas.persona import PersonaCreate
from app.services import cliente_service

router = APIRouter()

@router.get("/", response_model=List[ClienteOut])
def listar_clientes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return cliente_service.obtener_clientes(db, skip=skip, limit=limit)

@router.post("/", response_model=ClienteOut, status_code=201)
def registrar_cliente(cliente_in: PersonaCreate, db: Session = Depends(get_db)):
    return cliente_service.crear_cliente(db=db, persona_data=cliente_in)
