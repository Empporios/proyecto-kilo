import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>🍳 Administrador de torneos de cocina</h1>
        <p className="hero-description">
          ¡Descubre la excelencia culinaria! Gestiona chefs talentosos, organiza torneos emocionantes,
          y sigue la clasificación en las competiciones culinarias más deliciosas.
        </p>
      </div>
      <div className="features">
        <div className="feature-card">
          <h3>👨‍🍳 Administracion de chefs</h3>
          <p>Registre y gestione a chefs profesionales con sus especialidades y experiencia.</p>
        </div>
        <div className="feature-card">
          <h3>🏆 Creacion de torneos</h3>
          <p>Crea y organiza torneos de cocina con reglas y categorías personalizadas.</p>
        </div>
        <div className="feature-card">
          <h3>📊 Podio y resultados</h3>
          <p>Realizar un seguimiento de los resultados de las competiciones y manten actualizadas las clasificaciones de todos los torneos.</p>
        </div>
      </div>
      <div className="links">
        <Link to="/tournaments" className="cta-button">Ver torneos</Link>
        <Link to="/chefs" className="cta-button">Gestionar chefs</Link>
      </div>
    </div>
  );
};

export default Home;