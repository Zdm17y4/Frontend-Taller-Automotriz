from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.auth import UsuarioCreate, UsuarioOut, Token, UsuarioLogin
from app.services import auth_service
from app.core.security import create_access_token

router = APIRouter()

@router.post("/register", response_model=UsuarioOut, status_code=status.HTTP_201_CREATED)
def registrar_usuario(usuario_in: UsuarioCreate, db: Session = Depends(get_db)):
    return auth_service.registrar_usuario(db, usuario_in)

@router.post("/login", response_model=Token)
def login(login_data: UsuarioLogin, db: Session = Depends(get_db)):
    usuario = auth_service.autenticar_usuario(db, email=login_data.email, password=login_data.password)
    
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(subject=usuario.email)
    
    return {"access_token": access_token, "token_type": "bearer"}
