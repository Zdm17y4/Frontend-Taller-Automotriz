import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import Whatsapp from '../../components/public/Whatsapp';
import Copyright from '../../components/public/Copyright';
import './LocalesList.css';
import mecanicoImg from '../../assets/images/mecanico.png';

const LocalesList = () => {
  const navigate = useNavigate();

  const locales = [
    { id: 'barranco', title: 'Barranco', subtitle: 'Local con atención express', route: '/servicio/locales-barranco' },
    { id: 'independencia', title: 'Independencia', subtitle: 'Local para servicios rápidos', route: '/servicio/locales-independencia' },
    { id: 'sjl', title: 'San Juan de Lurigancho', subtitle: 'Local con cobertura completa', route: '/servicio/locales-sjl' }
  ];

  return (
    <>
      <Navbar />
      <section className="locales-hero" style={{ backgroundImage: `url(${mecanicoImg})` }}>
        <div className="hero-overlay">
          <h1>Nuestros Locales</h1>
          <p>Elige la sede más cercana y revisa sus servicios disponibles.</p>
        </div>
      </section>

      <div className="breadcrumb-container">
        <div className="breadcrumb">
          <span className="red-text">Inicio &gt; </span>
          <span className="gray-text">Locales</span>
        </div>
      </div>

      <main className="locales-list-container">
        <p className="locales-list-intro">Contamos con locales en los principales distritos para atender tus necesidades de servicio automotriz.</p>

        <div className="locales-grid">
          {locales.map((local) => (
            <button key={local.id} type="button" className="local-card" onClick={() => navigate(local.route)}>
              <div className="local-card-body">
                <h3>{local.title}</h3>
                <p>{local.subtitle}</p>
              </div>
              <span className="local-card-link">Ver local</span>
            </button>
          ))}
        </div>
      </main>

      <Whatsapp />
      <Footer />
      <Copyright />
    </>
  );
};

export default LocalesList;
