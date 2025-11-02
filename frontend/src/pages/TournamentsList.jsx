import React, { useState, useEffect } from 'react';
// ¡Importante! Esto no es un <a>, es un <Link> de react-router-dom.
// Se usa para navegar entre "páginas" sin recargar el sitio completo.
import { Link } from 'react-router-dom';
import { getTournaments, createTournament } from '../services/api';

const TournamentsList = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // --- 1. ESTADO PARA MOSTRAR/OCULTAR EL FORMULARIO ---
  // Esta es la parte clave de este componente. Es un 'boolean' (true/false)
  // para saber si el formulario de crear torneo debe estar visible o no.
  const [showForm, setShowForm] = useState(false); // Empieza oculto (false)
  const [formData, setFormData] = useState({ name: '', location: '', maxChefs: '' });

  // (El useEffect y fetchTournaments son iguales al componente de Chefs,
  // se ejecutan una vez para cargar la lista)
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

  // El handleSubmit es muy parecido, pero fíjate en esto:
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTournament({
        name: formData.name,
        location: formData.location,
        maxChefs: parseInt(formData.maxChefs)
      });
      setFormData({ name: '', location: '', maxChefs: '' });
      // --- 2. ACCIONES POST-CREACIÓN ---
      setShowForm(false); // ¡Oculta el formulario después de crear!
      fetchTournaments(); // Vuelve a cargar la lista para que aparezca el nuevo.
    } catch (err) {
      setError('Failed to create tournament');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="tournaments-list">
      <h2>Torneos</h2>
      {/* --- 3. EL BOTÓN "TOGGLE" --- */}
      {/* Este botón cambia el estado 'showForm' al valor contrario */}
      {/* Si estaba 'false', lo pone 'true'. Si estaba 'true', lo pone 'false'. */}
      <button onClick={() => setShowForm(!showForm)}>
        {/* Esto es un 'ternario': (condición ? si_es_true : si_es_false) */}
        {/* Cambia el texto del botón dependiendo del estado 'showForm' */}
        {showForm ? 'Cancelar' : 'Create Tournament'}
      </button>
      
      {/* --- 4. RENDERIZADO CONDICIONAL DEL FORMULARIO --- */}
      {/* Este es el truco: El '&&' significa "si 'showForm' es true,
         ENTONCES dibuja lo que sigue (el formulario)". */}
      {/* Si 'showForm' es false, no dibuja nada. */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          {/* (El interior del formulario es igual al de Chefs) */}
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
        {/* --- 5. LA LISTA CON LINKS --- */}
        {tournaments.map(tournament => (
          <li key={tournament.id}>
            {/* Aquí se usa el <Link> que importamos. */}
            {/* 'to' es como el 'href', pero para el router de React. */}
            {/* `.../${tournament.id}` crea una URL dinámica, ej: /tournaments/5 */}
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