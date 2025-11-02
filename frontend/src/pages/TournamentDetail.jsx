// Importaciones necesarias para el componente TournamentDetail
// React y hooks para manejar estado y efectos secundarios
import React, { useState, useEffect } from 'react';
// useParams para obtener parámetros de la URL (id del torneo)
import { useParams } from 'react-router-dom';
// Funciones de la API para obtener datos del torneo, chefs, registrar chefs, subir puntajes y obtener ranking
import { getTournament, getChefs, registerChef, submitScore, getRanking } from '../services/api';

// Componente funcional para mostrar los detalles de un torneo específico
// Maneja el estado de torneo, chefs, ranking, carga, errores y formularios
const TournamentDetail = () => {
  // Obtiene el parámetro id de la URL para identificar el torneo
  const { id } = useParams();
  // Estado para almacenar los datos del torneo actual
  const [tournament, setTournament] = useState(null);
  // Estado para almacenar la lista de todos los chefs disponibles
  const [chefs, setChefs] = useState([]);
  // Estado para almacenar el ranking del torneo
  const [ranking, setRanking] = useState([]);
  // Estado para mostrar indicador de carga mientras se obtienen datos
  const [loading, setLoading] = useState(true);
  // Estado para manejar mensajes de error
  const [error, setError] = useState('');
  // Estado para el chef seleccionado en el formulario de registro
  const [selectedChef, setSelectedChef] = useState('');
  // Estado para el puntaje a subir
  const [score, setScore] = useState('');
  // Estado para el chef seleccionado en el formulario de subida de puntaje
  const [submitChef, setSubmitChef] = useState('');

  // Hook useEffect para cargar datos cuando cambia el id del torneo
  // Se ejecuta cuando el componente se monta o cuando cambia el parámetro id
  useEffect(() => {
    fetchData();
  }, [id]);

  // Función asíncrona para obtener todos los datos necesarios del torneo
  // Realiza múltiples llamadas a la API en paralelo para optimizar el rendimiento
  const fetchData = async () => {
    try {
      // Ejecuta todas las llamadas a la API simultáneamente usando Promise.all
      const [tournamentRes, chefsRes, rankingRes] = await Promise.all([
        getTournament(id), // Obtiene datos del torneo específico
        getChefs(), // Obtiene lista de todos los chefs
        getRanking(id) // Obtiene el ranking del torneo
      ]);
      // Actualiza el estado con los datos obtenidos
      setTournament(tournamentRes.data);
      setChefs(chefsRes.data);
      setRanking(rankingRes.data);
    } catch (err) {
      // En caso de error, establece mensaje de error
      setError('Failed to load data');
    } finally {
      // Siempre oculta el indicador de carga al finalizar
      setLoading(false);
    }
  };

  // Función para manejar el registro de un chef en el torneo
  // Registra al chef seleccionado y actualiza los datos
  const handleRegister = async () => {
    try {
      // Llama a la API para registrar el chef en el torneo
      await registerChef(id, selectedChef);
      // Recarga todos los datos para reflejar los cambios
      fetchData();
      // Limpia la selección del chef
      setSelectedChef('');
    } catch (err) {
      // Establece mensaje de error si falla el registro
      setError('Failed to register chef');
    }
  };

  // Función para manejar la subida de puntajes de un chef
  // Envía el puntaje del chef seleccionado y actualiza los datos
  const handleSubmitScore = async () => {
    try {
      // Llama a la API para subir el puntaje del chef
      await submitScore(id, submitChef, parseInt(score));
      // Recarga todos los datos para reflejar los cambios
      fetchData();
      // Limpia las selecciones del formulario
      setSubmitChef('');
      setScore('');
    } catch (err) {
      // Establece mensaje de error si falla la subida del puntaje
      setError('Failed to submit score');
    }
  };

  // Calcula la lista de chefs disponibles para registro
  // Filtra los chefs que no están ya registrados en el torneo
  const availableChefs = chefs.filter(chef => !tournament?.registeredChefs.includes(chef.id));

  // Renderizado condicional: muestra indicador de carga mientras se obtienen datos
  if (loading) return <div>Loading...</div>;
  // Renderizado condicional: muestra mensaje de error si ocurrió algún problema
  if (error) return <div className="error">{error}</div>;
  // Renderizado condicional: muestra mensaje si no se encontró el torneo
  if (!tournament) return <div>Tournament not found</div>;

  // Renderizado del componente principal
  return (
    // Contenedor principal con clase CSS para estilos
    <div className="tournament-detail">
      // Título con el nombre del torneo
      <h2>{tournament.name}</h2>
      // Información básica del torneo: lugar y ocupación
      <p>Lugar: {tournament.location}</p>
      <p>Registrados: {tournament.registeredChefs.length}/{tournament.maxChefs}</p>

      // Sección que muestra los chefs registrados en el torneo
      <h3>Registered Chefs</h3>
      <ul>
        // Mapea cada chef registrado para mostrar su nombre y puntaje
        {tournament.registeredChefs.map(chefId => {
          // Busca los datos del chef en la lista completa
          const chef = chefs.find(c => c.id === chefId);
          return <li key={chefId}>{chef?.name} - Puntaje: {tournament.results[chefId] || 'Not submitted'}</li>;
        })}
      </ul>

      // Sección para registrar nuevos chefs en el torneo
      <h3>Registrar chef</h3>
      // Selector desplegable con chefs disponibles para registro
      <select value={selectedChef} onChange={(e) => setSelectedChef(e.target.value)}>
        <option value="">Elegir chef</option>
        // Mapea chefs disponibles (no registrados) como opciones
        {availableChefs.map(chef => (
          <option key={chef.id} value={chef.id}>{chef.name}</option>
        ))}
      </select>
      // Botón para registrar el chef seleccionado, deshabilitado si no hay selección
      <button onClick={handleRegister} disabled={!selectedChef}>Register</button>

      // Sección para subir puntajes de chefs registrados
      <h3>Subir puntaje</h3>
      // Selector desplegable con chefs registrados para asignar puntaje
      <select value={submitChef} onChange={(e) => setSubmitChef(e.target.value)}>
        <option value="">Seleccionar chef</option>
        // Mapea chefs registrados como opciones
        {tournament.registeredChefs.map(chefId => {
          const chef = chefs.find(c => c.id === chefId);
          return <option key={chefId} value={chefId}>{chef.name}</option>;
        })}
      </select>
      // Campo numérico para ingresar el puntaje (0-100)
      <input
        type="number"
        placeholder="Puntaje (0-100)"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        min="0"
        max="100"
      />
      // Botón para subir el puntaje, deshabilitado si faltan datos
      <button onClick={handleSubmitScore} disabled={!submitChef || !score}>Subir puntaje</button>

      // Sección que muestra el podio/ranking del torneo
      <h3>Podio</h3>
      <ol>
        // Mapea el ranking para mostrar la clasificación ordenada
        {ranking.map((item, index) => (
          <li key={item.chef.id}>{item.chef.name} - {item.score}</li>
        ))}
      </ol>
    </div>
  );
};

// Exportación por defecto del componente TournamentDetail
// Permite que este componente sea importado en App.jsx para el enrutamiento
export default TournamentDetail;