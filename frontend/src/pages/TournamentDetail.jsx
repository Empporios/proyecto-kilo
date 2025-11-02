import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTournament, getChefs, registerChef, submitScore, getRanking } from '../services/api';

const TournamentDetail = () => {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [chefs, setChefs] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedChef, setSelectedChef] = useState('');
  const [score, setScore] = useState('');
  const [submitChef, setSubmitChef] = useState('');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [tournamentRes, chefsRes, rankingRes] = await Promise.all([
        getTournament(id),
        getChefs(),
        getRanking(id)
      ]);
      setTournament(tournamentRes.data);
      setChefs(chefsRes.data);
      setRanking(rankingRes.data);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      await registerChef(id, selectedChef);
      fetchData();
      setSelectedChef('');
    } catch (err) {
      setError('Failed to register chef');
    }
  };

  const handleSubmitScore = async () => {
    try {
      await submitScore(id, submitChef, parseInt(score));
      fetchData();
      setSubmitChef('');
      setScore('');
    } catch (err) {
      setError('Failed to submit score');
    }
  };

  const availableChefs = chefs.filter(chef => !tournament?.registeredChefs.includes(chef.id));

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!tournament) return <div>Tournament not found</div>;

  return (
    <div className="tournament-detail">
      <h2>{tournament.name}</h2>
      <p>Lugar: {tournament.location}</p>
      <p>Registrados: {tournament.registeredChefs.length}/{tournament.maxChefs}</p>

      <h3>Registered Chefs</h3>
      <ul>
        {tournament.registeredChefs.map(chefId => {
          const chef = chefs.find(c => c.id === chefId);
          return <li key={chefId}>{chef?.name} - Puntaje: {tournament.results[chefId] || 'Not submitted'}</li>;
        })}
      </ul>

      <h3>Registrar chef</h3>
      <select value={selectedChef} onChange={(e) => setSelectedChef(e.target.value)}>
        <option value="">Elegir chef</option>
        {availableChefs.map(chef => (
          <option key={chef.id} value={chef.id}>{chef.name}</option>
        ))}
      </select>
      <button onClick={handleRegister} disabled={!selectedChef}>Register</button>

      <h3>Subir puntaje</h3>
      <select value={submitChef} onChange={(e) => setSubmitChef(e.target.value)}>
        <option value="">Seleccionar chef</option>
        {tournament.registeredChefs.map(chefId => {
          const chef = chefs.find(c => c.id === chefId);
          return <option key={chefId} value={chefId}>{chef.name}</option>;
        })}
      </select>
      <input
        type="number"
        placeholder="Puntaje (0-100)"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        min="0"
        max="100"
      />
      <button onClick={handleSubmitScore} disabled={!submitChef || !score}>Subir puntaje</button>

      <h3>Podio</h3>
      <ol>
        {ranking.map((item, index) => (
          <li key={item.chef.id}>{item.chef.name} - {item.score}</li>
        ))}
      </ol>
    </div>
  );
};

export default TournamentDetail;