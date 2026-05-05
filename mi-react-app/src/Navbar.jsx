import React from "react";
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import homeIcon from './assets/icon/home.png';
import logoTaller from './assets/logos/logoTaller.png';

const Navbar = () => {
    const navigate = useNavigate();

    const handleNavigate = (path, event) => {
        const dropdown = event.currentTarget.closest('.dropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
            setTimeout(() => {
                dropdown.style.display = '';
            }, 300);
        }

        navigate(path);

        if (document.activeElement) {
            document.activeElement.blur();
        }
    };

    return (
        <section className="nav-section">
            <nav className="navbar">
                <button onClick={() => navigate('/')} className="nav-logo-btn">
                    <img src={logoTaller} alt="logo-taller" className="nav-logo-taller" />
                </button>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <button onClick={() => navigate('/')}><img src={homeIcon} alt="home" /></button>
                    </li>

                    <li className="nav-item">
                        <button onClick={(e) => handleNavigate('/servicio/planchado-y-pintura', e)}>PLANCHADO Y PINTURA</button>
                        <ul className="dropdown">
                            <li><button onClick={(e) => handleNavigate('/servicio/planchado-y-pintura-por-paños', e)}>PLANCHADO Y PINTURA PAÑOS</button></li>
                            <li><button onClick={(e) => handleNavigate('/servicio/tratamiento-de-pintura', e)}>TRATAMIENTO DE PINTURA</button></li>
                            <li><button onClick={(e) => handleNavigate('/servicio/reparacion-y-pintura-de-aros', e)}>REPARACION Y PINTURA DE AROS</button></li>
                            <li><button onClick={(e) => handleNavigate('/servicio/pintura-express', e)}>PINTURA EXPRESS</button></li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <button onClick={(e) => handleNavigate('/servicio/electromovilidad', e)}>ELECTROMOVILIDAD</button>
                        <ul className="dropdown">
                            <li><button onClick={() => navigate('/servicio/ventas-de-vehiculos-nuevos')}>VENTA DE VEHICULOS NUEVOS</button></li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <button onClick={(e) => handleNavigate('/servicio/mecanica', e)}>MECÁNICA</button>
                        <ul className="dropdown">
                            <li><button onClick={(e) => handleNavigate('/servicio/inspeccion-y-diagnostico', e)}>INSPECCION Y DIAGNÓSTICO</button></li>
                            <li><button onClick={(e) => handleNavigate('/servicio/servicio-de-mantenimientos', e)}>SERVICIO DE MANTENIMIENTOS</button></li>
                            <li><button onClick={(e) => handleNavigate('/servicio/frenos', e)}>FRENOS</button></li>
                            <li><button onClick={(e) => handleNavigate('/servicio/suspension-y-direccion', e)}>SUSPENSION Y DIRECCIÓN</button></li>
                            <li><button onClick={(e) => handleNavigate('/servicio/sistema-de-refrigeracion', e)}>SISTEMA DE REFRIGERACIÓN</button></li>
                            <li><button onClick={(e) => handleNavigate('/servicio/electricidad-y-electronica', e)}>ELECTRICIDAD Y ELECTRÓNICA</button></li>
                            <li><button onClick={(e) => handleNavigate('/servicio/aire-acondicionado', e)}>AIRE ACONDICIONADO</button></li>
                            <li><button onClick={(e) => handleNavigate('/servicio/reparacion-de-motores', e)}>REPARACIÓN DE MOTORES</button></li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <button>LOCALES</button>
                        <ul className="dropdown">
                            <li><button>LOCALES PREMIUM</button></li>
                            <li><button>SURQUILLO</button></li>
                            <li><button>LOCALES MULTIMARCA</button></li>
                            <li><button>SURQUILLO</button></li>
                            <li><button>SAN LUIS</button></li>
                            <li><button>LA MOLINA</button></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </section>
    );
}

export default Navbar;