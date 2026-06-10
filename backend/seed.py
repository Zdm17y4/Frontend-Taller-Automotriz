from app.core.database import SessionLocal, engine, Base
from app.models.catalogos import TipoDocumento, Sexo
from app.models.usuario import Rol, Usuario
from app.models.persona import Persona
from app.models.cliente import Cliente
from app.models.ost import Tecnico, OST, OSTTecnico
from app.models.bitacora import Bitacora, InformeTecnico
from app.core.security import get_password_hash
import app.models

Base.metadata.create_all(bind=engine)


def seed_data():
    db = SessionLocal()
    try:
        #  Catálogos: Sexo
        if not db.query(Sexo).first():
            print("Insertando catálogos de Sexo...")
            db.add_all(
                [
                    Sexo(codigo="M", descripcion="Masculino"),
                    Sexo(codigo="F", descripcion="Femenino"),
                ]
            )
            db.commit()

        #  Catálogos: TipoDocumento
        if not db.query(TipoDocumento).first():
            print("Insertando catálogos de Documentos...")
            db.add_all(
                [
                    TipoDocumento(
                        codigo="DNI", descripcion="Documento Nacional de Identidad"
                    ),
                    TipoDocumento(codigo="CE", descripcion="Carné de Extranjería"),
                    TipoDocumento(
                        codigo="RUC", descripcion="Registro Único de Contribuyente"
                    ),
                ]
            )
            db.commit()

        #  Roles
        if not db.query(Rol).first():
            print("Insertando Roles base...")
            db.add_all(
                [
                    Rol(codigo="ADMIN", descripcion="Administrador del Sistema"),
                    Rol(codigo="RECEPCION", descripcion="Recepcionista"),
                    Rol(codigo="TECNICO", descripcion="Técnico Automotriz"),
                ]
            )
            db.commit()

        #  Usuario Admin por defecto
        admin_email = "admin@taller.com"
        admin_user = db.query(Usuario).filter(Usuario.email == admin_email).first()
        if not admin_user:
            print("Creando usuario Administrador...")
            persona_admin = Persona(
                tipo_documento_id=1,
                numero_documento="00000000",
                nombres="Administrador",
                apellido_paterno="Sistema",
                apellido_materno="",
                sexo_id=1,
            )
            db.add(persona_admin)
            db.commit()
            db.refresh(persona_admin)

            usuario_admin = Usuario(
                email=admin_email,
                password_hash=get_password_hash("admin123"),
                persona_id=persona_admin.id,
                rol_id=1,
            )
            db.add(usuario_admin)
            db.commit()
            print(" Administrador creado exitosamente: admin@taller.com / admin123")

        #  Clientes de Prueba (Verificando duplicados por número de documento)
        print("Verificando clientes de prueba...")
        persona_juan = (
            db.query(Persona).filter(Persona.numero_documento == "12345678").first()
        )
        if not persona_juan:
            persona_juan = Persona(
                tipo_documento_id=1,
                numero_documento="12345678",
                nombres="Juan Carlos",
                apellido_paterno="Pérez",
                apellido_materno="Gómez",
                direccion="Av. Larco 456, Miraflores",
                telefono="999888777",
                sexo_id=1,
            )
            db.add(persona_juan)
            db.commit()
            db.refresh(persona_juan)

        cliente_juan = (
            db.query(Cliente).filter(Cliente.persona_id == persona_juan.id).first()
        )
        if not cliente_juan:
            cliente_juan = Cliente(persona_id=persona_juan.id)
            db.add(cliente_juan)
            db.commit()

        persona_maria = (
            db.query(Persona).filter(Persona.numero_documento == "87654321").first()
        )
        if not persona_maria:
            persona_maria = Persona(
                tipo_documento_id=1,
                numero_documento="87654321",
                nombres="María Fernanda",
                apellido_paterno="Rodríguez",
                apellido_materno="López",
                direccion="Calle Las Flores 123, San Isidro",
                telefono="987654321",
                sexo_id=2,
            )
            db.add(persona_maria)
            db.commit()
            db.refresh(persona_maria)

        cliente_maria = (
            db.query(Cliente).filter(Cliente.persona_id == persona_maria.id).first()
        )
        if not cliente_maria:
            cliente_maria = Cliente(persona_id=persona_maria.id)
            db.add(cliente_maria)
            db.commit()
        print(" Clientes de prueba listos.")

        # 6. Técnicos de Prueba (Verificando duplicados por número de documento)
        print("Verificando técnicos de prueba...")
        persona_carlos = (
            db.query(Persona).filter(Persona.numero_documento == "44445555").first()
        )
        if not persona_carlos:
            persona_carlos = Persona(
                tipo_documento_id=1,
                numero_documento="44445555",
                nombres="Carlos Eduardo",
                apellido_paterno="Mendoza",
                apellido_materno="Ramos",
                direccion="Av. Javier Prado 789, San Borja",
                telefono="955556666",
                sexo_id=1,
            )
            db.add(persona_carlos)
            db.commit()
            db.refresh(persona_carlos)

        tecnico_carlos = (
            db.query(Tecnico).filter(Tecnico.persona_id == persona_carlos.id).first()
        )
        if not tecnico_carlos:
            tecnico_carlos = Tecnico(
                persona_id=persona_carlos.id,
                especialidad="Mecánica de Motores y Transmisión",
            )
            db.add(tecnico_carlos)
            db.commit()

        persona_jorge = (
            db.query(Persona).filter(Persona.numero_documento == "66667777").first()
        )
        if not persona_jorge:
            persona_jorge = Persona(
                tipo_documento_id=1,
                numero_documento="66667777",
                nombres="Jorge Alberto",
                apellido_paterno="Espinoza",
                apellido_materno="Vidal",
                direccion="Jr. Washington 450, Lima",
                telefono="977778888",
                sexo_id=1,
            )
            db.add(persona_jorge)
            db.commit()
            db.refresh(persona_jorge)

        tecnico_jorge = (
            db.query(Tecnico).filter(Tecnico.persona_id == persona_jorge.id).first()
        )
        if not tecnico_jorge:
            tecnico_jorge = Tecnico(
                persona_id=persona_jorge.id,
                especialidad="Sistema Eléctrico y Diagnóstico Computarizado",
            )
            db.add(tecnico_jorge)
            db.commit()
        print(" Técnicos de prueba listos.")

        # 7. Bitácora de Problemas Comunes
        if not db.query(Bitacora).first():
            print("Creando base de datos de problemas comunes (Bitácora)...")
            bitacora_items = [
                Bitacora(
                    problema="Fuga de líquido refrigerante por fisura en manguera superior del radiador.",
                    solucion="Reemplazo de la manguera superior del radiador, limpieza del depósito y purgado completo del refrigerante.",
                ),
                Bitacora(
                    problema="Desgaste severo en pastillas de freno delanteras que genera chirrido al frenar.",
                    solucion="Reemplazo de pastillas de freno delanteras por repuestos cerámicos nuevos y rectificado de discos de freno.",
                ),
                Bitacora(
                    problema="Batería descargada o con celdas dañadas que impide el encendido del motor.",
                    solucion="Reemplazo de batería automotriz por una nueva de 12V 60Ah y comprobación del alternador (carga correcta a 14V).",
                ),
            ]
            db.add_all(bitacora_items)
            db.commit()
            print(" Catálogo de Bitácora creado.")

        # Obtener referencias seguras para las OST
        cliente_juan_db = (
            db.query(Cliente).filter(Cliente.persona_id == persona_juan.id).first()
        )
        cliente_maria_db = (
            db.query(Cliente).filter(Cliente.persona_id == persona_maria.id).first()
        )
        tecnico_carlos_db = (
            db.query(Tecnico).filter(Tecnico.persona_id == persona_carlos.id).first()
        )
        tecnico_jorge_db = (
            db.query(Tecnico).filter(Tecnico.persona_id == persona_jorge.id).first()
        )
        bitacora_fuga = (
            db.query(Bitacora).filter(Bitacora.problema.like("%refrigerante%")).first()
        )

        # Fallback en caso de que alguna consulta falle por cambios previos inusuales
        if not cliente_juan_db:
            cliente_juan_db = db.query(Cliente).first()
        if not cliente_maria_db:
            cliente_maria_db = db.query(Cliente).first()
        if not tecnico_carlos_db:
            tecnico_carlos_db = db.query(Tecnico).first()
        if not tecnico_jorge_db:
            tecnico_jorge_db = db.query(Tecnico).first()
        if not bitacora_fuga:
            bitacora_fuga = db.query(Bitacora).first()

        #  Órdenes de Servicio Técnico (OST) en diferentes estados
        if not db.query(OST).first():
            print("Creando Órdenes de Servicio Técnico (OST) de prueba...")

            # OST 1: Pendiente
            ost_pend = OST(
                codigo="OST-000001",
                estado="PENDIENTE",
                cliente_id=cliente_juan_db.id,
                placa="ABC-123",
                marca="Toyota",
                modelo="Corolla",
                falla_reportada="El motor tiembla levemente al estar detenido en semáforos.",
            )
            db.add(ost_pend)

            # OST 2: En Proceso (con Técnico asignado)
            ost_proc = OST(
                codigo="OST-000002",
                estado="EN_PROCESO",
                cliente_id=cliente_maria_db.id,
                placa="XYZ-789",
                marca="Hyundai",
                modelo="Elantra",
                falla_reportada="Ruido metálico molesto proveniente de la llanta delantera derecha al frenar.",
            )
            db.add(ost_proc)
            db.commit()
            db.refresh(ost_proc)

            # Asignar técnico 1 a OST 2
            asignacion1 = OSTTecnico(
                ost_id=ost_proc.id,
                tecnico_id=tecnico_carlos_db.id,
                tarea="Revisar el estado de las pastillas, mordazas y discos de la llanta delantera derecha.",
            )
            db.add(asignacion1)

            # OST 3: Completada (con Técnico asignado e Informe Técnico finalizado)
            ost_comp = OST(
                codigo="OST-000003",
                estado="COMPLETADA",
                cliente_id=cliente_juan_db.id,
                placa="MNO-456",
                marca="Nissan",
                modelo="Sentra",
                falla_reportada="El auto no enciende por las mañanas y emite un sonido de chasquido rápido.",
            )
            db.add(ost_comp)
            db.commit()
            db.refresh(ost_comp)

            # Asignar técnico 2 a OST 3
            asignacion2 = OSTTecnico(
                ost_id=ost_comp.id,
                tecnico_id=tecnico_jorge_db.id,
                tarea="Diagnosticar el sistema de arranque, testear batería y comprobar alternador.",
            )
            db.add(asignacion2)

            # Informe Técnico para la OST 3
            informe = InformeTecnico(
                ost_id=ost_comp.id,
                bitacora_id=bitacora_fuga.id if bitacora_fuga else None,
                diagnostico="Manguera del radiador rota causando pérdida de refrigerante y calentamiento leve del motor.",
                solucion_aplicada="Se instaló una manguera de radiador original nueva y se realizó la purga del sistema con refrigerante al 50%.",
            )
            db.add(informe)

            db.commit()
            print(" OSTs e informes de prueba creados.")

        print(
            " Seed completado con datos. La BD está completamente poblada y lista para usarse."
        )
    except Exception as e:
        print(f" Error durante el seed: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    print("Iniciando carga de datos semilla (Seed)...")
    seed_data()
