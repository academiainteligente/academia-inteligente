import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Eventos from './pages/Eventos';
import DirectorioApps from './pages/DirectorioApps';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/directorio-apps" element={<DirectorioApps />} />
      </Routes>
    </Router>
  );
}

export default App;
