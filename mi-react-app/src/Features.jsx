import React from 'react';
import './Features.css';
const Features = () => {
    return (
        <section className='features-section'>
            <h2>EL MEJOR TALLER DE LIMA CON LOS MEJORES PRECIOS</h2>
            <div className="features-grid">
                <div className="feature-item">
                    <img src='https://www.germania.com.pe/app/views/front_end/tnw_front_1/imgs/icons/trofeo.png' alt="Trofeo" />
                    <p><b>55</b> Años de experiencia en reparación de autos</p>
                </div>
                <div className="feature-item">
                    <img src='https://www.germania.com.pe/app/views/front_end/tnw_front_1/imgs/icons/trofeo.png' alt="Trofeo" />
                    <p><b>4</b> Locales ubicados en Lima</p>
                </div>
                <div className="feature-item">
                    <img src='https://www.germania.com.pe/app/views/front_end/tnw_front_1/imgs/icons/trofeo.png' alt="Trofeo" />
                    <p>Trabajamos con todas las compañías de seguros</p>
                </div>
                <div className="feature-item">
                    <img src='https://www.germania.com.pe/app/views/front_end/tnw_front_1/imgs/icons/trofeo.png' alt="Trofeo" />
                    <p>Más de <b>70</b> trabajadores altamente capacitados</p>
                </div>
            </div>
        </section>
    )
}
export default Features;