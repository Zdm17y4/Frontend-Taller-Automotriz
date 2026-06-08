from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.persona import Persona
from app.models.cliente import Cliente
from app.schemas.persona import PersonaCreate

def obtener_clientes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Cliente).offset(skip).limit(limit).all()

def obtener_cliente_por_dni(db: Session, numero_documento: str):
    cliente = db.query(Cliente).join(Persona).filter(Persona.numero_documento == numero_documento).first()
    return cliente

def crear_cliente(db: Session, persona_data: PersonaCreate):
    persona_existente = db.query(Persona).filter(Persona.numero_documento == persona_data.numero_documento).first()
    if persona_existente:
        raise HTTPException(status_code=400, detail="El número de documento ya está registrado en el sistema")

    nueva_persona = Persona(
        tipo_documento_id=persona_data.tipo_documento_id,
        numero_documento=persona_data.numero_documento,
        nombres=persona_data.nombres,
        apellido_paterno=persona_data.apellido_paterno,
        apellido_materno=persona_data.apellido_materno,
        direccion=persona_data.direccion,
        telefono=persona_data.telefono,
        sexo_id=persona_data.sexo_id
    )
    
    db.add(nueva_persona)
    db.commit()
    db.refresh(nueva_persona)

    nuevo_cliente = Cliente(persona_id=nueva_persona.id)
    db.add(nuevo_cliente)
    db.commit()
    db.refresh(nuevo_cliente)

    return nuevo_cliente
