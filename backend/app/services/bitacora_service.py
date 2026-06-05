from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional
from app.models.bitacora import Bitacora
from app.schemas.bitacora import BitacoraCreate


def crear_bitacora(db: Session, bitacora_data: BitacoraCreate) -> Bitacora:
    nueva = Bitacora(
        problema=bitacora_data.problema,
        solucion=bitacora_data.solucion
    )
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return nueva


def obtener_bitacoras(
    db: Session,
    busqueda: Optional[str] = None,
    skip: int = 0,
    limit: int = 20
):
    query = db.query(Bitacora)

    if busqueda:
        filtro = f"%{busqueda}%"
        query = query.filter(
            or_(
                Bitacora.problema.ilike(filtro),
                Bitacora.solucion.ilike(filtro)
            )
        )

    return query.order_by(Bitacora.created_at.desc()).offset(skip).limit(limit).all()


def obtener_bitacora_por_id(db: Session, bitacora_id: int) -> Bitacora:
    from fastapi import HTTPException, status
    bitacora = db.query(Bitacora).filter(Bitacora.id == bitacora_id).first()
    if not bitacora:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Registro de bitácora no encontrado"
        )
    return bitacora
