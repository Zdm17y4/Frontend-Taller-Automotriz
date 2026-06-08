from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.persona import Persona
from app.models.cliente import Cliente
from app.schemas.persona import PersonaCreate, PersonaUpdate

def obtener_clientes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Cliente).offset(skip).limit(limit).all()

def obtener_cliente_por_dni(db: Session, numero_documento: str):
    cliente = db.query(Cliente).join(Persona).filter(Persona.numero_documento == numero_documento).first()
    return cliente

def obtener_cliente_por_id(db: Session, cliente_id: int):
    return db.query(Cliente).filter(Cliente.id == cliente_id).first()

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

def actualizar_cliente(db: Session, cliente_id: int, persona_data: PersonaUpdate):
    cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    persona = db.query(Persona).filter(Persona.id == cliente.persona_id).first()
    if not persona:
        raise HTTPException(status_code=404, detail="Persona asociada al cliente no encontrada")

    campos_a_actualizar = persona_data.model_dump(exclude_unset=True)
    for campo, valor in campos_a_actualizar.items():
        setattr(persona, campo, valor)

    db.commit()
    db.refresh(persona)
    db.refresh(cliente)
    return cliente
