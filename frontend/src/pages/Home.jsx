import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>🍳 Cooking Tournament Manager</h1>
        <p className="hero-description">
          Discover culinary excellence! Manage talented chefs, organize exciting tournaments,
          and track rankings in the most delicious cooking competitions.
        </p>
      </div>
      <div className="features">
        <div className="feature-card">
          <h3>👨‍🍳 Chef Management</h3>
          <p>Register and manage professional chefs with their specialties and experience.</p>
        </div>
        <div className="feature-card">
          <h3>🏆 Tournament Creation</h3>
          <p>Create and organize cooking tournaments with custom rules and categories.</p>
        </div>
        <div className="feature-card">
          <h3>📊 Rankings & Results</h3>
          <p>Track competition results and maintain leaderboards for all tournaments.</p>
        </div>
      </div>
      <div className="links">
        <Link to="/tournaments" className="cta-button">View Tournaments</Link>
        <Link to="/chefs" className="cta-button">Manage Chefs</Link>
      </div>
    </div>
  );
};

export default Home;