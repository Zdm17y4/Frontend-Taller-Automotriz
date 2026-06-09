import { describe, test, expect } from 'vitest';

const validateDNI = (dni) => {
  if (dni === null || dni === undefined) return false;
  const dniRegex = /^[0-9]{8}$/;
  return dniRegex.test(String(dni));
};

describe('Validación DNI', () => {
  test('debe validar DNI correcto', () => {
    expect(validateDNI('12345678')).toBe(true);
  });

  test('debe validar DNI correcto con ceros', () => {
    expect(validateDNI('00000000')).toBe(true);
  });

  test('debe validar múltiples DNIs válidos', () => {
    expect(validateDNI('87654321')).toBe(true);
    expect(validateDNI('11111111')).toBe(true);
    expect(validateDNI('99999999')).toBe(true);
  });

  test('debe rechazar DNI incorrecto', () => {
    expect(validateDNI('1234567')).toBe(false);
  });

  test('debe rechazar DNI con menos de 8 dígitos', () => {
    expect(validateDNI('123456')).toBe(false);
  });

  test('debe rechazar DNI con más de 8 dígitos', () => {
    expect(validateDNI('123456789')).toBe(false);
  });

  test('debe rechazar DNI con letras', () => {
    expect(validateDNI('1234567a')).toBe(false);
  });

  test('debe rechazar DNI con letras mayúsculas', () => {
    expect(validateDNI('1234567A')).toBe(false);
  });

  test('debe rechazar DNI vacío', () => {
    expect(validateDNI('')).toBe(false);
  });

  test('debe rechazar DNI con espacios', () => {
    expect(validateDNI('1234 5678')).toBe(false);
  });

  test('debe rechazar DNI con guiones', () => {
    expect(validateDNI('1234-5678')).toBe(false);
  });

  test('debe rechazar DNI con caracteres especiales', () => {
    expect(validateDNI('123456@8')).toBe(false);
    expect(validateDNI('12345#78')).toBe(false);
    expect(validateDNI('123456.8')).toBe(false);
  });

  test('debe rechazar DNI null o undefined', () => {
    expect(validateDNI(null)).toBe(false);
    expect(validateDNI(undefined)).toBe(false);
  });
});
