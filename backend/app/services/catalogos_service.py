from sqlalchemy.orm import Session
from app.models.catalogos import TipoDocumento, Sexo

def obtener_tipos_documento(db: Session):
    return db.query(TipoDocumento).all()

def obtener_sexos(db: Session):
    return db.query(Sexo).all()
