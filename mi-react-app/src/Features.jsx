import React from 'react';
import feature1 from './assets/icon/feature-1.png'
import feature2 from './assets/icon/feature-2.png'
import feature3 from './assets/icon/feature-3.png'
import feature4 from './assets/icon/feature-4.png'
import './Features.css';
const Features = () => {
    return (
        <section className='features-section'>
            <h2>EL MEJOR TALLER DE LIMA CON LOS MEJORES PRECIOS</h2>
            <div className="features-grid">
                <div className="feature-item">
                    <img src={feature1} alt="Trofeo" />
                    <p><b>55</b> Años de experiencia en reparación de autos</p>
                </div>
                <div className="feature-item">
                    <img src={feature2} alt="Trofeo" />
                    <p><b>4</b> Locales ubicados en Lima</p>
                </div>
                <div className="feature-item">
                    <img src={feature3} alt="Trofeo" />
                    <p>Trabajamos con todas las compañías de seguros</p>
                </div>
                <div className="feature-item">
                    <img src={feature4} alt="Trofeo" />
                    <p>Más de <b>70</b> trabajadores altamente capacitados</p>
                </div>
            </div>
        </section>
    )
}
export default Features;