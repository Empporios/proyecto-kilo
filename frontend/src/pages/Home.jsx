// Importamos React para poder usar JSX (el HTML de React) y crear componentes.
import React from 'react';
// Importamos 'Link' de la librería de rutas. Esto es lo que hace que podamos
// hacer clic en los enlaces y cambiar de página sin que se recargue el navegador.
import { Link } from 'react-router-dom';

// Aquí creamos el componente "Home", que es básicamente nuestra página de inicio.
const Home = () => {
  return (
    // Este 'div' con className "home" es el contenedor principal de toda la página.
    // Usamos 'className' en lugar de 'class' como en HTML.
    <div className="home">
      {/* Esta es la sección principal de bienvenida, el "hero". */}
      <div className="hero-section">
        {/* El título principal que se ve en la página. */}
        <h1>🍳 Administrador de torneos de cocina</h1>
        {/* Un párrafo de descripción para explicar de qué va la app. */}
        <p className="hero-description">
          ¡Descubre la excelencia culinaria! Gestiona chefs talentosos, organiza torneos emocionantes,
          y sigue la clasificación en las competiciones culinarias más deliciosas.
        </p>
      </div>

      {/* Este 'div' va a contener las tres tarjetas con las "features" o características. */}
      <div className="features">
        {/* Primera tarjeta: Gestión de Chefs */}
        <div className="feature-card">
          <h3>👨‍🍳 Administracion de chefs</h3>
          <p>Registre y gestione a chefs profesionales con sus especialidades y experiencia.</p>
        </div>
        {/* Segunda tarjeta: Creación de Torneos */}
        <div className="feature-card">
          <h3>🏆 Creacion de torneos</h3>
        <p>Crea y organiza torneos de cocina con reglas y categorías personalizadas.</p>
      </div>
        {/* Tercera tarjeta: Podio y Resultados */}
        <div className="feature-card">
          <h3>📊 Podio y resultados</h3>
          <p>Realizar un seguimiento de los resultados de las competiciones y manten actualizadas las clasificaciones de todos los torneos.</p>
        </div>
      </div>

      {/* Este 'div' es para los botones de navegación de abajo. */}
      <div className="links">
        {/* Este es el componente 'Link' que importamos.
            Le decimos que cuando le hagan clic, nos lleve a la ruta "/tournaments". */}
        <Link to="/tournaments" className="cta-button">Ver torneos</Link>
        {/* Este 'Link' nos lleva a la ruta "/chefs". */}
        <Link to="/chefs" className="cta-button">Gestionar chefs</Link>
      </div>
    </div>
  );
};

// Exportamos el componente 'Home' para que App.jsx pueda encontrarlo y usarlo.
export default Home;