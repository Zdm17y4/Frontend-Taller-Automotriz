import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../Navbar';
import Footer from '../../Footer';
import Whatsapp from '../../Whatsapp';
import Copyright from '../../Copyright';
import './PlanchadoPinturaPage.css';

import planchadoImg from '../../assets/images/planchado.png';
import pinturaImg from '../../assets/images/pintura.png';
import calidadImg from '../../assets/images/calidad.png';
import reparacionArosImg from '../../assets/images/reparacionAros.png';
import pinturaExpressImg from '../../assets/images/pinturaExpress.png';
const SprayGunIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-icon">
        <path d="M12.5 17.5l-2.5-2.5" />
        <path d="M21 4.5l-6 6" />
        <path d="M10 10l-6 6a2.12 2.12 0 0 0 3 3l6-6" />
        <path d="M18.5 7.5a2.12 2.12 0 1 0-3-3" />
    </svg>
);

const PlanchadoPinturaPage = () => {
    const location = useLocation();

    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const sectionId = pathParts[pathParts.length - 1];

        if (sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }, [location.pathname]);

    return (
        <>
            <Navbar />

            <section className="planchado-pintura-hero" style={{ backgroundImage: `url(${planchadoImg})` }}>
                <div className="hero-overlay">
                    <h1>PLANCHADO Y PINTURA</h1>
                </div>
            </section>

            <div className="breadcrumb-container">
                <div className="breadcrumb">
                    <span className="red-text">Inicio &gt; Planchado y pintura &gt; </span>
                    <span className="gray-text">Servicios</span>
                </div>
            </div>

            <main className="planchado-pintura-container">
                {/* Sección 1: PLANCHADO Y PINTURA PAÑOS */}
                <section id="planchado-y-pintura-por-paños" className="service-section">
                    <div className="service-banner">
                        <SprayGunIcon />
                        <h2>Planchado y Pintura por paños</h2>
                    </div>

                    <div className="service-description">
                        <p>Trabajamos solamente con pintura original de fábrica y contamos con nuestros propios laboratorios de matizado computarizado y horno de pintura en cada uno de nuestros locales de planchado y pintura.</p>
                        <p>También, contamos con la última en tecnología de planchado de partes de aluminio y pintura original de fábrica.</p>
                        <p>En Germania las reparaciones de choques de autos y camionetas las realizamos utilizando la técnica del traccionamiento en frío, que permite mantener las propiedades estructurales de fábrica de tu vehículo.</p>
                    </div>

                    <div className="service-comprende">
                        <h3>NUESTRO SERVICIO DE PLANCHADO Y PINTURA POR PAÑOS COMPRENDE</h3>
                    </div>

                    <div className="service-features">
                        <div className="feature-text">
                            <h4>MEDICION DIGITAL DE LA CARROCERIA</h4>
                            <div className="thick-line"></div>
                            <p>Medición estructural digital para determinar las deformaciones ocasionadas por el choque para devolverle las medidas exactas de fábrica.</p>
                            <ul>
                                <li>Reparación de abolladuras sin necesidad de reemplazo</li>
                                <li>Pintura de alta calidad con garantía</li>
                                <li>Trabajo realizado por especialistas certificados</li>
                            </ul>
                        </div>
                        <div className="feature-image">
                            <img src={pinturaImg} alt="Medicion Digital" />
                        </div>
                    </div>
                </section>

                {/* Sección 2: TRATAMIENTO DE PINTURA */}
                <section id="tratamiento-de-pintura" className="service-section">
                    <div className="service-banner">
                        <SprayGunIcon />
                        <h2>Tratamiento de Pintura</h2>
                    </div>

                    <div className="service-description">
                        <p>Ofrecemos tratamientos avanzados para proteger y mantener la pintura de tu vehículo en perfecto estado. Utilizamos recubrimientos de última generación que garantizan durabilidad y un acabado espectacular.</p>
                        <p>Nuestro proceso de tratamiento elimina imperfecciones y protege contra factores ambientales adversos.</p>
                    </div>

                    <div className="service-comprende">
                        <h3>NUESTRO SERVICIO DE TRATAMIENTO DE PINTURA COMPRENDE</h3>
                    </div>

                    <div className="service-features">
                        <div className="feature-text">
                            <h4>PROTECCIÓN Y BRILLO PROFUNDO</h4>
                            <div className="thick-line"></div>
                            <ul>
                                <li>Cerámica protectora de larga duración</li>
                                <li>Protección contra rayos UV</li>
                                <li>Resistencia a productos químicos y sal</li>
                                <li>Brillo y acabado profesional</li>
                            </ul>
                        </div>
                        <div className="feature-image">
                            <img src={calidadImg} alt="Tratamiento de Pintura" />
                        </div>
                    </div>
                </section>

                {/* Sección 3: REPARACION Y PINTURA DE AROS */}
                <section id="reparacion-y-pintura-de-aros" className="service-section">
                    <div className="service-banner">
                        <SprayGunIcon />
                        <h2>Reparación y Pintura de Aros</h2>
                    </div>

                    <div className="service-description">
                        <p>Contamos con equipos de última generación para reparar y pintar aros de cualquier tamaño y material. Nos aseguramos de devolver el aspecto original o de personalizarlos a tu gusto.</p>
                    </div>

                    <div className="service-comprende">
                        <h3>NUESTRO SERVICIO DE REPARACIÓN DE AROS COMPRENDE</h3>
                    </div>

                    <div className="service-features">
                        <div className="feature-text">
                            <h4>RESTAURACIÓN INTEGRAL DE AROS</h4>
                            <div className="thick-line"></div>
                            <ul>
                                <li>Reparación de daños por impactos</li>
                                <li>Pintura personalizada en colores a elección</li>
                                <li>Acabado brillante o mate</li>
                                <li>Garantía de calidad en el trabajo</li>
                            </ul>
                        </div>
                        <div className="feature-image">
                            <img src={reparacionArosImg} alt="Reparación de Aros" />
                        </div>
                    </div>
                </section>

                {/* Sección 4: PINTURA EXPRESS */}
                <section id="pintura-express" className="service-section">
                    <div className="service-banner">
                        <SprayGunIcon />
                        <h2>Pintura Express</h2>
                    </div>

                    <div className="service-description">
                        <p>Cuando necesitas que tu vehículo esté listo en el menor tiempo posible, nuestro servicio Express es la solución ideal para esos pequeños detalles que marcan la diferencia.</p>
                    </div>

                    <div className="service-comprende">
                        <h3>NUESTRO SERVICIO DE PINTURA EXPRESS COMPRENDE</h3>
                    </div>

                    <div className="service-features">
                        <div className="feature-text">
                            <h4>ACABADOS RÁPIDOS Y PRECISOS</h4>
                            <div className="thick-line"></div>
                            <ul>
                                <li>Servicio rápido sin sacrificar calidad</li>
                                <li>Disponible para reparaciones menores</li>
                                <li>Entrega el mismo día en casos especiales</li>
                                <li>Precios competitivos</li>
                            </ul>
                        </div>
                        <div className="feature-image">
                            <img src={pinturaExpressImg} alt="Pintura Express" />
                        </div>
                    </div>
                </section>
            </main>

            <Whatsapp />
            <Footer />
            <Copyright />
        </>
    );
};

export default PlanchadoPinturaPage;
