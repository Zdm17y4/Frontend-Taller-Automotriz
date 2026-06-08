import React from 'react';
import { Users, FileText, Settings, Activity } from 'lucide-react';
import './DashboardHome.css';

const DashboardHome = () => {
  return (
    <div className="dashboard-home">
      <h2>Bienvenido al Panel de Administración</h2>
      <p className="welcome-text">Desde aquí puedes gestionar los clientes, órdenes de trabajo y configurar el sistema.</p>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon clients">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>Clientes Activos</h3>
            <p className="stat-value">Gestión de datos</p>
          </div>
        </div>
        
        <div className="stat-card disabled">
          <div className="stat-icon orders">
            <FileText size={24} />
          </div>
          <div className="stat-info">
            <h3>Órdenes (Próximamente)</h3>
            <p className="stat-value">-</p>
          </div>
        </div>
        
        <div className="stat-card disabled">
          <div className="stat-icon activity">
            <Activity size={24} />
          </div>
          <div className="stat-info">
            <h3>Actividad (Próximamente)</h3>
            <p className="stat-value">-</p>
          </div>
        </div>
        
        <div className="stat-card disabled">
          <div className="stat-icon settings">
            <Settings size={24} />
          </div>
          <div className="stat-info">
            <h3>Configuración (Próximamente)</h3>
            <p className="stat-value">-</p>
          </div>
        </div>
      </div>
      
      <div className="recent-activity">
        <h3>Actividad Reciente</h3>
        <div className="empty-state">
          <p>El sistema está listo para registrar nueva actividad.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
