import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h2>Welcome to Cooking Tournament Manager</h2>
      <p>Manage chefs, create tournaments, and track rankings in cooking competitions.</p>
      <div className="links">
        <Link to="/tournaments">View Tournaments</Link>
        <Link to="/chefs">Manage Chefs</Link>
      </div>
    </div>
  );
};

export default Home;