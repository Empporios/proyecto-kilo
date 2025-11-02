import React from 'react';
// Importante: Trae las herramientas para manejar las rutas (URLs) de la librería react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa los componentes que vamos a usar como "páginas"
import Home from './pages/Home';
import TournamentsList from './pages/TournamentsList';
import TournamentDetail from './pages/TournamentDetail';
import ChefManagement from './pages/ChefManagement';
import './App.css';

function App() {
  return (
    // <Router> envuelve toda la aplicación para que el ruteo funcione
    <Router>
      <div className="App">
        <header>
          <h1>Administrador de torneos de cocina</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/tournaments">Torneos</a>
            <a href="/chefs">Chefs</a>
          </nav>
        </header>
        <main>
          {/* <Routes> es el área donde el contenido va a cambiar según la URL */}
          <Routes>
            {/* Cada <Route> es una regla: "si la URL es esta, muestra este componente" */}
            <Route path="/" element={<Home />} />
            <Route path="/tournaments" element={<TournamentsList />} />
            
            {/* Esta es clave: :id es una variable (parámetro) */}
            {/* Sirve para /tournaments/1, /tournaments/2, etc. y siempre muestra TournamentDetail */}
            <Route path="/tournaments/:id" element={<TournamentDetail />} />
            
            <Route path="/chefs" element={<ChefManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;