import React from "react";
import wspLogo from './assets/logos/whatsapp.png'
import './Whatsapp.css';

const Whatsapp = () => {
    return(
        <a href="https://chat.whatsapp.com/BrIcfPNRZZ02FiWpcaUZWY" target="_blank" id="btn-whatsapp-consulta">
            <img src={wspLogo} alt="wsp-logo" />
            <div className="whatsapp-text">
                <b>WHATSAPP</b>
                <span>974 297 933</span>
            </div>
        </a>
    )
}
export default Whatsapp;