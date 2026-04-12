import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DirectorioApps from './pages/DirectorioApps';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/directorio-apps" element={<DirectorioApps />} />
        <Route path="/eventos" element={<Home />} />
        <Route path="/contenido" element={<Home />} />
        <Route path="/comunidades" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
