CREATE TABLE bitacora (
	id SERIAL NOT NULL, 
	problema TEXT NOT NULL, 
	solucion TEXT NOT NULL, 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT now(), 
	PRIMARY KEY (id)
);

CREATE TABLE rol (
	id SERIAL NOT NULL, 
	codigo VARCHAR(20) NOT NULL, 
	descripcion VARCHAR(100) NOT NULL, 
	PRIMARY KEY (id)
);

CREATE TABLE sexo (
	id SERIAL NOT NULL, 
	codigo VARCHAR(1) NOT NULL, 
	descripcion VARCHAR(20) NOT NULL, 
	PRIMARY KEY (id)
);

CREATE TABLE tipo_documento (
	id SERIAL NOT NULL, 
	codigo VARCHAR(5) NOT NULL, 
	descripcion VARCHAR(50) NOT NULL, 
	PRIMARY KEY (id)
);

CREATE TABLE persona (
	id SERIAL NOT NULL, 
	tipo_documento_id INTEGER NOT NULL, 
	numero_documento VARCHAR(20) NOT NULL, 
	nombres VARCHAR(100) NOT NULL, 
	apellido_paterno VARCHAR(100) NOT NULL, 
	apellido_materno VARCHAR(100) NOT NULL, 
	direccion VARCHAR(255), 
	telefono VARCHAR(20), 
	sexo_id INTEGER NOT NULL, 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT now(), 
	PRIMARY KEY (id), 
	FOREIGN KEY(tipo_documento_id) REFERENCES tipo_documento (id), 
	FOREIGN KEY(sexo_id) REFERENCES sexo (id)
);

CREATE TABLE cliente (
	id SERIAL NOT NULL, 
	persona_id INTEGER NOT NULL, 
	PRIMARY KEY (id), 
	UNIQUE (persona_id), 
	FOREIGN KEY(persona_id) REFERENCES persona (id)
);

CREATE TABLE tecnico (
	id SERIAL NOT NULL, 
	persona_id INTEGER NOT NULL, 
	especialidad VARCHAR(100), 
	PRIMARY KEY (id), 
	UNIQUE (persona_id), 
	FOREIGN KEY(persona_id) REFERENCES persona (id)
);

CREATE TABLE usuario (
	id SERIAL NOT NULL, 
	email VARCHAR(150) NOT NULL, 
	password_hash VARCHAR(255) NOT NULL, 
	persona_id INTEGER NOT NULL, 
	rol_id INTEGER NOT NULL, 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT now(), 
	PRIMARY KEY (id), 
	UNIQUE (persona_id), 
	FOREIGN KEY(persona_id) REFERENCES persona (id), 
	FOREIGN KEY(rol_id) REFERENCES rol (id)
);

CREATE TABLE ost (
	id SERIAL NOT NULL, 
	codigo VARCHAR(20) NOT NULL, 
	estado VARCHAR(20) NOT NULL, 
	cliente_id INTEGER NOT NULL, 
	placa VARCHAR(10) NOT NULL, 
	marca VARCHAR(50) NOT NULL, 
	modelo VARCHAR(50) NOT NULL, 
	falla_reportada TEXT NOT NULL, 
	fecha_ingreso TIMESTAMP WITH TIME ZONE DEFAULT now(), 
	fecha_cierre TIMESTAMP WITH TIME ZONE, 
	PRIMARY KEY (id), 
	FOREIGN KEY(cliente_id) REFERENCES cliente (id)
);

CREATE TABLE informe_tecnico (
	id SERIAL NOT NULL, 
	ost_id INTEGER NOT NULL, 
	bitacora_id INTEGER, 
	diagnostico TEXT NOT NULL, 
	solucion_aplicada TEXT NOT NULL, 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT now(), 
	PRIMARY KEY (id), 
	UNIQUE (ost_id), 
	FOREIGN KEY(ost_id) REFERENCES ost (id), 
	FOREIGN KEY(bitacora_id) REFERENCES bitacora (id)
);

CREATE TABLE ost_tecnico (
	id SERIAL NOT NULL, 
	ost_id INTEGER NOT NULL, 
	tecnico_id INTEGER NOT NULL, 
	tarea TEXT, 
	PRIMARY KEY (id), 
	FOREIGN KEY(ost_id) REFERENCES ost (id), 
	FOREIGN KEY(tecnico_id) REFERENCES tecnico (id)
);

-- Datos iniciales (Catálogos)
INSERT INTO rol (codigo, descripcion) VALUES ('ADMIN', 'Administrador del Sistema'), ('RECEPCION', 'Recepcionista');
INSERT INTO sexo (codigo, descripcion) VALUES ('M', 'Masculino'), ('F', 'Femenino');
INSERT INTO tipo_documento (codigo, descripcion) VALUES ('DNI', 'Documento Nacional de Identidad');
