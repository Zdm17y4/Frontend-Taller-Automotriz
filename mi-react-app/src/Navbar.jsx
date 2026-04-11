function Navbar() {
    return (
        <nav className="navbar">
            <ul className="nav-menu">
                <li className="nav-item">
                    <button>Home</button>
                </li>

                <li className="nav-item">
                    <button>PLANCHADO Y PINTURA</button>
                    <ul className="dropdown">
                        <li><button>PLANCHADO Y PINTURA PAÑOS</button></li>
                        <li><button>TRATAMIENTO DE PINTURA</button></li>
                        <li><button>REPARACION Y PINTURA DE AROS</button></li>
                        <li><button>PINTURA EXPRESS</button></li>
                    </ul>
                </li>

                <li className="nav-item">
                    <button>ELECTROMOVILIDAD</button>
                    <ul className="dropdown">
                        <li><button>VENTA DE VEHICULOS NUEVOS</button></li>
                    </ul>
                </li>

                <li className="nav-item">
                    <button>MECÁNICA</button>
                    <ul className="dropdown">
                        <li><button>INSPECCION Y DIAGNÓSTICO</button></li>
                        <li><button>SERVICIO DE MANTENIMIENTOS</button></li>
                        <li><button>FRENOS</button></li>
                        <li><button>SUSPENSION Y DIRECCIÓN</button></li>
                        <li><button>SISTEMA DE REFRIGERACIÓN</button></li>
                        <li><button>ELECTRICIDAD Y ELECTRÓNICA</button></li>
                        <li><button>AIRE ACONDICIONADO</button></li>
                        <li><button>REPARACIÓN DE MOTORES</button></li>
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
    );
}

export default Navbar;