import { describe, test, expect } from 'vitest';

const validateTelefono = (telefono) => {
  if (telefono === null || telefono === undefined) return false;
  const telRegex = /^[0-9]{9}$/;
  return telRegex.test(String(telefono));
};

describe('Validación Teléfono', () => {
  test('debe validar teléfono correcto', () => {
    expect(validateTelefono('987654321')).toBe(true);
  });

  test('debe validar teléfono correcto con ceros', () => {
    expect(validateTelefono('900000000')).toBe(true);
  });

  test('debe validar múltiples teléfonos válidos', () => {
    expect(validateTelefono('111111111')).toBe(true);
    expect(validateTelefono('999999999')).toBe(true);
    expect(validateTelefono('555555555')).toBe(true);
  });

  test('debe rechazar teléfono incorrecto', () => {
    expect(validateTelefono('98765432')).toBe(false);
  });

  test('debe rechazar teléfono con menos de 9 dígitos', () => {
    expect(validateTelefono('98765')).toBe(false);
  });

  test('debe rechazar teléfono con más de 9 dígitos', () => {
    expect(validateTelefono('9876543210')).toBe(false);
  });

  test('debe rechazar teléfono con letras', () => {
    expect(validateTelefono('98765432a')).toBe(false);
  });

  test('debe rechazar teléfono con letras mayúsculas', () => {
    expect(validateTelefono('98765432A')).toBe(false);
  });

  test('debe rechazar teléfono vacío', () => {
    expect(validateTelefono('')).toBe(false);
  });

  test('debe rechazar teléfono con espacios', () => {
    expect(validateTelefono('9876 5432')).toBe(false);
  });

  test('debe rechazar teléfono con guiones', () => {
    expect(validateTelefono('987-654-321')).toBe(false);
  });

  test('debe rechazar teléfono con caracteres especiales', () => {
    expect(validateTelefono('98765432@')).toBe(false);
    expect(validateTelefono('987654#21')).toBe(false);
  });

  test('debe rechazar teléfono null o undefined', () => {
    expect(validateTelefono(null)).toBe(false);
    expect(validateTelefono(undefined)).toBe(false);
  });
});
