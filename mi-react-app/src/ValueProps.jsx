import React from "react";
import pintura from './assets/images/pintura.png'
import planchado from './assets/images/planchado.png'
import atencion from './assets/images/atencion.png'
import './ValueProps.css'
const ValueProps = () => {
    return (
        <section className="valueprops-section">
            <div className="valueprops-grid">
                <div className="valueprops-item">
                    <img src={pintura} alt="photos" />
                    <p>Pintura original de fábrica</p>
                </div>
                <div className="valueprops-item">
                    <img src={planchado} alt="photos" />
                    <p>3 años de garantía en planchado y pintura</p>
                </div>
                <div className="valueprops-item">
                    <img src={atencion} alt="photos" />
                    <p>Atención rápida y personalizada</p>
                </div>
            </div>
        </section>
    )
}
export default ValueProps;