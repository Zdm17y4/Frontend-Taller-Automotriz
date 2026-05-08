import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/public/Navbar';
import Footer from '../../components/public/Footer';
import Whatsapp from '../../components/public/Whatsapp';
import Copyright from '../../components/public/Copyright';
import './MecanicaPage.css';

import inspeccionImg from '../../assets/images/inspeccion.png';
import aireImg from '../../assets/images/aireAcondicionado.png';
import mecanicoImg from '../../assets/images/mecanico.png';
import mantenimientoImg from '../../assets/images/mantenimiento.png';
import frenosImg from '../../assets/images/frenos.png';
import suspensionImg from '../../assets/images/suspension.png';
import electricidadImg from '../../assets/images/electricidad.png';
import refrigeracionImg from '../../assets/images/refrigeracion.png';

const Icons = {
    inspeccion: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>,
    mantenimiento: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>,
    frenos: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><path d="M12 2v4" /></svg>,
    suspension: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M8 6h8M8 18h8M9 6v3l6 3v3l-6 3" /></svg>,
    refrigeracion: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" /></svg>,
    electricidad: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M6 10h-2M20 10h-2M6 14h-2M20 14h-2M10 6v-2M14 6v-2M10 20v-2M14 20v-2" /></svg>,
    aire: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" /></svg>,
    motor: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
};

const MecanicaPage = () => {
    const navigate = useNavigate();

    const services = [
        { id: 'inspeccion-y-diagnostico', title: 'Inspección y diagnóstico', img: inspeccionImg, icon: Icons.inspeccion },
        { id: 'servicio-de-mantenimientos', title: 'Servicio de mantenimiento', img: mantenimientoImg, icon: Icons.mantenimiento },
        { id: 'frenos', title: 'Frenos', img: frenosImg, icon: Icons.frenos },
        { id: 'suspension-y-direccion', title: 'Suspensión y dirección', img: suspensionImg, icon: Icons.suspension },
        { id: 'sistema-de-refrigeracion', title: 'Sistema de refrigeración', img: refrigeracionImg, icon: Icons.refrigeracion },
        { id: 'electricidad-y-electronica', title: 'Electricidad y electrónica', img: electricidadImg, icon: Icons.electricidad },
        { id: 'aire-acondicionado', title: 'Aire acondicionado', img: aireImg, icon: Icons.aire },
        { id: 'reparacion-de-motores', title: 'Reparación de motores', img: mecanicoImg, icon: Icons.motor }
    ];

    return (
        <>
            <Navbar />
            <section className="mecanica-hero" style={{ backgroundImage: `url(${mecanicoImg})` }}>
                <div className="hero-overlay">
                    <h1>MANTENIMIENTO Y MECÁNICA</h1>
                </div>
            </section>

            <div className="breadcrumb-container">
                <div className="breadcrumb">
                    <span className="red-text">Inicio &gt; </span>
                    <span className="gray-text">Mecánica</span>
                </div>
            </div>

            <main className="mecanica-container">
                <p className="mecanica-subtitle">Mecánica especializada en BMW, Mercedes-Benz, Porsche, Audi y más.</p>

                <div className="mecanica-grid">
                    {services.map((svc) => (
                        <div key={svc.id} className="mecanica-card" onClick={() => navigate(`/servicio/${svc.id}`)}>
                            <div className="card-image">
                                <img src={svc.img} alt={svc.title} />
                            </div>
                            <div className="card-content">
                                <div className="card-icon">
                                    <svc.icon />
                                </div>
                                <span>{svc.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Whatsapp />
            <Footer />
            <Copyright />
        </>
    );
};

export default MecanicaPage;
