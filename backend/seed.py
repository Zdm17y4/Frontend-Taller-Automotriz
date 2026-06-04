from app.core.database import SessionLocal, engine, Base
from app.models.catalogos import TipoDocumento, Sexo
from app.models.usuario import Rol, Usuario
from app.models.persona import Persona
from app.core.security import get_password_hash
import app.models # Para que SQLAlchemy reconozca todas las tablas

# Aseguramos que las tablas estén creadas antes de insertar
Base.metadata.create_all(bind=engine)

def seed_data():
    db = SessionLocal()
    try:
        # 1. Catálogos: Sexo
        if not db.query(Sexo).first():
            print("Insertando catálogos de Sexo...")
            db.add_all([
                Sexo(codigo="M", descripcion="Masculino"),
                Sexo(codigo="F", descripcion="Femenino")
            ])
            
        # 2. Catálogos: TipoDocumento
        if not db.query(TipoDocumento).first():
            print("Insertando catálogos de Documentos...")
            db.add_all([
                TipoDocumento(codigo="DNI", descripcion="Documento Nacional de Identidad"),
                TipoDocumento(codigo="CE", descripcion="Carné de Extranjería"),
                TipoDocumento(codigo="RUC", descripcion="Registro Único de Contribuyente")
            ])

        # 3. Roles
        if not db.query(Rol).first():
            print("Insertando Roles base...")
            db.add_all([
                Rol(codigo="ADMIN", descripcion="Administrador del Sistema"),
                Rol(codigo="RECEPCION", descripcion="Recepcionista"),
                Rol(codigo="TECNICO", descripcion="Técnico Automotriz")
            ])
            
        db.commit()

        # 4. Usuario Admin por defecto
        admin_email = "admin@taller.com"
        if not db.query(Usuario).filter(Usuario.email == admin_email).first():
            print("Creando usuario Administrador...")
            persona_admin = db.query(Persona).filter(Persona.numero_documento == "00000000").first()
            if not persona_admin:
                persona_admin = Persona(
                    tipo_documento_id=1,
                    numero_documento="00000000",
                    nombres="Administrador",
                    apellido_paterno="Sistema",
                    apellido_materno="",
                    sexo_id=1
                )
                db.add(persona_admin)
                db.commit()
                db.refresh(persona_admin)

            usuario_admin = Usuario(
                email=admin_email,
                password_hash=get_password_hash("admin123"),
                persona_id=persona_admin.id,
                rol_id=1
            )
            db.add(usuario_admin)
            db.commit()
            print("✅ Administrador creado exitosamente: admin@taller.com / admin123")

        print("✅ ¡Seed completado! La base de datos está lista para usarse.")
    except Exception as e:
        print(f"❌ Error durante el seed: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("Iniciando carga de datos semilla (Seed)...")
    seed_data()
