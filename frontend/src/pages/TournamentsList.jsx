import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTournaments, createTournament } from '../services/api';

const TournamentsList = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', location: '', maxChefs: '' });

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await getTournaments();
      setTournaments(response.data);
    } catch (err) {
      setError('Failed to load tournaments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTournament({
        name: formData.name,
        location: formData.location,
        maxChefs: parseInt(formData.maxChefs)
      });
      setFormData({ name: '', location: '', maxChefs: '' });
      setShowForm(false);
      fetchTournaments();
    } catch (err) {
      setError('Failed to create tournament');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="tournaments-list">
      <h2>Torneos</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Create Tournament'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Lugar"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="limite de Chefs"
            value={formData.maxChefs}
            onChange={(e) => setFormData({ ...formData, maxChefs: e.target.value })}
            required
            min="1"
          />
          <button type="submit">crear</button>
        </form>
      )}
      <ul>
        {tournaments.map(tournament => (
          <li key={tournament.id}>
            <Link to={`/tournaments/${tournament.id}`}>
              {tournament.name} - {tournament.location} ({tournament.registeredChefs.length}/{tournament.maxChefs})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TournamentsList;