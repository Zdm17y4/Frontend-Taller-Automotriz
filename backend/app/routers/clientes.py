from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.cliente import ClienteOut
from app.schemas.persona import PersonaCreate, PersonaUpdate
from app.services import cliente_service

router = APIRouter()

@router.get("/", response_model=List[ClienteOut])
def listar_clientes(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    return cliente_service.obtener_clientes(db, skip=skip, limit=limit)

@router.get("/{numero_documento}", response_model=ClienteOut)
def buscar_cliente_por_dni(numero_documento: str, db: Session = Depends(get_db)):
    cliente = cliente_service.obtener_cliente_por_dni(db, numero_documento=numero_documento)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return cliente

@router.post("/", response_model=ClienteOut, status_code=201)
def registrar_cliente(cliente_in: PersonaCreate, db: Session = Depends(get_db)):
    return cliente_service.crear_cliente(db=db, persona_data=cliente_in)

@router.put("/{cliente_id}", response_model=ClienteOut)
def actualizar_cliente(cliente_id: int, cliente_in: PersonaUpdate, db: Session = Depends(get_db)):
    return cliente_service.actualizar_cliente(db=db, cliente_id=cliente_id, persona_data=cliente_in)
