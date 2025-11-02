import React, { useState, useEffect } from 'react';
// 1. ¡Este es nuevo! 'useParams' es para leer la variable de la URL
// (o sea, el ':id' que definimos en App.jsx)
import { useParams } from 'react-router-dom';
// Importa un montón de funciones de la API
import { getTournament, getChefs, registerChef, submitScore, getRanking } from '../services/api';

const TournamentDetail = () => {
  // 2. Aquí guardamos ese ':id' en una variable.
  // Si la URL es /tournaments/5, la variable 'id' será "5".
  const { id } = useParams();
  
  // Estados para guardar los 3 tipos de datos que necesitamos
  const [tournament, setTournament] = useState(null); // El torneo específico
  const [chefs, setChefs] = useState([]); // La lista COMPLETA de todos los chefs
  const [ranking, setRanking] = useState([]); // El podio/ranking
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Estados para los dos formularios de esta página
  const [selectedChef, setSelectedChef] = useState(''); // Para el dropdown de registrar
  const [score, setScore] = useState(''); // Para el input de puntaje
  const [submitChef, setSubmitChef] = useState(''); // Para el dropdown de puntaje

  // 3. ¡Importante! El 'useEffect' ahora depende de [id].
  // Si el 'id' en la URL cambia (ej: de /tournaments/5 a /tournaments/6),
  // este efecto se vuelve a ejecutar y carga los datos del nuevo torneo.
  useEffect(() => {
    fetchData();
  }, [id]);

  // Esta función carga TODOS los datos que necesita la página
  const fetchData = async () => {
    try {
      // 4. ¡Genial! 'Promise.all' hace las 3 llamadas a la API AL MISMO TIEMPO.
      // Es más rápido que hacerlas una por una esperando a cada una.
      const [tournamentRes, chefsRes, rankingRes] = await Promise.all([
        getTournament(id), // Trae el torneo por su ID
        getChefs(),         // Trae TODOS los chefs (para los dropdowns)
        getRanking(id)      // Trae el ranking de este torneo
      ]);
      // Guarda todo en los estados
      setTournament(tournamentRes.data);
      setChefs(chefsRes.data);
      setRanking(rankingRes.data);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Función para el botón "Register"
  const handleRegister = async () => {
    try {
      await registerChef(id, selectedChef);
      // 5. ¡CLAVE! Después de registrar, vuelve a llamar a 'fetchData'.
      // Esto actualiza toda la info de la página (la lista de chefs registrados, etc.)
      // sin tener que recargar la web.
      fetchData();
      setSelectedChef(''); // Limpia el dropdown
    } catch (err) {
      setError('Failed to register chef');
    }
  };

  // Función para el botón "Subir puntaje"
  const handleSubmitScore = async () => {
    try {
      await submitScore(id, submitChef, parseInt(score));
      // 6. Igual que 'handleRegister', llama a 'fetchData' para refrescar
      // la lista y que se vean los puntajes nuevos.
      fetchData();
      setSubmitChef('');
      setScore('');
    } catch (err) {
      setError('Failed to submit score');
    }
  };

  // 7. Lógica importante. Esto no es un estado, es un valor calculado.
  // Filtra la lista de TODOS los chefs ('chefs')
  // y saca los que ya están en 'tournament.registeredChefs'.
  // El '?' es para que no explote si 'tournament' todavía no cargó.
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
        {/* Mapea la lista de IDs de chefs registrados */}
        {tournament.registeredChefs.map(chefId => {
          // 8. ¡Esto es un "join" manual! Como 'registeredChefs' solo tiene IDs,
          // usamos 'find' en la lista completa de 'chefs' (que está en otro estado)
          // para encontrar el nombre y los datos de ese chef.
          const chef = chefs.find(c => c.id === chefId);
          // Muestra el nombre y su puntaje (o "Not submitted" si no tiene)
          return <li key={chefId}>{chef?.name} - Puntaje: {tournament.results[chefId] || 'Not submitted'}</li>;
        })}
      </ul>

      <h3>Registrar chef</h3>
      {/* El dropdown para registrar usa la lista filtrada 'availableChefs' */}
      <select value={selectedChef} onChange={(e) => setSelectedChef(e.target.value)}>
        <option value="">Elegir chef</option>
        {availableChefs.map(chef => (
          <option key={chef.id} value={chef.id}>{chef.name}</option>
        ))}
      </select>
      <button onClick={handleRegister} disabled={!selectedChef}>Register</button>

      <h3>Subir puntaje</h3>
      {/* El dropdown de puntajes SÍ usa la lista de chefs ya registrados */}
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
      {/* La lista de ranking viene de su propio estado 'ranking' */}
      <ol>
        {ranking.map((item, index) => (
          <li key={item.chef.id}>{item.chef.name} - {item.score}</li>
        ))}
      </ol>
    </div>
  );
};

export default TournamentDetail;