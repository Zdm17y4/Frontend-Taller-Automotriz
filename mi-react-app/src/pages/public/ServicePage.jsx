import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import Whatsapp from '../../components/public/Whatsapp';
import Copyright from '../../components/public/Copyright';
import './ServicePage.css';

import inspeccionImg from '../../assets/images/inspeccion.png';
import aireImg from '../../assets/images/aireAcondicionado.png';
import mecanicoImg from '../../assets/images/mecanico.png';
import calidadImg from '../../assets/images/calidad.png';
import mantenimientoImg from '../../assets/images/mantenimiento.png';
import frenosImg from '../../assets/images/frenos.png';
import suspensionImg from '../../assets/images/suspension.png';
import electricidadImg from '../../assets/images/electricidad.png';
import refrigeracionImg from '../../assets/images/refrigeracion.png';

const ServicePage = ({ id }) => {
    const navigate = useNavigate();

    const servicios = {

        'inspeccion': {
            titulo: 'Inspección y Diagnóstico',
            descripcion: 'Diagnóstico completo del estado técnico de tu vehículo.',
            breadcrumb: ['Inicio', 'Mecánica', 'Inspección y Diagnóstico'],
            images: [inspeccionImg],
            contenido: 'Realizamos inspecciones exhaustivas utilizando equipos de diagnóstico de última tecnología.',
            beneficios: [
                'Escaneo de sistemas electrónicos',
                'Inspección visual completa',
                'Reporte detallado del estado del vehículo',
                'Asesoría personalizada'
            ]
        },
        'mantenimiento': {
            titulo: 'Servicio de Mantenimientos',
            descripcion: 'Mantenimiento preventivo para asegurar el óptimo funcionamiento de tu vehículo.',
            breadcrumb: ['Inicio', 'Mecánica', 'Mantenimientos'],
            images: [mantenimientoImg],
            contenido: 'Ofrecemos planes de mantenimiento diseñados para prolongar la vida útil de tu vehículo.',
            beneficios: [
                'Cambio de aceite y filtros',
                'Revisión de fluidos',
                'Inspección de componentes clave',
                'Planes de mantenimiento periódico'
            ]
        },
        'frenos': {
            titulo: 'Servicio de Frenos',
            descripcion: 'Especialistas en reparación y mantenimiento del sistema de frenos.',
            breadcrumb: ['Inicio', 'Mecánica', 'Frenos'],
            images: [frenosImg],
            contenido: 'Garantizamos la seguridad de tu vehículo con servicio de frenos profesional.',
            beneficios: [
                'Cambio de pastillas y discos',
                'Sangrado de sistema hidráulico',
                'Inspección de cilindros y mangueras',
                'Pruebas de eficiencia'
            ]
        },
        'suspension': {
            titulo: 'Suspensión y Dirección',
            descripcion: 'Reparación integral del sistema de suspensión y dirección.',
            breadcrumb: ['Inicio', 'Mecánica', 'Suspensión y Dirección'],
            images: [suspensionImg],
            contenido: 'Contamos con especialistas certificados en sistemas de suspensión y dirección.',
            beneficios: [
                'Reparación de amortiguadores',
                'Alineación de ruedas',
                'Reparación de rótulas y terminales',
                'Pruebas de funcionamiento'
            ]
        },
        'refrigeracion': {
            titulo: 'Sistema de Refrigeración',
            descripcion: 'Mantenimiento y reparación del sistema de enfriamiento.',
            breadcrumb: ['Inicio', 'Mecánica', 'Refrigeración'],
            images: [refrigeracionImg],
            contenido: 'Evita recalentamientos con nuestro servicio especializado de refrigeración.',
            beneficios: [
                'Limpieza del radiador',
                'Cambio de refrigerante',
                'Reparación de termostatos',
                'Inspección de bomba de agua'
            ]
        },
        'electricidad': {
            titulo: 'Electricidad y Electrónica',
            descripcion: 'Diagnóstico y reparación de sistemas eléctricos y electrónicos.',
            breadcrumb: ['Inicio', 'Mecánica', 'Electricidad y Electrónica'],
            images: [electricidadImg],
            contenido: 'Nuestros técnicos resuelven problemas eléctricos complejos con equipos modernos.',
            beneficios: [
                'Diagnóstico de baterías',
                'Reparación de alternadores',
                'Solución de problemas eléctricos',
                'Instalaciones personalizadas'
            ]
        },
        'aire-acondicionado': {
            titulo: 'Aire Acondicionado',
            descripcion: 'Servicio completo de aire acondicionado para tu comodidad.',
            breadcrumb: ['Inicio', 'Mecánica', 'Aire Acondicionado'],
            images: [aireImg],
            contenido: 'Mantén tu vehículo fresco con nuestro servicio especializado de A/C.',
            beneficios: [
                'Carga de refrigerante',
                'Limpieza de filtros',
                'Reparación de compresores',
                'Diagnóstico de problemas de enfriamiento'
            ]
        },
        'reparacion-motores': {
            titulo: 'Reparación de Motores',
            descripcion: 'Servicio especializado de reparación de motores.',
            breadcrumb: ['Inicio', 'Mecánica', 'Reparación de Motores'],
            images: [mecanicoImg],
            contenido: 'Contamos con talleres equipados y técnicos expertos para reparación de motores.',
            beneficios: [
                'Diagnostico completo del motor',
                'Reparación de cilindros',
                'Cambio de juntas y sellos',
                'Pruebas de rendimiento'
            ]
        },

    };

    const serviceData = servicios[id] || {
        titulo: 'Servicio no encontrado',
        descripcion: 'Lo sentimos, no encontramos el servicio solicitado.',
        breadcrumb: ['Inicio'],
        images: [calidadImg],
        contenido: 'Por favor, selecciona un servicio válido del menú.',
        beneficios: []
    };

    // Manejar navegación en breadcrumb
    const handleBreadcrumbClick = (index) => {
        if (index === 0) {
            navigate('/');
        }
    };

    return (
        <>
            <Navbar />
            <section className="service-hero" style={{ backgroundImage: `url(${serviceData.images[0]})` }}>
                <div className="hero-overlay">
                    <h1>{serviceData.titulo}</h1>
                </div>
            </section>

            <div className="breadcrumb-container">
                <nav className="breadcrumb">
                    {serviceData.breadcrumb.map((item, index) => (
                        <span key={index}>
                            <span
                                className={`breadcrumb-item ${index === 0 ? 'active' : ''}`}
                                onClick={() => handleBreadcrumbClick(index)}
                            >
                                {item}
                            </span>
                            {index < serviceData.breadcrumb.length - 1 && <span className="breadcrumb-separator"> &gt; </span>}
                        </span>
                    ))}
                </nav>
            </div>

            <main className="service-page">
                <div className="service-top-text">
                    <p>{serviceData.contenido}</p>
                </div>

                <div className="service-details-section">
                    <div className="service-benefits">
                        <h2>EN NUESTRO SERVICIO DE {serviceData.titulo.toUpperCase()} REALIZAMOS</h2>
                        <ul className="benefits-list">
                            {serviceData.beneficios.map((beneficio, index) => (
                                <li key={index}>• {beneficio}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="single-image">
                        <img src={serviceData.images[0]} alt={serviceData.titulo} />
                    </div>
                </div>
            </main>

            <Whatsapp />
            <Footer />
            <Copyright />
        </>
    );
};

export default ServicePage;
