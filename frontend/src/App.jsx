import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CriarCurriculo from './pages/CriarCurriculo';
import VisualizarCurriculos from './pages/VisualizarCurriculos';
import VerCurriculo from './pages/VerCurriculo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar-curriculo" element={<CriarCurriculo />} />
        <Route path="/editar-curriculo/:id" element={<CriarCurriculo />} />
        <Route path="/visualizar-curriculos" element={<VisualizarCurriculos />} />
        <Route path="/curriculo/:id" element={<VerCurriculo />} />
      </Routes>
    </BrowserRouter>
  );
}