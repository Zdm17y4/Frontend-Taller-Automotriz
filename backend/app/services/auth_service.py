from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.usuario import Usuario
from app.schemas.auth import UsuarioCreate
from app.core.security import get_password_hash, verify_password


def obtener_usuario_por_email(db: Session, email: str):
    return db.query(Usuario).filter(Usuario.email == email).first()


def registrar_usuario(db: Session, usuario_in: UsuarioCreate):
    usuario_existente = obtener_usuario_por_email(db, email=usuario_in.email)
    if usuario_existente:
        raise HTTPException(status_code=400, detail="El correo ya esta registrado")

    nuevo_usuario = Usuario(
        email=usuario_in.email,
        password_hash=get_password_hash(usuario_in.password),
        persona_id=usuario_in.persona_id,
        rol_id=usuario_in.rol_id,
    )
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario


def autenticar_usuario(db: Session, email: str, password: str):
    usuario = obtener_usuario_por_email(db, email=email)
    if not usuario:
        return False
    if not verify_password(password, usuario.password_hash):
        return False
    return usuario
