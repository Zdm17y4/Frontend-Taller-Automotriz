import React from "react";
import logoTaller from './assets/logos/logoTaller.png';
import logoTallerPremium from './assets/logos/logoTallerPremium.png';

import './Quality.css'

const Quality = () => {
    return (
        <section className="quality-section">
            <div className="quality-grid">
                <div className="quality-premium">
                    <img src={logoTallerPremium} alt="logo-premium" />
                    <h2>AUTOS Y CAMIONETAS DE ALTA GAMA</h2>
                    <div className="list-container">
                        <ul>
                            <li>✔ BMW</li>
                            <li>✔ Mercedes-Benz</li>
                            <li>✔ Audi</li>
                            <li>✔ Porsche</li>
                        </ul>
                    </div>
                </div>

                <div className="quality-normal">
                    <img src={logoTaller} alt="logo-normal" />
                    <h2>AUTOS Y CAMIONETAS MULTIMARCA</h2>
                    <div className="quality-normal-grid">
                        <div className="list-column">
                            <ul>
                                <li>✔ Kia</li>
                                <li>✔ Hyundai</li>
                                <li>✔ Mazda</li>
                                <li>✔ Volkswagen</li>
                                <li>✔ Toyota</li>
                                <li>✔ Nissan</li>
                                <li>✔ Mitsubishi</li>
                                <li>✔ Mini</li>
                                <li>✔ Seat</li>
                            </ul>
                        </div>
                        <div className="list-column">
                            <ul>
                                <li>✔ Suzuki</li>
                                <li>✔ Chevrolet</li>
                                <li>✔ Honda</li>
                                <li>✔ Ford</li>
                                <li>✔ Jeep</li>
                                <li>✔ Dodge</li>
                                <li>✔ Renault</li>
                                <li>✔ Peugeot</li>
                                <li>✔ Citröen</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Quality;