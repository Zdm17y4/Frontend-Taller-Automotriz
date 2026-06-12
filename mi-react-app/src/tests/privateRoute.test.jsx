import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../routes/PrivateRoute';
import { AuthContext } from '../context/AuthContext';

/**
 * Pruebas de PrivateRoute: Validar EXCLUSIVAMENTE el comportamiento del componente
 * frente a los estados del AuthContext (isAuthenticated, loading).
 */
describe('PrivateRoute - Protección de Rutas por Estado Auth', () => {
  const ProtectedContent = () => <div>Protected Outlet</div>;

  /**
   * CASO 1: isAuthenticated = false → Renderiza Navigate a /login
   */
  test('debe redirigir a /login cuando isAuthenticated es false', () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ isAuthenticated: false, loading: false }}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<ProtectedContent />} />
            </Route>
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    );

    window.history.pushState({}, '', '/dashboard');

    // PrivateRoute debe renderizar Navigate, que redirige a /login
    // Verificamos que NO se renderice el contenido protegido
    expect(screen.queryByText('Protected Outlet')).not.toBeInTheDocument();
  });

  /**
   * CASO 2: isAuthenticated = true → Renderiza Outlet
   */
  test('debe renderizar Outlet cuando isAuthenticated es true', () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ isAuthenticated: true, loading: false }}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<ProtectedContent />} />
            </Route>
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    );

    window.history.pushState({}, '', '/dashboard');

    // PrivateRoute debe renderizar el Outlet con el contenido protegido
    expect(screen.getByText('Protected Outlet')).toBeInTheDocument();
  });

  /**
   * CASO 3: loading = true → Renderiza indicador "Cargando..."
   */
  test('debe mostrar "Cargando..." cuando loading es true', () => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ isAuthenticated: false, loading: true }}>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<ProtectedContent />} />
            </Route>
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    );

    // PrivateRoute debe mostrar el indicador de carga
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
    expect(screen.queryByText('Protected Outlet')).not.toBeInTheDocument();
  });
});
