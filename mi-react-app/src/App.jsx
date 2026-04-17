import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Futuras rutas irán aquí */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;