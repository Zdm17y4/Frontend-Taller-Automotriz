import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { ArrowLeft, Save } from 'lucide-react';
import './NuevoClientePage.css';

const NuevoClientePage = () => {
  const navigate = useNavigate();
  const [catalogos, setCatalogos] = useState({ tiposDocumento: [], sexos: [] });
  const [loading, setLoading] = useState(false);
  const [loadingCatalogos, setLoadingCatalogos] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    tipo_documento_id: '',
    numero_documento: '',
    nombres: '',
    apellido_paterno: '',
    apellido_materno: '',
    direccion: '',
    telefono: '',
    sexo_id: ''
  });

  useEffect(() => {
    const fetchCatalogos = async () => {
      try {
        const [docRes, sexoRes] = await Promise.all([
          api.get('/catalogos/tipo-documento'),
          api.get('/catalogos/sexo')
        ]);
        
        setCatalogos({
          tiposDocumento: docRes.data,
          sexos: sexoRes.data
        });
        
        // Seleccionar primeros valores por defecto si existen
        if (docRes.data.length > 0 && sexoRes.data.length > 0) {
          setFormData(prev => ({
            ...prev,
            tipo_documento_id: docRes.data[0].id,
            sexo_id: sexoRes.data[0].id
          }));
        }
        
      } catch (err) {
        setError('Error al cargar catálogos. Refresque la página.');
      } finally {
        setLoadingCatalogos(false);
      }
    };

    fetchCatalogos();
  }, []);

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

    try {
      // Transform id strings to numbers
      const payload = {
        ...formData,
        tipo_documento_id: parseInt(formData.tipo_documento_id),
        sexo_id: parseInt(formData.sexo_id)
      };

      await api.post('/clientes/', payload);
      navigate('/dashboard/clientes');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al guardar el cliente. Verifique los datos.');
      setLoading(false);
    }
  };

  return (
    <div className="nuevo-cliente-page">
      <div className="page-header">
        <div className="flex-header">
          <button className="btn-icon-back" onClick={() => navigate('/dashboard/clientes')}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2>Registrar Nuevo Cliente</h2>
            <p>Ingrese los datos personales para dar de alta a un nuevo cliente.</p>
          </div>
        </div>
      </div>

      {error && <div className="alert-error">{error}</div>}

      <div className="form-container">
        {loadingCatalogos ? (
          <div className="loading-state">Cargando formulario...</div>
        ) : (
          <form onSubmit={handleSubmit} className="cliente-form">
            <h3 className="section-title">Datos Personales</h3>
            <hr className="divider" />
            
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="tipo_documento_id">Tipo de Documento</label>
                <select 
                  id="tipo_documento_id" 
                  name="tipo_documento_id" 
                  value={formData.tipo_documento_id} 
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Seleccione...</option>
                  {catalogos.tiposDocumento.map(tipo => (
                    <option key={tipo.id} value={tipo.id}>{tipo.descripcion}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group half">
                <label htmlFor="numero_documento">Número de Documento</label>
                <input 
                  type="text" 
                  id="numero_documento" 
                  name="numero_documento" 
                  value={formData.numero_documento} 
                  onChange={handleChange}
                  placeholder="Ej. 12345678"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombres">Nombres</label>
                <input 
                  type="text" 
                  id="nombres" 
                  name="nombres" 
                  value={formData.nombres} 
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="apellido_paterno">Apellido Paterno</label>
                <input 
                  type="text" 
                  id="apellido_paterno" 
                  name="apellido_paterno" 
                  value={formData.apellido_paterno} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group half">
                <label htmlFor="apellido_materno">Apellido Materno</label>
                <input 
                  type="text" 
                  id="apellido_materno" 
                  name="apellido_materno" 
                  value={formData.apellido_materno} 
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="sexo_id">Sexo</label>
                <select 
                  id="sexo_id" 
                  name="sexo_id" 
                  value={formData.sexo_id} 
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Seleccione...</option>
                  {catalogos.sexos.map(sexo => (
                    <option key={sexo.id} value={sexo.id}>{sexo.descripcion}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group half">
                <label htmlFor="telefono">Teléfono (Opcional)</label>
                <input 
                  type="text" 
                  id="telefono" 
                  name="telefono" 
                  value={formData.telefono} 
                  onChange={handleChange}
                  placeholder="Ej. 999888777"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full">
                <label htmlFor="direccion">Dirección (Opcional)</label>
                <input 
                  type="text" 
                  id="direccion" 
                  name="direccion" 
                  value={formData.direccion} 
                  onChange={handleChange}
                  placeholder="Av. Principal 123"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={() => navigate('/dashboard/clientes')}>
                Cancelar
              </button>
              <button type="submit" className="btn-save" disabled={loading}>
                <Save size={18} />
                {loading ? 'Guardando...' : 'Guardar Cliente'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default NuevoClientePage;
