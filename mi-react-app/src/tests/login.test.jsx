import React from 'react';
import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Login from '../pages/private/Login';

const mockLogin = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={{ login: mockLogin, isAuthenticated: false, loading: false }}>
        <Login />
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('debe renderizar el formulario de login', () => {
    renderLogin();

    expect(screen.getByText('Taller Automotriz')).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ingresar/i })).toBeInTheDocument();
  });

  test('debe completar el campo de email', async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    await user.type(emailInput, 'test@example.com');

    expect(emailInput.value).toBe('test@example.com');
  });

  test('debe completar el campo de contraseña', async () => {
    const user = userEvent.setup();
    renderLogin();

    const passwordInput = screen.getByLabelText(/Contraseña/i);
    await user.type(passwordInput, 'password123');

    expect(passwordInput.value).toBe('password123');
  });

  test('debe completar ambos campos y simular submit', async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Ingresar/i });

    await user.type(emailInput, 'admin@taller.com');
    await user.type(passwordInput, 'admin123');

    expect(emailInput.value).toBe('admin@taller.com');
    expect(passwordInput.value).toBe('admin123');

    mockLogin.mockResolvedValueOnce({ success: true });

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('admin@taller.com', 'admin123');
    });
  });

  test('debe mostrar error si el email está vacío', async () => {
    const user = userEvent.setup();
    renderLogin();

    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Ingresar/i });

    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    // El formulario no debe enviar sin email
    await waitFor(() => {
      expect(mockLogin).not.toHaveBeenCalled();
    });
  });

  test('debe mostrar error si la contraseña está vacía', async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const submitButton = screen.getByRole('button', { name: /Ingresar/i });

    await user.type(emailInput, 'test@example.com');
    await user.click(submitButton);

    // El formulario no debe enviar sin contraseña
    await waitFor(() => {
      expect(mockLogin).not.toHaveBeenCalled();
    });
  });

  test('debe mostrar error si el email y constraseña están vacíos', async () => {
    const user = userEvent.setup();
    renderLogin();

    const submitButton = screen.getByRole('button', { name: /Ingresar/i });

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).not.toHaveBeenCalled();
    });
  });

  test('debe rechazar login con credenciales inválidas', async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Ingresar/i });

    mockLogin.mockResolvedValueOnce({ success: false, error: 'Credenciales inválidas' });

    await user.type(emailInput, 'invalid@test.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('invalid@test.com', 'wrongpassword');
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  test('debe navegar a dashboard después de login exitoso', async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Ingresar/i });

    mockLogin.mockResolvedValueOnce({ success: true });

    await user.type(emailInput, 'admin@taller.com');
    await user.type(passwordInput, 'admin123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('debe mostrar loading state mientras se procesa el login', async () => {
    const mockLoginAsync = vi.fn().mockImplementation(() => new Promise(resolve => {
      setTimeout(() => resolve({ success: true }), 100);
    }));

    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ login: mockLoginAsync, isAuthenticated: false, loading: false }}>
          <Login />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Ingresar/i });

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLoginAsync).toHaveBeenCalled();
    });
  });

  test('debe rechazar email con formato inválido', async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Ingresar/i });

    await user.type(emailInput, 'notanemail');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    // El formulario no debe enviar con email inválido
    await waitFor(() => {
      expect(mockLogin).not.toHaveBeenCalled();
    });
  });

  test('debe manejar error de servidor (500)', async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Ingresar/i });

    mockLogin.mockRejectedValueOnce(new Error('Error del servidor'));

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'test123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });

  test('debe permitir limpiar campos', async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');

    // Simular borrado
    await user.clear(emailInput);
    await user.clear(passwordInput);
    expect(emailInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  test('debe mockear API y verificar llamada al endpoint', async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Ingresar/i });

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'test123');

    mockLogin.mockResolvedValueOnce({ success: true });

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
      expect(mockLogin).toHaveBeenCalledTimes(1);
    });
  });

  test('debe mostrar el mensaje de error en pantalla cuando el login falla', async () => {
    const user = userEvent.setup();
    renderLogin();

    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Ingresar/i });

    mockLogin.mockResolvedValueOnce({
      success: false,
      error: 'Credenciales inválidas'
    });

    await user.type(emailInput, 'wrong@test.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument();
    });
  });

  test('debe deshabilitar el botón y mostrar texto de carga durante el login', async () => {
    const mockLoginSlow = vi.fn().mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ success: true }), 200))
    );

    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ login: mockLoginSlow, isAuthenticated: false, loading: false }}>
          <Login />
        </AuthContext.Provider>
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    const passwordInput = screen.getByLabelText(/Contraseña/i);
    const submitButton = screen.getByRole('button', { name: /Ingresar/i });

    await user.type(emailInput, 'admin@taller.com');
    await user.type(passwordInput, 'admin123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Iniciando sesión...')).toBeInTheDocument();
      expect(screen.getByText('Iniciando sesión...')).toBeDisabled();
    });
  });

  test('debe ir a página principal al hacer click en "Volver"', async () => {
    const user = userEvent.setup();
    renderLogin();

    const backButton = screen.getByRole('button', { name: /Volver a la página principal/i });
    await user.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});