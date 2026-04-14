import React from 'react';
import './Recognitions.css'
const Recognitions = () => {
    return (
        <section className='recognitions-section'>
            <h3>RECONOCIDOS POR</h3>
            <div className='recognitions-grid'>
                <div className='recognitions-item'>
                    <img src="https://logo-teka.com/wp-content/uploads/2025/06/porsche-crest-logo.png" alt="Logo" />
                    <p>"MEJOR SOCIO ESTRATÉGICO" DE INCHCAPE</p>
                </div>
                <div className='recognitions-item'>
                    <img src="https://logo-teka.com/wp-content/uploads/2025/06/porsche-crest-logo.png" alt="Logo" />
                    <p>INCORPORADO AL PROGRAMA "THE BEST ALLIANCE".</p>
                </div>
                <div className='recognitions-item'>
                    <img src="https://logo-teka.com/wp-content/uploads/2025/06/porsche-crest-logo.png" alt="Logo" />
                    <p>"EMPRESA PERUANA DEL AÑO" POR 4 AÑOS CONSECUTIVOS.</p>
                </div>

            </div>
        </section>
    )
}
export default Recognitions;