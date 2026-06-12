import React from 'react';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import EditarClientePage from '../pages/private/EditarClientePage';
import * as apiModule from '../services/api';

/**
 * Mock de api.js: Intercepta GET /catalogos/* y PUT /clientes/*
 */
vi.mock('../services/api', () => ({
  default: {
    get: vi.fn(),
    put: vi.fn(),
  },
}));

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: '1' }),
  };
});

/**
 * Pruebas de EditarClientePage: Validar EXCLUSIVAMENTE el flujo de EDICIÓN
 * (cargar datos previos, modificar un campo, PUT exitoso, redirección).
 * 
 * NO duplica nuevaBitacora.test.jsx: No valida búsquedas globales de clientes,
 * solo edición directa del cliente con ID = 1.
 */
describe('EditarClientePage - Flujo de Edición de Cliente Existente', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  /**
   * CASO 1: GET /catalogos/* + /clientes/id/1 → Datos precargados
   */
  test('debe cargar y precargar datos del cliente al montar', async () => {
    const mockCliente = {
      id: 1,
      persona: {
        id: 1,
        tipo_documento_id: 1,
        numero_documento: '12345678',
        nombres: 'Juan',
        apellido_paterno: 'Pérez',
        apellido_materno: 'García',
        direccion: 'Calle Principal 123',
        telefono: '987654321',
        sexo_id: 1,
      },
    };

    // Mock: GET /catalogos/tipo-documento
    apiModule.default.get.mockImplementation((url) => {
      if (url === '/catalogos/tipo-documento')
        return Promise.resolve({ data: [{ id: 1, codigo: 'DNI', descripcion: 'DNI' }] });
      if (url === '/catalogos/sexo')
        return Promise.resolve({ data: [{ id: 1, descripcion: 'Masculino' }] });
      if (url === '/clientes/id/1')
        return Promise.resolve({ data: mockCliente });
      return Promise.reject(new Error('URL no mockeada'));
    });

    render(
      <BrowserRouter>
        <EditarClientePage />
      </BrowserRouter>
    );

    // Esperamos datos precargados
    await waitFor(() => {
      expect(screen.getByDisplayValue('Juan')).toBeInTheDocument();
      expect(screen.getByDisplayValue('987654321')).toBeInTheDocument();
    });

    // Verificamos que se realizaron los 3 GET esperados
    expect(apiModule.default.get).toHaveBeenCalledWith('/catalogos/tipo-documento');
    expect(apiModule.default.get).toHaveBeenCalledWith('/catalogos/sexo');
    expect(apiModule.default.get).toHaveBeenCalledWith('/clientes/id/1');
  });

  /**
   * CASO 2: userEvent → Modificación interactiva de campo de teléfono
   */
  test('debe permitir modificar el teléfono mediante userEvent', async () => {
    const mockCatalogos = {
      tiposDocumento: [{ id: 1, codigo: 'DNI', descripcion: 'DNI' }],
      sexos: [{ id: 1, descripcion: 'Masculino' }],
    };

    const mockCliente = {
      id: 1,
      persona: {
        id: 1,
        tipo_documento_id: 1,
        numero_documento: '12345678',
        nombres: 'Juan',
        apellido_paterno: 'Pérez',
        apellido_materno: 'García',
        direccion: 'Calle Principal 123',
        telefono: '987654321',
        sexo_id: 1,
      },
    };

    apiModule.default.get.mockImplementation((url) => {
      if (url === '/catalogos/tipo-documento') {
        return Promise.resolve({ data: mockCatalogos.tiposDocumento });
      }
      if (url === '/catalogos/sexo') {
        return Promise.resolve({ data: mockCatalogos.sexos });
      }
      if (url === '/clientes/id/1') {
        return Promise.resolve({ data: mockCliente });
      }
      return Promise.reject(new Error('URL no mockeada'));
    });

    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <EditarClientePage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('987654321')).toBeInTheDocument();
    });

    // Modificar teléfono: 987654321 → 912345678
    const telefonoInput = screen.getByDisplayValue('987654321');
    await user.clear(telefonoInput);
    await user.type(telefonoInput, '912345678');

    expect(telefonoInput.value).toBe('912345678');
  });

  /**
   * CASO 3: Submit exitoso → PUT /clientes/1 + Redirección
   */
  test('debe hacer PUT /clientes/1 y navegar a /dashboard/clientes', async () => {
    apiModule.default.get.mockImplementation((url) => {
      if (url === '/catalogos/tipo-documento')
        return Promise.resolve({ data: [{ id: 1, codigo: 'DNI', descripcion: 'DNI' }] });
      if (url === '/catalogos/sexo')
        return Promise.resolve({ data: [{ id: 1, descripcion: 'Masculino' }] });
      if (url === '/clientes/id/1')
        return Promise.resolve({
          data: {
            id: 1,
            persona: {
              id: 1,
              tipo_documento_id: 1,
              numero_documento: '12345678',
              nombres: 'Juan',
              apellido_paterno: 'Pérez',
              apellido_materno: 'García',
              direccion: 'Calle Principal 123',
              telefono: '987654321',
              sexo_id: 1,
            },
          },
        });
      return Promise.reject(new Error('URL no mockeada'));
    });

    apiModule.default.put.mockResolvedValue({ data: { success: true } });

    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <EditarClientePage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('987654321')).toBeInTheDocument();
    });

    // Modificar teléfono
    const telefonoInput = screen.getByDisplayValue('987654321');
    await user.clear(telefonoInput);
    await user.type(telefonoInput, '912345678');

    // Submit
    const saveButton = screen.getByRole('button', { name: /guardar|save/i });
    await user.click(saveButton);

    // Verificar PUT /clientes/1 con payload actualizado
    await waitFor(() => {
      expect(apiModule.default.put).toHaveBeenCalledWith(
        '/clientes/1',
        expect.objectContaining({ telefono: '912345678' })
      );
    });

    // Verificar redirección
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/clientes');
  });

  /**
   * CASO 4: Validación Regex → DNI (8 dígitos), Teléfono (9 dígitos)
   */
  test('debe rechazar teléfono < 9 dígitos y DNI < 8 dígitos', async () => {
    const mockCatalogos = {
      tiposDocumento: [{ id: 1, codigo: 'DNI', descripcion: 'DNI' }],
      sexos: [{ id: 1, descripcion: 'Masculino' }],
    };

    const mockCliente = {
      id: 1,
      persona: {
        id: 1,
        tipo_documento_id: 1,
        numero_documento: '12345678',
        nombres: 'Juan',
        apellido_paterno: 'Pérez',
        apellido_materno: 'García',
        direccion: 'Calle Principal 123',
        telefono: '987654321',
        sexo_id: 1,
      },
    };

    apiModule.default.get.mockImplementation((url) => {
      if (url === '/catalogos/tipo-documento') {
        return Promise.resolve({ data: mockCatalogos.tiposDocumento });
      }
      if (url === '/catalogos/sexo') {
        return Promise.resolve({ data: mockCatalogos.sexos });
      }
      if (url === '/clientes/id/1') {
        return Promise.resolve({ data: mockCliente });
      }
      return Promise.reject(new Error('URL no mockeada'));
    });

    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <EditarClientePage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('987654321')).toBeInTheDocument();
    });

    // Prueba 1: Teléfono con 8 dígitos (debe fallar)
    const telefonoInput = screen.getByDisplayValue('987654321');
    await user.clear(telefonoInput);
    await user.type(telefonoInput, '91234567');

    const saveButton = screen.getByRole('button', { name: /guardar|save/i });
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/El teléfono debe contener exactamente 9 dígitos numéricos/i)).toBeInTheDocument();
    });

    expect(apiModule.default.put).not.toHaveBeenCalled();

    // Prueba 2: DNI con 7 dígitos (debe fallar)
    const numeroDocumentoInput = screen.getByDisplayValue('12345678');
    await user.clear(numeroDocumentoInput);
    await user.type(numeroDocumentoInput, '1234567');

    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/El número de documento para DNI debe contener exactamente 8 dígitos numéricos/i)).toBeInTheDocument();
    });

    expect(apiModule.default.put).not.toHaveBeenCalled();
  });
});
