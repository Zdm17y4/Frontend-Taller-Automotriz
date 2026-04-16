import React from 'react';
import porscheLogo from './assets/logos/porsche.png'
import mercedesbenzLogo from './assets/logos/mercedesbenz.png'
import bmwLogo from './assets/logos/bmw.png'
import './Recognitions.css'

const Recognitions = () => {
    return (
        <section className='recognitions-section'>
            <h3>RECONOCIDOS POR</h3>
            <div className='recognitions-grid'>
                <div className='recognitions-item'>
                    <img src={porscheLogo} alt="Logo" />
                    <p>"MEJOR SOCIO ESTRATÉGICO" DE INCHCAPE</p>
                </div>
                <div className='recognitions-item'>
                    <img src={mercedesbenzLogo} alt="Logo" />
                    <p>INCORPORADO AL PROGRAMA "THE BEST ALLIANCE".</p>
                </div>
                <div className='recognitions-item'>
                    <img src={bmwLogo} alt="Logo" />
                    <p>"EMPRESA PERUANA DEL AÑO" POR 4 AÑOS CONSECUTIVOS.</p>
                </div>

            </div>
        </section>
    )
}
export default Recognitions;