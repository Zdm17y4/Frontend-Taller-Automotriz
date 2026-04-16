import React from 'react';
import './Footer.css';
import localitation from './assets/icon/localitation.png'
import crane from './assets/icon/crane.png'
const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-container">

                {/* --- PARTE SUPERIOR: CENTRAL --- */}
                <div className="footer-top">
                    <h2>CENTRAL - 974 297 933</h2>
                </div>

                {/* --- PARTE MEDIA: LOCALES --- */}
                <div className="footer-middle">
                    {/* Taller Premium */}
                    <div className="locations-block premium-block">
                        <h3 className="block-title">TALLER PREMIUM</h3>
                        <div className="location-item">
                            <span className="icon-marker">
                                <a href="">
                                    <img src={localitation} alt="ubicacion" />
                                </a>
                            </span>
                            <p>Independencia</p>
                            <p>974 297 933</p>
                        </div>
                    </div>

                    {/* Talleres Multimarca */}
                    <div className="locations-block multimarca-block">
                        <h3 className="block-title">TALLERES MULTIMARCA</h3>
                        <div className="multimarca-grid">
                            <div className="location-item">
                                <span className="icon-marker">
                                    <a href="https://maps.app.goo.gl/PBuE7rvQVFg6oRVR6">
                                        <img src={localitation} alt="ubicacion" />
                                    </a>
                                </span>
                                <p>Independencia.</p>
                                <p>974 297 933</p>
                            </div>
                            <div className="location-item">
                                <span className="icon-marker">
                                    <a href="https://maps.app.goo.gl/qoiNzYzFQQoTxmwT8">
                                        <a href="">
                                            <img src={localitation} alt="ubicacion" />
                                        </a>
                                    </a>
                                </span>
                                <p>San Juan de Lurigancho</p>
                                <p>974 297 933</p>
                            </div>
                            <div className="location-item">
                                <span className="icon-marker">
                                    <a href="https://maps.app.goo.gl/vy2L5q3EobtMtued7">
                                        <a href="">
                                            <img src={localitation} alt="ubicacion" />
                                        </a>
                                    </a>
                                </span>
                                <p>Barranco</p>
                                <p>974 297 933</p>
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
                            <img src={crane} alt="crane-icon" />
                        </div>
                        <p>Servicio de grúa</p>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;