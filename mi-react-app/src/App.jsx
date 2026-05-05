import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';
import ServicePage from './pages/public/ServicePage';
import PlanchadoPinturaPage from './pages/public/PlanchadoPinturaPage';
import MecanicaPage from './pages/public/MecanicaPage';
import ElectromovilidadPage from './pages/public/ElectromovilidadPage';
import LoginPage from './pages/public/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Rutas de Planchado y Pintura */}
        <Route path="/servicio/planchado-y-pintura" element={<PlanchadoPinturaPage />} />
        <Route path="/servicio/planchado-y-pintura-por-paños" element={<PlanchadoPinturaPage />} />
        <Route path="/servicio/tratamiento-de-pintura" element={<PlanchadoPinturaPage />} />
        <Route path="/servicio/reparacion-y-pintura-de-aros" element={<PlanchadoPinturaPage />} />
        <Route path="/servicio/pintura-express" element={<PlanchadoPinturaPage />} />

        {/* Ruta principal de Electromovilidad */}
        <Route path="/servicio/electromovilidad" element={<ElectromovilidadPage />} />
        <Route path="/servicio/ventas-de-vehiculos-nuevos" element={<ElectromovilidadPage />} />

        {/* Ruta principal de Mecánica */}
        <Route path="/servicio/mecanica" element={<MecanicaPage />} />

        {/* Ruta de Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas explícitas para sub-servicios de Mecánica */}
        <Route path="/servicio/inspeccion-y-diagnostico" element={<ServicePage id="inspeccion" />} />
        <Route path="/servicio/servicio-de-mantenimientos" element={<ServicePage id="mantenimiento" />} />
        <Route path="/servicio/frenos" element={<ServicePage id="frenos" />} />
        <Route path="/servicio/suspension-y-direccion" element={<ServicePage id="suspension" />} />
        <Route path="/servicio/sistema-de-refrigeracion" element={<ServicePage id="refrigeracion" />} />
        <Route path="/servicio/electricidad-y-electronica" element={<ServicePage id="electricidad" />} />
        <Route path="/servicio/aire-acondicionado" element={<ServicePage id="aire-acondicionado" />} />
        <Route path="/servicio/reparacion-de-motores" element={<ServicePage id="reparacion-motores" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;