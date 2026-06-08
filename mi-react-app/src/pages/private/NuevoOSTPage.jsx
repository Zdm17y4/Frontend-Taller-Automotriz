import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { ArrowLeft, Save, Search, CheckCircle } from 'lucide-react';
import './NuevoOSTPage.css';

const NuevoOSTPage = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingClientes, setLoadingClientes] = useState(true);
  const [error, setError] = useState('');
  
  // Search Client by DNI
  const [searchDni, setSearchDni] = useState('');
  const [searchedClient, setSearchedClient] = useState(null);
  const [searchFeedback, setSearchFeedback] = useState('');

  const [formData, setFormData] = useState({
    cliente_id: '',
    placa: '',
    marca: '',
    modelo: '',
    falla_reportada: ''
  });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await api.get('/clientes/');
      setClientes(response.data);
    } catch (err) {
      setError('Error al cargar la lista de clientes.');
    } finally {
      setLoadingClientes(false);
    }
  };

  const handleSearchDni = async (e) => {
    if (e) e.preventDefault();
    if (!searchDni.trim()) return;

    setSearchFeedback('');
    try {
      const response = await api.get(`/clientes/${searchDni.trim()}`);
      const client = response.data;
      setSearchedClient(client);
      setFormData(prev => ({
        ...prev,
        cliente_id: client.id.toString()
      }));
      setSearchFeedback(`Seleccionado: ${client.persona.nombres} ${client.persona.apellido_paterno}`);
    } catch (err) {
      setSearchedClient(null);
      setSearchFeedback('Cliente no encontrado con ese número de documento.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Auto convert plate to uppercase
    let finalValue = value;
    if (name === 'placa') {
      finalValue = value.toUpperCase();
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));

    // If client selection dropdown changes, sync search DNI feedback
    if (name === 'cliente_id') {
      const chosen = clientes.find(c => c.id.toString() === value);
      if (chosen) {
        setSearchDni(chosen.persona.numero_documento);
        setSearchedClient(chosen);
        setSearchFeedback(`Seleccionado: ${chosen.persona.nombres} ${chosen.persona.apellido_paterno}`);
      } else {
        setSearchDni('');
        setSearchedClient(null);
        setSearchFeedback('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.cliente_id) {
      setError('Debe seleccionar un cliente.');
      setLoading(false);
      return;
    }

    // Plate regex validation: ^[a-zA-Z][a-zA-Z0-9]{2}-[0-9]{3}$ (e.g. ABC-123)
    const plateRegex = /^[a-zA-Z][a-zA-Z0-9]{2}-[0-9]{3}$/;
    if (!plateRegex.test(formData.placa.trim())) {
      setError('Formato de placa inválido. Debe ser del tipo ABC-123 (letra inicial obligatoria, guion obligatorio).');
      setLoading(false);
      return;
    }

    if (!formData.marca.trim()) {
      setError('La marca del vehículo es obligatoria.');
      setLoading(false);
      return;
    }

    if (!formData.modelo.trim()) {
      setError('El modelo del vehículo es obligatorio.');
      setLoading(false);
      return;
    }

    if (!formData.falla_reportada.trim()) {
      setError('La falla reportada es obligatoria.');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        cliente_id: parseInt(formData.cliente_id),
        placa: formData.placa.trim(),
        marca: formData.marca.trim(),
        modelo: formData.modelo.trim(),
        falla_reportada: formData.falla_reportada.trim()
      };

      await api.post('/ost/', payload);
      navigate('/dashboard/ost');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al guardar la orden de trabajo.');
      setLoading(false);
    }
  };

  return (
    <div className="nuevo-ost-page">
      <div className="page-header">
        <div className="flex-header">
          <button className="btn-icon-back" onClick={() => navigate('/dashboard/ost')}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2>Registrar Nueva OST</h2>
            <p>Registre una nueva orden de servicio técnico para un cliente.</p>
          </div>
        </div>
      </div>

      {error && <div className="alert-error">{error}</div>}

      <div className="form-container">
        {loadingClientes ? (
          <div className="loading-state">Cargando formulario...</div>
        ) : (
          <form onSubmit={handleSubmit} className="ost-form">
            
            {/* Sección Cliente */}
            <h3 className="section-title">Asignación de Cliente</h3>
            <hr className="divider" />

            <div className="client-search-section">
              <div className="form-group flex-row">
                <div className="input-search-wrapper">
                  <label htmlFor="searchDni">Buscar por número de documento (DNI)</label>
                  <div className="search-input-btn">
                    <input 
                      type="text" 
                      id="searchDni" 
                      placeholder="Ej. 77665544" 
                      value={searchDni}
                      onChange={(e) => setSearchDni(e.target.value)}
                    />
                    <button 
                      type="button" 
                      className="btn-search-client" 
                      onClick={handleSearchDni}
                    >
                      <Search size={16} /> Buscar
                    </button>
                  </div>
                </div>

                <div className="dropdown-wrapper">
                  <label htmlFor="cliente_id">O seleccione de la lista</label>
                  <select 
                    id="cliente_id" 
                    name="cliente_id" 
                    value={formData.cliente_id} 
                    onChange={handleChange}
                  >
                    <option value="">Seleccione un cliente...</option>
                    {clientes.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.persona.nombres} {c.persona.apellido_paterno} {c.persona.apellido_materno} ({c.persona.numero_documento})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {searchFeedback && (
                <div className={`search-feedback-box ${searchedClient ? 'success' : 'error'}`}>
                  {searchedClient && <CheckCircle size={16} className="text-success-icon" />}
                  <span>{searchFeedback}</span>
                </div>
              )}
            </div>

            {/* Sección Vehículo */}
            <h3 className="section-title" style={{ marginTop: '2rem' }}>Datos del Vehículo</h3>
            <hr className="divider" />

            <div className="form-row">
              <div className="form-group third">
                <label htmlFor="placa">Placa</label>
                <input 
                  type="text" 
                  id="placa" 
                  name="placa" 
                  value={formData.placa} 
                  onChange={handleChange}
                  placeholder="Ej. ABC-123"
                  maxLength="7"
                  required
                />
              </div>

              <div className="form-group third">
                <label htmlFor="marca">Marca</label>
                <input 
                  type="text" 
                  id="marca" 
                  name="marca" 
                  value={formData.marca} 
                  onChange={handleChange}
                  placeholder="Ej. Toyota"
                  required
                />
              </div>

              <div className="form-group third">
                <label htmlFor="modelo">Modelo</label>
                <input 
                  type="text" 
                  id="modelo" 
                  name="modelo" 
                  value={formData.modelo} 
                  onChange={handleChange}
                  placeholder="Ej. Corolla"
                  required
                />
              </div>
            </div>

            {/* Detalle del Trabajo */}
            <h3 className="section-title" style={{ marginTop: '2rem' }}>Detalle de Servicio</h3>
            <hr className="divider" />

            <div className="form-row">
              <div className="form-group full">
                <label htmlFor="falla_reportada">Falla Reportada</label>
                <textarea 
                  id="falla_reportada" 
                  name="falla_reportada" 
                  value={formData.falla_reportada} 
                  onChange={handleChange}
                  placeholder="Describa el problema reportado por el cliente..."
                  rows="4"
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={() => navigate('/dashboard/ost')}>
                Cancelar
              </button>
              <button type="submit" className="btn-save" disabled={loading}>
                <Save size={18} />
                {loading ? 'Registrando...' : 'Registrar OST'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default NuevoOSTPage;
