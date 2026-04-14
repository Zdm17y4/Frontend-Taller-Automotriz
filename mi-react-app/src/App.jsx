import Carousel from "./Carousel";
import Navbar from "./Navbar";
import Features from "./Features";
import Recognitions from "./Recognitions";
import ValueProps from "./ValueProps";

function App() {
  const carouselItems = [
    <div style={{ background: '#ff6b6b', padding: '100px' }}>
      <h2>Servicio de Planchado y Pintura</h2>
      <p>Calidad profesional</p>
    </div>,
    <div style={{ background: '#4ecdc4', padding: '100px' }}>
      <h2>Electromovilidad</h2>
      <p>Vehículos del futuro</p>
    </div>,
    <div style={{ background: '#45b7d1', padding: '100px' }}>
      <h2>Mecánica Especializada</h2>
      <p>Diagnóstico preciso</p>
    </div>,
  ];
  return (
    <div>
      <Navbar />
      <Carousel
        items={carouselItems} />
      <Features />
      <Recognitions />
      <ValueProps />
    </div>
  );
}

export default App;