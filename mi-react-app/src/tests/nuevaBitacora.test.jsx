import React from 'react';
import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import NuevoBitacoraPage from '../pages/private/NuevoBitacoraPage';
import * as api from '../services/api';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../services/api', () => ({
  default: {
    post: vi.fn(),
  },
}));

const renderNuevaBitacora = () => {
  return render(
    <BrowserRouter>
      <NuevoBitacoraPage />
    </BrowserRouter>
  );
};

describe('Nueva Bitácora Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('debe renderizar el formulario de bitácora', () => {
    renderNuevaBitacora();

    expect(screen.getByText('Agregar a la Bitácora')).toBeInTheDocument();
    expect(screen.getByLabelText(/Problema o Falla Reportada/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Solución o Reparación Aplicada/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Guardar en Bitácora/i })).toBeInTheDocument();
  });

  test('debe completar el campo de problema', async () => {
    const user = userEvent.setup();
    renderNuevaBitacora();

    const problemaInput = screen.getByLabelText(/Problema o Falla Reportada/i);
    await user.type(problemaInput, 'Chirrido en rueda delantera');

    expect(problemaInput.value).toBe('Chirrido en rueda delantera');
  });

  test('debe completar el campo de solución', async () => {
    const user = userEvent.setup();
    renderNuevaBitacora();

    const solucionInput = screen.getByLabelText(/Solución o Reparación Aplicada/i);
    await user.type(solucionInput, 'Cambio de pastillas de freno');

    expect(solucionInput.value).toBe('Cambio de pastillas de freno');
  });

  test('debe completar ambos campos del formulario', async () => {
    const user = userEvent.setup();
    renderNuevaBitacora();

    const problemaInput = screen.getByLabelText(/Problema o Falla Reportada/i);
    const solucionInput = screen.getByLabelText(/Solución o Reparación Aplicada/i);

    await user.type(problemaInput, 'Motor hace ruido extraño');
    await user.type(solucionInput, 'Revisión y ajuste de correas');

    expect(problemaInput.value).toBe('Motor hace ruido extraño');
    expect(solucionInput.value).toBe('Revisión y ajuste de correas');
  });

  test('debe mockear API y verificar payload enviado', async () => {
    const user = userEvent.setup();
    renderNuevaBitacora();

    const problemaInput = screen.getByLabelText(/Problema o Falla Reportada/i);
    const solucionInput = screen.getByLabelText(/Solución o Reparación Aplicada/i);
    const submitButton = screen.getByRole('button', { name: /Guardar en Bitácora/i });

    api.default.post.mockResolvedValueOnce({ data: { success: true } });

    await user.type(problemaInput, 'Problemas de enfriamiento');
    await user.type(solucionInput, 'Revisión del radiador');
    await user.click(submitButton);

    await waitFor(() => {
      expect(api.default.post).toHaveBeenCalledWith('/bitacora/', {
        problema: 'Problemas de enfriamiento',
        solucion: 'Revisión del radiador',
      });
    });
  });

  test('debe llamar a POST /bitacora/ al hacer submit', async () => {
    const user = userEvent.setup();
    renderNuevaBitacora();

    const problemaInput = screen.getByLabelText(/Problema o Falla Reportada/i);
    const solucionInput = screen.getByLabelText(/Solución o Reparación Aplicada/i);
    const submitButton = screen.getByRole('button', { name: /Guardar en Bitácora/i });

    api.default.post.mockResolvedValueOnce({ data: { id: 1 } });

    await user.type(problemaInput, 'Fallo de alternador');
    await user.type(solucionInput, 'Reemplazo de alternador');
    await user.click(submitButton);

    await waitFor(() => {
      expect(api.default.post).toHaveBeenCalled();
      expect(api.default.post).toHaveBeenCalledTimes(1);
    });
  });

  test('debe navegar a /dashboard/bitacora después de guardar exitosamente', async () => {
    const user = userEvent.setup();
    renderNuevaBitacora();

    const problemaInput = screen.getByLabelText(/Problema o Falla Reportada/i);
    const solucionInput = screen.getByLabelText(/Solución o Reparación Aplicada/i);
    const submitButton = screen.getByRole('button', { name: /Guardar en Bitácora/i });

    api.default.post.mockResolvedValueOnce({ data: { success: true } });

    await user.type(problemaInput, 'Vibración en volante');
    await user.type(solucionInput, 'Balanceo de ruedas');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard/bitacora');
    });
  });

  test('debe mostrar error si campo problema está vacío', async () => {
    const user = userEvent.setup();
    renderNuevaBitacora();

    const solucionInput = screen.getByLabelText(/Solución o Reparación Aplicada/i);
    const submitButton = screen.getByRole('button', { name: /Guardar en Bitácora/i });

    await user.type(solucionInput, 'Solución válida');
    await user.click(submitButton);

    // No debe enviar sin problema
    await waitFor(() => {
      expect(api.default.post).not.toHaveBeenCalled();
    });
  });

  test('debe mostrar error si campo solución está vacío', async () => {
    const user = userEvent.setup();
    renderNuevaBitacora();

    const problemaInput = screen.getByLabelText(/Problema o Falla Reportada/i);
    const submitButton = screen.getByRole('button', { name: /Guardar en Bitácora/i });

    await user.type(problemaInput, 'Problema válido');
    await user.click(submitButton);

    // No debe enviar sin solución
    await waitFor(() => {
      expect(api.default.post).not.toHaveBeenCalled();
    });
  });

  test('debe mostrar error si ambos campos están vacíos', async () => {
    const user = userEvent.setup();
    renderNuevaBitacora();

    const submitButton = screen.getByRole('button', { name: /Guardar en Bitácora/i });
    await user.click(submitButton);

    // No debe enviar sin campos requeridos
    await waitFor(() => {
      expect(api.default.post).not.toHaveBeenCalled();
    });
  });

  test('debe mostrar error cuando falla la API (500)', async () => {
    const user = userEvent.setup();
    renderNuevaBitacora();

    const problemaInput = screen.getByLabelText(/Problema o Falla Reportada/i);
    const solucionInput = screen.getByLabelText(/Solución o Reparación Aplicada/i);
    const submitButton = screen.getByRole('button', { name: /Guardar en Bitácora/i });

    api.default.post.mockRejectedValueOnce(new Error('Error del servidor'));

    await user.type(problemaInput, 'Error de servidor');
    await user.type(solucionInput, 'Reintentar');
    await user.click(submitButton);

    // No debe navegar si hay error
    await waitFor(() => {
      expect(api.default.post).toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  test('debe mostrar error cuando falla la API (401 - Unauthorized)', async () => {
    const user = userEvent.setup();
    renderNuevaBitacora();

    const problemaInput = screen.getByLabelText(/Problema o Falla Reportada/i);
    const solucionInput = screen.getByLabelText(/Solución o Reparación Aplicada/i);
    const submitButton = screen.getByRole('button', { name: /Guardar en Bitácora/i });

    const error = new Error('Unauthorized');
    error.response = { status: 401 };
    api.default.post.mockRejectedValueOnce(error);

    await user.type(problemaInput, 'Problema');
    await user.type(solucionInput, 'Solución');
    await user.click(submitButton);

    // No debe navegar si no está autorizado
    await waitFor(() => {
      expect(api.default.post).toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  test('debe validar que problema no esté vacío después de escribir y borrar', async () => {
    const user = userEvent.setup();
    renderNuevaBitacora();

    const problemaInput = screen.getByLabelText(/Problema o Falla Reportada/i);
    const solucionInput = screen.getByLabelText(/Solución o Reparación Aplicada/i);
    const submitButton = screen.getByRole('button', { name: /Guardar en Bitácora/i });

    await user.type(problemaInput, 'Problema');
    await user.clear(problemaInput);
    await user.type(solucionInput, 'Solución');
    await user.click(submitButton);

    // No debe enviar con problema vacío
    await waitFor(() => {
      expect(api.default.post).not.toHaveBeenCalled();
    });
  });

  test('debe reintentar después de un fallo', async () => {
    const user = userEvent.setup();
    renderNuevaBitacora();

    const problemaInput = screen.getByLabelText(/Problema o Falla Reportada/i);
    const solucionInput = screen.getByLabelText(/Solución o Reparación Aplicada/i);
    const submitButton = screen.getByRole('button', { name: /Guardar en Bitácora/i });

    // Primer intento - falla
    api.default.post.mockRejectedValueOnce(new Error('Error'));
    await user.type(problemaInput, 'Problema');
    await user.type(solucionInput, 'Solución');
    await user.click(submitButton);

    await waitFor(() => {
      expect(api.default.post).toHaveBeenCalledTimes(1);
    });

    // Segundo intento - éxito
    api.default.post.mockResolvedValueOnce({ data: { success: true } });
    await user.click(submitButton);

    await waitFor(() => {
      expect(api.default.post).toHaveBeenCalledTimes(2);
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard/bitacora');
    });
  });

  test('debe permitir caracteres especiales en campos de texto', async () => {
    const user = userEvent.setup();
    renderNuevaBitacora();

    const problemaInput = screen.getByLabelText(/Problema o Falla Reportada/i);
    const solucionInput = screen.getByLabelText(/Solución o Reparación Aplicada/i);
    const submitButton = screen.getByRole('button', { name: /Guardar en Bitácora/i });

    api.default.post.mockResolvedValueOnce({ data: { success: true } });

    await user.type(problemaInput, 'Problema con ñ, €, y & caracteres');
    await user.type(solucionInput, 'Solución @ Aplicada');
    await user.click(submitButton);

    await waitFor(() => {
      expect(api.default.post).toHaveBeenCalledWith('/bitacora/', {
        problema: 'Problema con ñ, €, y & caracteres',
        solucion: 'Solución @ Aplicada',
      });
    });
  });
});
