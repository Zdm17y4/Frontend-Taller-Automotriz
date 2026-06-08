import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import { ArrowLeft, User, Car, AlertTriangle, Calendar, FileText } from 'lucide-react';
import './OSTDetailPage.css';

const OSTDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ost, setOst] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOstDetail = async () => {
      try {
        const response = await api.get(`/ost/${id}`);
        setOst(response.data);
      } catch (err) {
        setError('Error al cargar los detalles de la orden de servicio técnico.');
      } finally {
        setLoading(false);
      }
    };

    fetchOstDetail();
  }, [id]);

  const formatFecha = (fechaString) => {
    if (!fechaString) return '-';
    try {
      const date = new Date(fechaString);
      return date.toLocaleString('es-PE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (err) {
      return fechaString;
    }
  };

  return (
    <div className="ost-detail-page">
      <div className="page-header">
        <div className="flex-header">
          <button className="btn-icon-back" onClick={() => navigate('/dashboard/ost')}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2>Detalles de la Orden</h2>
            <p>Información detallada de la orden de servicio técnico registrada.</p>
          </div>
        </div>
      </div>

      {error && <div className="alert-error">{error}</div>}

      {loading ? (
        <div className="loading-state">Cargando detalles de la orden...</div>
      ) : ost ? (
        <div className="detail-container">
          {/* Header de la Ficha */}
          <div className="detail-header-card">
            <div>
              <span className="detail-code">{ost.codigo}</span>
              <span className={`detail-status-badge ${ost.estado.toLowerCase()}`}>
                {ost.estado}
              </span>
            </div>
            <div className="detail-date-wrapper">
              <Calendar size={16} />
              <span>Ingreso: {formatFecha(ost.fecha_ingreso)}</span>
            </div>
          </div>

          <div className="detail-grid">
            {/* Tarjeta del Cliente */}
            <div className="detail-card">
              <div className="card-title-row">
                <User size={20} className="card-icon" />
                <h3>Datos del Cliente</h3>
              </div>
              <hr className="card-divider" />
              <div className="card-content">
                <div className="data-row">
                  <span className="data-label">Nombre Completo:</span>
                  <span className="data-value font-medium">
                    {ost.cliente.persona.nombres} {ost.cliente.persona.apellido_paterno} {ost.cliente.persona.apellido_materno}
                  </span>
                </div>
                <div className="data-row">
                  <span className="data-label">Documento:</span>
                  <span className="data-value">
                    <span className="doc-type">{ost.cliente.persona.tipo_documento.codigo}</span>
                    {ost.cliente.persona.numero_documento}
                  </span>
                </div>
                <div className="data-row">
                  <span className="data-label">Teléfono:</span>
                  <span className="data-value">{ost.cliente.persona.telefono || '-'}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">Dirección:</span>
                  <span className="data-value">{ost.cliente.persona.direccion || '-'}</span>
                </div>
              </div>
            </div>

            {/* Tarjeta del Vehículo */}
            <div className="detail-card">
              <div className="card-title-row">
                <Car size={20} className="card-icon" />
                <h3>Datos del Vehículo</h3>
              </div>
              <hr className="card-divider" />
              <div className="card-content">
                <div className="data-row">
                  <span className="data-label">Placa:</span>
                  <span className="data-value">
                    <span className="plate-badge">{ost.placa}</span>
                  </span>
                </div>
                <div className="data-row">
                  <span className="data-label">Marca:</span>
                  <span className="data-value">{ost.marca}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">Modelo:</span>
                  <span className="data-value">{ost.modelo}</span>
                </div>
              </div>
            </div>

            {/* Falla Reportada */}
            <div className="detail-card span-full">
              <div className="card-title-row">
                <AlertTriangle size={20} className="card-icon" />
                <h3>Falla Reportada</h3>
              </div>
              <hr className="card-divider" />
              <div className="card-content">
                <div className="falla-content-box">
                  {ost.falla_reportada}
                </div>
              </div>
            </div>
          </div>

          <div className="detail-actions">
            <button className="btn-secondary" onClick={() => navigate('/dashboard/ost')}>
              Regresar al Listado
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-state">No se encontró la orden de servicio.</div>
      )}
    </div>
  );
};

export default OSTDetailPage;
