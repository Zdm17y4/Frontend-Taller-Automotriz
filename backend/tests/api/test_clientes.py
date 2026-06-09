from fastapi.testclient import TestClient

def test_crear_cliente(authorized_client: TestClient):
    payload = {
        "tipo_documento_id": 1,
        "numero_documento": "12345678",
        "nombres": "Juan",
        "apellido_paterno": "Perez",
        "apellido_materno": "Lopez",
        "direccion": "Av Principal 123",
        "telefono": "999888777",
        "sexo_id": 1
    }

    response = authorized_client.post("/api/clientes/", json=payload)
    
    assert response.status_code == 201
    data = response.json()
    assert data["persona"]["numero_documento"] == "12345678"
    assert data["persona"]["nombres"] == "Juan"

def test_buscar_cliente_por_dni(authorized_client: TestClient):
    payload = {
        "tipo_documento_id": 1,
        "numero_documento": "87654321",
        "nombres": "Maria",
        "apellido_paterno": "Gomez",
        "apellido_materno": "",
        "sexo_id": 2
    }
    authorized_client.post("/api/clientes/", json=payload)

    response = authorized_client.get("/api/clientes/87654321")
    
    assert response.status_code == 200
    data = response.json()
    assert data["persona"]["numero_documento"] == "87654321"
    assert data["persona"]["nombres"] == "Maria"
