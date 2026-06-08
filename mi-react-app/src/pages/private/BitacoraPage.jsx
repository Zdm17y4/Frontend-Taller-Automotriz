import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Plus, Search, BookOpen } from 'lucide-react';
import './BitacoraPage.css';

const BitacoraPage = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async (query = searchQuery) => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (query.trim()) {
        params.busqueda = query.trim();
      }
      const response = await api.get('/bitacora/', { params });
      setEntries(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar la bitácora de soluciones.');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEntries();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchEntries('');
  };

  const formatFecha = (fechaString) => {
    if (!fechaString) return '-';
    try {
      const date = new Date(fechaString);
      return date.toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (err) {
      return fechaString;
    }
  };

  return (
    <div className="bitacora-page">
      <div className="page-header">
        <div>
          <h2>Bitácora del Taller</h2>
          <p>Base de conocimiento técnico con problemas y soluciones frecuentes.</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => navigate('/dashboard/bitacora/nuevo')}
        >
          <Plus size={20} />
          Nueva Entrada
        </button>
      </div>

      {error && <div className="alert-error">{error}</div>}

      <div className="table-container">
        <div className="table-toolbar">
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div className="search-box" style={{ margin: 0, flex: 1, maxWidth: '400px' }}>
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Buscar por problema o solución..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
              Buscar
            </button>
            {searchQuery && (
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
          <div className="loading-state">Cargando entradas de bitácora...</div>
        ) : entries.length === 0 ? (
          <div className="empty-state">
            <p>No se encontraron registros en la bitácora.</p>
            <button className="btn-secondary" onClick={() => navigate('/dashboard/bitacora/nuevo')}>
              Registrar la primera solución
            </button>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '120px' }}>Fecha</th>
                <th style={{ width: '40%' }}>Problema Detectado</th>
                <th style={{ width: '50%' }}>Solución Aplicada</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="text-small text-muted">{formatFecha(entry.created_at)}</td>
                  <td className="font-medium cell-wrap">{entry.problema}</td>
                  <td className="text-muted cell-wrap">{entry.solucion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BitacoraPage;
