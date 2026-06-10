import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import NuevoOSTPage from '../pages/private/NuevoOSTPage';
import * as apiModule from '../services/api';

/**
 * Mock del módulo api.js para interceptar llamadas HTTP
 * Esto nos permite simular respuestas del backend sin necesidad de un servidor real
 */
vi.mock('../services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('NuevoOSTPage - Flujo de Orden de Servicio Técnico (OST)', () => {
  /**
   * setUp: Ejecutamos antes de cada prueba
   * Limpia los mocks y configura localStorage
   */
  beforeEach(() => {
    vi.clearAllMocks();
    // Simulamos token en localStorage
    localStorage.getItem = vi.fn().mockReturnValue('fake-token');
  });

  /**
   * tearDown: Ejecutamos después de cada prueba
   * Limpia el localStorage mock
   */
  afterEach(() => {
    vi.clearAllMocks();
  });

  /**
   * CASO 1: Renderizar formulario base con todos los campos obligatorios
   * Expected: Deben aparecer campos para cliente, placa, marca, modelo y falla reportada
   */
  it('Debe renderizar el formulario base mostrando todos los campos obligatorios del negocio', async () => {
    const mockClientes = [
      { id: 1, persona: { id: 1, numero_documento: '12345678', nombres: 'Juan', apellido_paterno: 'Pérez' } }
    ];

    apiModule.default.get.mockResolvedValue({ data: mockClientes });

    // Extraemos container para usar selectores nativos por ID si es necesario
    const { container } = render(
      <BrowserRouter>
        <NuevoOSTPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(apiModule.default.get).toHaveBeenCalledWith('/clientes/');
    });

    // 1. Selector de Cliente (Combobox)
    expect(screen.getByRole('combobox')).toBeInTheDocument();

    // 2. Selectores infalibles por ID directo del HTML
    const placaInput = container.querySelector('#placa');
    const marcaInput = container.querySelector('#marca');
    const modeloInput = container.querySelector('#modelo');
    const fallaInput = container.querySelector('#falla_reportada');

    expect(placaInput).toBeInTheDocument();
    expect(marcaInput).toBeInTheDocument();
    expect(modeloInput).toBeInTheDocument();
    expect(fallaInput).toBeInTheDocument();
  });

  /**
   * CASO 2: Validación Regex para placa peruana
   * Expected: Debe mostrar error si la placa no cumple el formato ^[a-zA-Z][a-zA-Z0-9]{2}-[0-9]{3}$
   */
  it('Debe rechazar placas con formato inválido y mostrar mensaje de error en la UI', async () => {
    const mockClientes = [
      {
        id: 1,
        persona: {
          id: 1,
          numero_documento: '12345678',
          nombres: 'Juan',
          apellido_paterno: 'Pérez',
        },
      },
    ];

    apiModule.default.get.mockResolvedValue({ data: mockClientes });

    const user = userEvent.setup();

    // GUARDAMOS EL CONTAINER PARA USAR SELECTORES POR ID
    const { container } = render(
      <BrowserRouter>
        <NuevoOSTPage />
      </BrowserRouter>
    );

    // Esperamos a que se carguen los clientes
    await waitFor(() => {
      expect(apiModule.default.get).toHaveBeenCalledWith('/clientes/');
    });

    // CORRECCIÓN: Encontramos los inputs de forma infalible usando sus IDs reales del HTML
    const placaInput = container.querySelector('#placa');
    const marcaInput = container.querySelector('#marca');
    const modeloInput = container.querySelector('#modelo');
    const fallaInput = container.querySelector('#falla_reportada');
    const clientSelect = screen.getByRole('combobox');

    // Rellenamos los campos con datos válidos excepto la placa
    await user.selectOptions(clientSelect, '1'); // Seleccionar cliente
    await user.type(placaInput, '123-ABC'); // Placa INVÁLIDA (empieza con números)
    await user.type(marcaInput, 'Toyota');
    await user.type(modeloInput, 'Corolla');
    await user.type(fallaInput, 'Motor no arranca');

    // Buscamos el botón de guardar
    const saveButton = screen.getByRole('button', { name: /guardar|save|registrar/i });
    await user.click(saveButton);

    // Verificamos que aparezca el error de validación de placa de forma flexible
    await waitFor(() => {
      expect(screen.getByText(/Debe ser del tipo ABC-123/i)).toBeInTheDocument();
    });

    // Verificamos que NO se haya realizado la petición POST
    expect(apiModule.default.post).not.toHaveBeenCalled();
  });

  /**
   * CASO 3: Auto-conversión de placa a mayúsculas
   * Expected: Conforme el usuario escribe, la placa debe convertirse automáticamente a mayúsculas
   */
  it('Debe convertir automáticamente el texto de la placa a mayúsculas conforme se escribe', async () => {
    const mockClientes = [
      {
        id: 1,
        persona: {
          id: 1,
          numero_documento: '12345678',
          nombres: 'Juan',
          apellido_paterno: 'Pérez',
        },
      },
    ];

    apiModule.default.get.mockResolvedValue({ data: mockClientes });

    const user = userEvent.setup();

    // GUARDAMOS EL CONTAINER
    const { container } = render(
      <BrowserRouter>
        <NuevoOSTPage />
      </BrowserRouter>
    );

    // Esperamos a que se carguen los clientes
    await waitFor(() => {
      expect(apiModule.default.get).toHaveBeenCalledWith('/clientes/');
    });

    // CORRECCIÓN: Encontramos el input de placa por su ID de manera infalible
    const placaInput = container.querySelector('#placa');

    // Escribimos la placa en minúsculas
    await user.type(placaInput, 'abc-123');

    // Verificamos que se haya convertido a mayúsculas automáticamente
    expect(placaInput.value).toBe('ABC-123');

    // Limpiamos y escribimos con una mezcla de mayúsculas y minúsculas
    await user.clear(placaInput);
    await user.type(placaInput, 'aBc-456');

    // Verificamos que se haya convertido a mayúsculas
    expect(placaInput.value).toBe('ABC-456');
  });

  /**
   * CASO 4: Flujo feliz completo
   * Expected: Llenado de campos válidos -> POST /ost/ exitoso -> Redirección a /dashboard/ost
   */
  it('Debe completar el flujo exitoso: llenar campos, hacer POST /ost/ y redirigir al dashboard', async () => {
    const mockClientes = [
      {
        id: 1,
        persona: {
          id: 1,
          numero_documento: '12345678',
          nombres: 'Juan',
          apellido_paterno: 'Pérez',
        },
      },
    ];

    // Configuramos mock para GET (carga inicial de clientes)
    apiModule.default.get.mockResolvedValue({ data: mockClientes });

    // Configuramos mock para POST (creación de OST)
    apiModule.default.post.mockResolvedValue({ data: { id: 1, success: true } });

    const user = userEvent.setup();

    // CORRECCIÓN: GUARDAMOS EL CONTAINER PARA SELECTORES DIRECTOS POR ID
    const { container } = render(
      <BrowserRouter>
        <NuevoOSTPage />
      </BrowserRouter>
    );

    // Esperamos a que se carguen los clientes
    await waitFor(() => {
      expect(apiModule.default.get).toHaveBeenCalledWith('/clientes/');
    });

    // CORRECCIÓN: Encontramos todos los inputs de forma infalible por su ID del HTML
    const clientSelect = screen.getByRole('combobox');
    const placaInput = container.querySelector('#placa');
    const marcaInput = container.querySelector('#marca');
    const modeloInput = container.querySelector('#modelo');
    const fallaInput = container.querySelector('#falla_reportada');

    // Llenamos el formulario con datos válidos
    await user.selectOptions(clientSelect, '1'); // Seleccionar cliente con ID 1
    await user.type(placaInput, 'abc-123'); // Será convertido a ABC-123
    await user.type(marcaInput, 'Toyota');
    await user.type(modeloInput, 'Corolla 2020');
    await user.type(fallaInput, 'El motor no arranca en la mañana');

    // Verificamos que la placa se haya convertido a mayúsculas
    expect(placaInput.value).toBe('ABC-123');

    // Buscamos el botón de guardar
    const saveButton = screen.getByRole('button', { name: /guardar|save|registrar/i });
    await user.click(saveButton);

    // Esperamos a que se realice la petición POST con el payload correcto
    await waitFor(() => {
      expect(apiModule.default.post).toHaveBeenCalledWith('/ost/', expect.objectContaining({
        cliente_id: 1,
        placa: 'ABC-123',
        marca: 'Toyota',
        modelo: 'Corolla 2020',
        falla_reportada: 'El motor no arranca en la mañana',
      }));
    });

    // Verificamos que se haya llamado a navigate para redirigir al dashboard
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/ost');
  });
});
