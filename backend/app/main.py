from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
import app.models  # Importar modelos para que SQLAlchemy los detecte

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API Taller Automotriz",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Bienvenido a la API del Taller Automotriz"}
