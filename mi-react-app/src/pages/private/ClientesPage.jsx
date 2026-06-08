import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import './ClientesPage.css';

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchDni, setSearchDni] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      setError('');
      const response = await api.get('/clientes/');
      setClientes(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar la lista de clientes. Por favor intente más tarde.');
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchDni.trim()) {
      fetchClientes();
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.get(`/clientes/${searchDni.trim()}`);
      setClientes([response.data]);
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 404) {
        setError(`No se encontró ningún cliente con el número de documento "${searchDni}".`);
        setClientes([]);
      } else {
        setError('Ocurrió un error al buscar el cliente.');
      }
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchDni('');
    fetchClientes();
  };

  return (
    <div className="clientes-page">
      <div className="page-header">
        <div>
          <h2>Directorio de Clientes</h2>
          <p>Gestiona la información de todos los clientes registrados.</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => navigate('/dashboard/clientes/nuevo')}
        >
          <Plus size={20} />
          Nuevo Cliente
        </button>
      </div>

      {error && <div className="alert-error">{error}</div>}

      <div className="table-container">
        <div className="table-toolbar">
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div className="search-box" style={{ margin: 0, flex: 1, maxWidth: '350px' }}>
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Buscar cliente por DNI/Documento..." 
                value={searchDni}
                onChange={(e) => setSearchDni(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
              Buscar
            </button>
            {searchDni && (
              <button 
                type="button" 
                className="btn-secondary" 
                style={{ margin: 0, padding: '0.5rem 1.25rem' }} 
                onClick={handleClearSearch}
              >
                Limpiar
              </button>
            )}
          </form>
        </div>

        {loading ? (
          <div className="loading-state">Cargando clientes...</div>
        ) : clientes.length === 0 ? (
          <div className="empty-state">
            <p>No se encontraron clientes.</p>
            <button className="btn-secondary" onClick={() => navigate('/dashboard/clientes/nuevo')}>
              Registrar nuevo cliente
            </button>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Documento</th>
                <th>Nombres y Apellidos</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>
                    <span className="doc-type">{cliente.persona.tipo_documento.codigo}</span>
                    {cliente.persona.numero_documento}
                  </td>
                  <td className="font-medium">
                    {cliente.persona.nombres} {cliente.persona.apellido_paterno} {cliente.persona.apellido_materno}
                  </td>
                  <td>{cliente.persona.telefono || '-'}</td>
                  <td className="truncate-text" title={cliente.persona.direccion}>{cliente.persona.direccion || '-'}</td>
                  <td className="actions-cell">
                    <button 
                      className="btn-icon" 
                      title="Editar" 
                      onClick={() => navigate(`/dashboard/clientes/editar/${cliente.id}`)}
                    >
                      <Edit size={18} />
                    </button>
                    <button className="btn-icon text-danger" title="Eliminar" disabled><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ClientesPage;
