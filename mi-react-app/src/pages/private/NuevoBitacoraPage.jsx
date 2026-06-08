import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { ArrowLeft, Save } from 'lucide-react';
import './NuevoBitacoraPage.css';

const NuevoBitacoraPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    problema: '',
    solucion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.problema.trim()) {
      setError('El detalle del problema es obligatorio.');
      setLoading(false);
      return;
    }

    if (!formData.solucion.trim()) {
      setError('La descripción de la solución es obligatoria.');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        problema: formData.problema.trim(),
        solucion: formData.solucion.trim()
      };

      await api.post('/bitacora/', payload);
      navigate('/dashboard/bitacora');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al guardar la entrada en la bitácora.');
      setLoading(false);
    }
  };

  return (
    <div className="nuevo-bitacora-page">
      <div className="page-header">
        <div className="flex-header">
          <button className="btn-icon-back" onClick={() => navigate('/dashboard/bitacora')}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2>Agregar a la Bitácora</h2>
            <p>Registre una nueva solución o diagnóstico para enriquecer la base de conocimiento técnico.</p>
          </div>
        </div>
      </div>

      {error && <div className="alert-error">{error}</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit} className="bitacora-form">
          <h3 className="section-title">Registro Técnico</h3>
          <hr className="divider" />

          <div className="form-row">
            <div className="form-group full">
              <label htmlFor="problema">Problema o Falla Reportada</label>
              <textarea 
                id="problema" 
                name="problema" 
                value={formData.problema} 
                onChange={handleChange}
                placeholder="Describa el síntoma o la falla reportada (ej: Chirrido metálico en rueda delantera derecha al frenar)..."
                rows="4"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full">
              <label htmlFor="solucion">Solución o Reparación Aplicada</label>
              <textarea 
                id="solucion" 
                name="solucion" 
                value={formData.solucion} 
                onChange={handleChange}
                placeholder="Describa la solución técnica aplicada (ej: Cambio de pastillas de freno y rectificación de discos)..."
                rows="5"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate('/dashboard/bitacora')}>
              Cancelar
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              <Save size={18} />
              {loading ? 'Guardando...' : 'Guardar en Bitácora'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoBitacoraPage;
