# Taller Automotriz
En este README hemos colocado las instrucciones para levantar nuestra aplicacion


--- 
- Stack
FastAPI, React 19 + Vite y Docker(por el momento solo para nuestra Base de datos PostgreSQL)

---

## Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) 
- [Python 3.11+](https://www.python.org/downloads/)
- [Node.js 20+](https://nodejs.org/)
---

## 1. Base de Datos (PostgreSQL en Docker)

El proyecto utiliza PostgreSQL en un contenedor Docker, debido a esto usamos el *puerto 5433* para evitar conflictos con instalaciones locales en el puerto 5432(que es el estandar de PostgreSQL)

Nota: Si no se usa un contenedor para la base de datos es necesario cambiar la linea DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5433/taller_db en el archivo _.env.example_. En lugar de 5433 colocar 5432. Es tambien posible crear la base de datos con otro nombre pero es necesario modificar la linea con el nombre de la base de datos que escojas
### Levantar Base de Datos
bash
docker compose up -d


### Detener Base de Datos
bash
docker compose down


### Reiniciar Base de Datos desde cero (borrando datos guardados)
bash
docker compose down -v



---

## 2. Backend (FastAPI)

Copia el archivo de plantilla .env.example y renómbralo como .env dentro de la carpeta backend/. 



#### En Windows (PowerShell)
powershell
Copy-Item backend/.env.example backend/.env


---

### Instalar dependencias y levantar el servidor

#### En Windows (PowerShell)
*(Nota: Si PowerShell bloquea la ejecución de scripts, se debe ejecutar primero `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`)*
powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
# Opcional: Ejecutar solo si no se cargó la base de datos a través de taller_db.bak
# python seed.py
uvicorn app.main:app --reload

* **URL del Servidor:** [http://localhost:8000](http://localhost:8000)
* **Usuario Administrador inicial :**
  * **Correo:** `admin@taller.com`
  * **Contraseña:** `admin123`

---

## 3. Frontend (React + Vite)

Abre una nueva terminal en la raíz del proyecto y ejecuta:

bash
cd mi-react-app
npm install
npm run dev
```

* *URL del Frontend:* [http://localhost:5173](http://localhost:5173)

---

## Orden de arranque recomendado

1. Levantar la base de datos: docker compose up -d
2. Levantar el backend: uvicorn app.main:app --reload (dentro del entorno virtual)
3. Levantar el frontend: npm run dev (dentro de mi-react-app/)
