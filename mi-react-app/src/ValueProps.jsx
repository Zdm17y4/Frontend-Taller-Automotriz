import React from "react";
import './ValueProps.css'
const ValueProps = () => {
    return (
        <section className="valueprops-section">
            <div className="valueprops-grid">
                <div className="valueprops-item">
                    <img src="https://www.germania.com.pe/app/views/front_end/tnw_front_1/imgs/horno.jpg" alt="photos" />
                    <p>Pintura original de fábrica</p>
                </div>
                <div className="valueprops-item">
                    <img src="https://www.germania.com.pe/app/views/front_end/tnw_front_1/imgs/horno.jpg" alt="photos" />
                    <p>3 años de garantía en planchado y pintura</p>
                </div>
                <div className="valueprops-item">
                    <img src="https://www.germania.com.pe/app/views/front_end/tnw_front_1/imgs/horno.jpg" alt="photos" />
                    <p>Atención rápida y personalizada</p>
                </div>
            </div>
        </section>
    )
}
export default ValueProps;