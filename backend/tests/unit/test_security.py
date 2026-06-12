from app.core.security import get_password_hash, verify_password, create_access_token

def test_verificacion_password_unitaria():
    clave_plana = "secreta123"
    hash_generado = get_password_hash(clave_plana)
    
    assert hash_generado != clave_plana
    assert verify_password(clave_plana, hash_generado) is True
    assert verify_password("mala123", hash_generado) is False

def test_creacion_token_unitaria():
    subject = "prueba@test.com"
    token = create_access_token(subject)
    
    assert isinstance(token, str)
    assert len(token.split('.')) == 3
