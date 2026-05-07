import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    cargo: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Lógica futura de autenticación
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="login-form">

          <div className="form-group">
            <label htmlFor="cargo">Cargo</label>
            <select
              id="cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Selecciona un cargo</option>
              <option value="admin">Administrador</option>
              <option value="mecanico">Mecánico</option>
              <option value="cliente">Cliente</option>
              <option value="recepcionista">Recepcionista</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <button type="submit" className="login-submit-btn">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
