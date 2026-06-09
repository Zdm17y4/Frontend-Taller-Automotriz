from fastapi.testclient import TestClient

def test_login_success(client: TestClient, test_user_data: dict):
    response = client.post(
        "/api/auth/login",
        json={
            "email": test_user_data["email"],
            "password": test_user_data["password"]
        }
    )

    assert response.status_code == 200
    
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_login_wrong_password(client: TestClient, test_user_data: dict):
    response = client.post(
        "/api/auth/login",
        json={
            "email": test_user_data["email"],
            "password": "clave_equivocada"
        }
    )
    assert response.status_code in [400, 401]
