import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import './ClientesPage.css';

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await api.get('/clientes/');
      setClientes(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar la lista de clientes. Por favor intente más tarde.');
      setLoading(false);
    }
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
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Buscar cliente por nombre o documento..." />
          </div>
        </div>

        {loading ? (
          <div className="loading-state">Cargando clientes...</div>
        ) : clientes.length === 0 ? (
          <div className="empty-state">
            <p>No hay clientes registrados en el sistema.</p>
            <button className="btn-secondary" onClick={() => navigate('/dashboard/clientes/nuevo')}>
              Registrar el primer cliente
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
                    <button className="btn-icon" title="Editar" disabled><Edit size={18} /></button>
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
