import pytest
from pydantic import ValidationError
from fastapi.testclient import TestClient
from app.schemas.ost import OSTCreate

def test_validacion_placa_ost():
    with pytest.raises(ValidationError):
        OSTCreate(
            cliente_id=1,
            placa="123-ABC",
            marca="Toyota",
            modelo="Yaris",
            falla_reportada="Falla motor"
        )
        
    valido = OSTCreate(
        cliente_id=1,
        placa="ABC-123",
        marca="Toyota",
        modelo="Yaris",
        falla_reportada="Falla motor"
    )
    assert valido.placa == "ABC-123"

def test_crear_ost(authorized_client: TestClient):
    cliente_payload = {
        "tipo_documento_id": 1,
        "numero_documento": "11112222",
        "nombres": "Pedro",
        "apellido_paterno": "Suarez",
        "apellido_materno": "",
        "sexo_id": 1
    }
    cliente_response = authorized_client.post("/api/clientes/", json=cliente_payload)
    cliente_id = cliente_response.json()["id"]

    ost_payload = {
        "cliente_id": cliente_id,
        "placa": "XYZ-987",
        "marca": "Nissan",
        "modelo": "Sentra",
        "falla_reportada": "Frenos largos"
    }
    
    response = authorized_client.post("/api/ost/", json=ost_payload)
    
    assert response.status_code == 201
    data = response.json()
    assert data["estado"] == "PENDIENTE"
    assert data["placa"] == "XYZ-987"
    assert "codigo" in data
