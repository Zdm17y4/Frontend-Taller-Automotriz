import { describe, test, expect } from 'vitest';

const validatePlaca = (placa) => {
  if (placa === null || placa === undefined) return false;
  const plateRegex = /^[a-zA-Z][a-zA-Z0-9]{2}-[0-9]{3}$/;
  return plateRegex.test(String(placa));
};

describe('Validación Placa Peruana', () => {
  test('debe validar placa peruana correcta', () => {
    expect(validatePlaca('ABC-123')).toBe(true);
  });

  test('debe validar placa peruana con números y letras', () => {
    expect(validatePlaca('A1B-456')).toBe(true);
  });

  test('debe validar placa peruana con letra inicial', () => {
    expect(validatePlaca('XYZ-789')).toBe(true);
  });

  test('debe validar placa con letras minúsculas', () => {
    expect(validatePlaca('abc-123')).toBe(true);
  });

  test('debe validar múltiples placas válidas', () => {
    expect(validatePlaca('AAA-001')).toBe(true);
    expect(validatePlaca('ZZZ-999')).toBe(true);
    expect(validatePlaca('A2B-567')).toBe(true);
  });

  test('debe rechazar placa sin guion', () => {
    expect(validatePlaca('ABC123')).toBe(false);
  });

  test('debe rechazar placa inválida sin guion en formato correcto', () => {
    expect(validatePlaca('ABCDEFG')).toBe(false);
  });

  test('debe rechazar placa con guion en posición incorrecta', () => {
    expect(validatePlaca('AB-C123')).toBe(false);
  });

  test('debe rechazar placa que comienza con número', () => {
    expect(validatePlaca('1BC-123')).toBe(false);
  });

  test('debe rechazar placa incompleta', () => {
    expect(validatePlaca('AB-12')).toBe(false);
  });

  test('debe rechazar placa vacía', () => {
    expect(validatePlaca('')).toBe(false);
  });

  test('debe rechazar placa con espacios', () => {
    expect(validatePlaca('ABC -123')).toBe(false);
  });

  test('debe rechazar placa con múltiples guiones', () => {
    expect(validatePlaca('ABC--123')).toBe(false);
  });

  test('debe rechazar placa con caracteres especiales', () => {
    expect(validatePlaca('AB@-123')).toBe(false);
    expect(validatePlaca('ABC-1#3')).toBe(false);
  });

  test('debe rechazar placa con más de 3 caracteres iniciales', () => {
    expect(validatePlaca('ABCD-123')).toBe(false);
  });

  test('debe rechazar placa con menos de 3 caracteres iniciales', () => {
    expect(validatePlaca('AB-123')).toBe(false);
  });

  test('debe rechazar placa con más de 3 números', () => {
    expect(validatePlaca('ABC-1234')).toBe(false);
  });

  test('debe rechazar placa con menos de 3 números', () => {
    expect(validatePlaca('ABC-12')).toBe(false);
  });

  test('debe rechazar placa null o undefined', () => {
    expect(validatePlaca(null)).toBe(false);
    expect(validatePlaca(undefined)).toBe(false);
  });
});
