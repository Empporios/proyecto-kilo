// Importaciones necesarias para el funcionamiento de la aplicación
// React es la biblioteca base para crear componentes de interfaz de usuario
import React from 'react';
// BrowserRouter, Routes y Route permiten manejar el enrutamiento en la aplicación
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importamos los componentes de las páginas para renderizarlos en las rutas
import Home from './pages/Home';
import TournamentsList from './pages/TournamentsList';
import TournamentDetail from './pages/TournamentDetail';
import ChefManagement from './pages/ChefManagement';
// Importamos los estilos CSS para la aplicación
import './App.css';

// Componente principal de la aplicación
// Define la estructura general de la interfaz y el enrutamiento
function App() {
  return (
    // Router envuelve toda la aplicación para habilitar el enrutamiento
    <Router>
      // Contenedor principal con clase CSS para estilos
      <div className="App">
        // Encabezado de la aplicación con título y navegación
        <header>
          // Título principal de la aplicación
          <h1>Administrador de torneos de cocina</h1>
          // Navegación con enlaces a las diferentes secciones
          <nav>
            <a href="/">Home</a>
            <a href="/tournaments">Torneos</a>
            <a href="/chefs">Chefs</a>
          </nav>
        </header>
        // Contenido principal donde se renderizan las rutas
        <main>
          // Definición de las rutas de la aplicación
          <Routes>
            // Ruta para la página de inicio
            <Route path="/" element={<Home />} />
            // Ruta para la lista de torneos
            <Route path="/tournaments" element={<TournamentsList />} />
            // Ruta para el detalle de un torneo específico (con parámetro id)
            <Route path="/tournaments/:id" element={<TournamentDetail />} />
            // Ruta para la gestión de chefs
            <Route path="/chefs" element={<ChefManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Exportación del componente para que pueda ser importado en otros archivos
// Esto permite que el componente App sea usado en main.jsx para renderizar la aplicación
export default App;
