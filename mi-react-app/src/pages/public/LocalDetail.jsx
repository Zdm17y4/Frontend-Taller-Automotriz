import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import Whatsapp from '../../components/public/Whatsapp';
import Copyright from '../../components/public/Copyright';
import './LocalDetail.css';
import mecanicoImg from '../../assets/images/mecanico.png';

const locales = {
  barranco: {
    title: 'Local Barranco',
    description: 'Local especializado en servicios de planchado, pintura y mantenimiento general.',
    address: 'Av. Grau 123, Barranco, Lima',
    phone: '(01) 123 4567',
    hours: 'Lun-Vie: 8:00 - 18:00\nSáb: 9:00 - 14:00',
    services: ['Planchado y pintura', 'Mecánica rápida', 'Aire acondicionado']
  },
  independencia: {
    title: 'Local Independencia',
    description: 'Atención completa en servicios de mecánica y diagnóstico.',
    address: 'Av. Prolongación Tacna 456, Independencia, Lima',
    phone: '(01) 234 5678',
    hours: 'Lun-Vie: 8:00 - 18:00\nSáb: 9:00 - 14:00',
    services: ['Mecánica general', 'Reparación de frenos', 'Sistema de refrigeración']
  },
  sjl: {
    title: 'Local San Juan de Lurigancho',
    description: 'Sede con servicios amplios para todo tipo de vehículos.',
    address: 'Av. Próceres de la Independencia 789, SJL, Lima',
    phone: '(01) 345 6789',
    hours: 'Lun-Vie: 8:00 - 18:00\nSáb: 9:00 - 14:00',
    services: ['Planchado y pintura', 'Electricidad automotriz', 'Mantenimiento preventivo']
  }
};

const LocalDetail = ({ id }) => {
  const navigate = useNavigate();
  const local = locales[id] || locales.barranco;

  return (
    <>
      <Navbar />
      <section className="local-detail-hero" style={{ backgroundImage: `url(${mecanicoImg})` }}>
        <div className="hero-overlay">
          <h1>{local.title}</h1>
          <p>{local.description}</p>
        </div>
      </section>

      <div className="breadcrumb-container">
        <div className="breadcrumb">
          <button type="button" className="breadcrumb-link" onClick={() => navigate('/')}>
            Inicio
          </button>
          <span className="breadcrumb-separator">&gt;</span>
          <button type="button" className="breadcrumb-link" onClick={() => navigate('/servicio/locales')}>
            Locales
          </button>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">{local.title}</span>
        </div>
      </div>

      <main className="local-detail-container">
        <section className="local-detail-main">
          <div className="local-detail-card">
            <h2>Información del local</h2>
            <p>{local.description}</p>
            <div className="local-detail-info">
              <div>
                <strong>Dirección</strong>
                <p>{local.address}</p>
              </div>
              <div>
                <strong>Teléfono</strong>
                <p>{local.phone}</p>
              </div>
              <div>
                <strong>Horario</strong>
                <p style={{ whiteSpace: 'pre-line' }}>{local.hours}</p>
              </div>
            </div>
          </div>

          <div className="local-detail-card local-detail-services">
            <h2>Servicios disponibles</h2>
            <ul>
              {local.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Whatsapp />
      <Footer />
      <Copyright />
    </>
  );
};

export default LocalDetail;
