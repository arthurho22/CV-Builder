import Home from './pages/Home';

function App() {
<<<<<<< HEAD
  return <Home />;
}

export default App;
=======
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar-curriculo" element={<CriarCurriculo />} />
        <Route path="/editar-curriculo/:id" element={<CriarCurriculo />} />
        <Route path="/visualizar-curriculos" element={<VisualizarCurriculos />} />
        <Route path="/curriculo/:id" element={<VerCurriculo />} />
      </Routes>
  );
}

export default App 
>>>>>>> 8d645a8b6c3c88bef368e672f79b1a12ffdd16fd
