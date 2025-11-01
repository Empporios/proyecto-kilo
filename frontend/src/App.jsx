import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TournamentsList from './pages/TournamentsList';
import TournamentDetail from './pages/TournamentDetail';
import ChefManagement from './pages/ChefManagement';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Cooking Tournament Manager</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/tournaments">Tournaments</a>
            <a href="/chefs">Chefs</a>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tournaments" element={<TournamentsList />} />
            <Route path="/tournaments/:id" element={<TournamentDetail />} />
            <Route path="/chefs" element={<ChefManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
