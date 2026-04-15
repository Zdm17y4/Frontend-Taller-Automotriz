import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-container">

                {/* --- PARTE SUPERIOR: CENTRAL --- */}
                <div className="footer-top">
                    <h2>CENTRAL - 9XX XXX XXX</h2>
                </div>

                {/* --- PARTE MEDIA: LOCALES --- */}
                <div className="footer-middle">
                    {/* Taller Premium */}
                    <div className="locations-block premium-block">
                        <h3 className="block-title">TALLER PREMIUM</h3>
                        <div className="location-item">
                            <span className="icon-marker">📍</span> {/* Reemplazar con tu ícono */}
                            <p>Surquillo</p>
                            <p>9XX XXX XXX</p>
                            <p>-</p>
                        </div>
                    </div>

                    {/* Talleres Multimarca */}
                    <div className="locations-block multimarca-block">
                        <h3 className="block-title">TALLERES MULTIMARCA</h3>
                        <div className="multimarca-grid">
                            <div className="location-item">
                                <span className="icon-marker">📍</span>
                                <p>Surquillo.</p>
                                <p>9XX XXX XXX</p>
                                <p>-</p>
                            </div>
                            <div className="location-item">
                                <span className="icon-marker">📍</span>
                                <p>San Luis</p>
                                <p>9XX XXX XXX</p>
                                <p>-</p>
                            </div>
                            <div className="location-item">
                                <span className="icon-marker">📍</span>
                                <p>La Molina</p>
                                <p>9XX XXX XXX</p>
                                <p>-</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- PARTE INFERIOR --- */}
                <div className="footer-bottom">
                    <div className="info-column">
                        <h4>HORARIO DE ATENCIÓN</h4>
                        <p>Lunes a Viernes: 08:00 a.m. – 12:30 p.m.</p>
                        <p className="indent-time">02:15 p.m. – 05:30 p.m.</p>
                        <p>Sábado: 08:00 a.m. – 12:00 p.m.</p>
                        <p>Domingos y feriados: Cerrado</p>
                    </div>

                    <div className="info-column">
                        <h4>SINIESTROS</h4>
                        <p>Trabajamos con todas las compañías de seguros, clientes particulares, corporativos y flotas</p>
                    </div>

                    <div className="info-column">
                        <h4>LEGAL</h4>
                        <ul>
                            <li><a href="#">º Protección de Datos Personales</a></li>
                            <li><a href="#">º Código de Conducta</a></li>
                            <li><a href="#">º Política de Video Vigilancia</a></li>
                            <li><a href="#">º Privacidad Registros de Visitas</a></li>
                        </ul>
                    </div>

                    <div className="info-column tow-truck-column">
                        <h4>GRÚA</h4>
                        <div className="tow-truck-icon">
                            🚚
                        </div>
                        <p>Servicio de grúa</p>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;