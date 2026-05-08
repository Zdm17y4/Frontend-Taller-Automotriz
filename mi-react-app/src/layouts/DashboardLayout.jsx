import React, { useContext } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Users, UserPlus, FileText, LogOut } from 'lucide-react';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Taller Admin</h2>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/dashboard/clientes" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Users size={20} />
            <span>Clientes</span>
          </NavLink>
          <NavLink to="/dashboard/clientes/nuevo" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <UserPlus size={20} />
            <span>Nuevo Cliente</span>
          </NavLink>
          <div className="nav-item disabled">
            <FileText size={20} />
            <span>Órdenes de Trabajo</span>
          </div>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <h3>Sistema de Gestión Automotriz</h3>
        </header>
        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
