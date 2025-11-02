// Importaciones necesarias para el componente Home
// React es requerido para crear componentes funcionales
import React from 'react';
// Link permite navegar entre rutas sin recargar la página
import { Link } from 'react-router-dom';

// Componente funcional Home que representa la página de inicio
// Utiliza arrow function para definir el componente de manera concisa
const Home = () => {
  return (
    // Contenedor principal con clase CSS para estilos
    <div className="home">
      // Sección hero con título y descripción principal
      <div className="hero-section">
        // Título principal de la aplicación con emoji para atractivo visual
        <h1>🍳 Administrador de torneos de cocina</h1>
        // Descripción que explica las funcionalidades principales
        <p className="hero-description">
          ¡Descubre la excelencia culinaria! Gestiona chefs talentosos, organiza torneos emocionantes,
          y sigue la clasificación en las competiciones culinarias más deliciosas.
        </p>
      </div>
      // Sección de características que muestra las funcionalidades principales
      <div className="features">
        // Tarjeta de característica para gestión de chefs
        <div className="feature-card">
          <h3>👨‍🍳 Administracion de chefs</h3>
          <p>Registre y gestione a chefs profesionales con sus especialidades y experiencia.</p>
        </div>
        // Tarjeta de característica para creación de torneos
        <div className="feature-card">
          <h3>🏆 Creacion de torneos</h3>
          <p>Crea y organiza torneos de cocina con reglas y categorías personalizadas.</p>
        </div>
        // Tarjeta de característica para seguimiento de resultados
        <div className="feature-card">
          <h3>📊 Podio y resultados</h3>
          <p>Realizar un seguimiento de los resultados de las competiciones y manten actualizadas las clasificaciones de todos los torneos.</p>
        </div>
      </div>
      // Sección de enlaces de navegación a las páginas principales
      <div className="links">
        // Enlace a la página de torneos usando Link para navegación SPA
        <Link to="/tournaments" className="cta-button">Ver torneos</Link>
        // Enlace a la página de gestión de chefs
        <Link to="/chefs" className="cta-button">Gestionar chefs</Link>
      </div>
    </div>
  );
};

// Exportación por defecto del componente Home
// Permite que este componente sea importado en App.jsx para el enrutamiento
export default Home;