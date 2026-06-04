import React from 'react';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import Whatsapp from '../../components/public/Whatsapp';
import Copyright from '../../components/public/Copyright';
import './ElectromovilidadPage.css';

import heroImg from '../../assets/images/lamboUrus.png'; 
import carFrontImg from '../../assets/images/lamboUrus.png';
import chargeImg from '../../assets/images/mantenimiento.png';
import sideImg from '../../assets/images/calidad.png';
import seatsImg from '../../assets/images/atencion.png';
import dashImg from '../../assets/images/inspeccion.png';

const ElectromovilidadPage = () => {
    return (
        <>
            <Navbar />
            
            <section className="electro-hero" style={{ backgroundImage: `url(${heroImg})` }}>
                <div className="hero-overlay">
                    <h1>ELECTROMOVILIDAD</h1>
                </div>
            </section>

            <div className="breadcrumb-container">
                <div className="breadcrumb">
                    <span className="red-text">Inicio &gt; </span>
                    <span className="gray-text">Electromovilidad</span>
                </div>
            </div>

            <main className="electro-container">
                <p className="electro-subtitle">
                    La electromovilidad la tenemos a tu disposición con la calidad de siempre. Somos un taller pionero dando un paso al mundo sostenible.
                </p>

                <section className="vehicle-section">
                    <div className="vehicle-info">
                        <h2>ER7-SUV</h2>
                        <div className="thick-line"></div>
                        <ul className="vehicle-specs">
                            <li>Capacidad para 8 ocupantes</li>
                            <li>Máxima autonomía aproximada 400 km</li>
                            <li>Carga rápida máximo en 1 hora</li>
                            <li>Carga lenta máximo en 10 horas</li>
                            <li>Velocidad máxima de 100 km/h.</li>
                            <li>ABS, EBD, 2 bolsas de aire, monitoreo de presión de llantas</li>
                            <li>Aire acondicionado, lunas eléctricas, pantalla multimedia 8", cierre centralizado</li>
                            <li>Garantía de 36 meses o 60.000 km</li>
                            <li>Precio : US$31,990.00</li>
                        </ul>
                    </div>
                    
                    <div className="vehicle-main-image">
                        <img src={carFrontImg} alt="ER7-SUV Front" />
                    </div>
                </section>

                <section className="vehicle-gallery">
                    <img src={chargeImg} alt="Carga" className="gallery-img" />
                    <img src={sideImg} alt="Lateral" className="gallery-img" />
                    <img src={seatsImg} alt="Asientos" className="gallery-img" />
                    <img src={dashImg} alt="Tablero" className="gallery-img" />
                </section>
            </main>

            <Whatsapp />
            <Footer />
            <Copyright />
        </>
    );
};

export default ElectromovilidadPage;