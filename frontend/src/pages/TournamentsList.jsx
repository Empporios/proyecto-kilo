// Importaciones necesarias para el componente TournamentsList
// React y hooks para manejar estado y efectos secundarios
import React, { useState, useEffect } from 'react';
// Link permite navegar a detalles de torneos sin recargar la página
import { Link } from 'react-router-dom';
// Funciones de la API para obtener y crear torneos
import { getTournaments, createTournament } from '../services/api';

// Componente funcional para mostrar la lista de torneos
// Maneja el estado de torneos, carga, errores y formulario de creación
const TournamentsList = () => {
  // Estado para almacenar la lista de torneos obtenidos de la API
  const [tournaments, setTournaments] = useState([]);
  // Estado para mostrar indicador de carga mientras se obtienen datos
  const [loading, setLoading] = useState(true);
  // Estado para manejar mensajes de error
  const [error, setError] = useState('');
  // Estado para controlar la visibilidad del formulario de creación
  const [showForm, setShowForm] = useState(false);
  // Estado para los datos del formulario de creación de torneo
  const [formData, setFormData] = useState({ name: '', location: '', maxChefs: '' });

  // Hook useEffect para cargar torneos al montar el componente
  // Se ejecuta solo una vez cuando el componente se monta
  useEffect(() => {
    fetchTournaments();
  }, []);

  // Función asíncrona para obtener la lista de torneos desde la API
  // Maneja errores y actualiza el estado correspondiente
  const fetchTournaments = async () => {
    try {
      // Llama a la función de la API para obtener torneos
      const response = await getTournaments();
      // Actualiza el estado con los datos obtenidos
      setTournaments(response.data);
    } catch (err) {
      // En caso de error, establece mensaje de error
      setError('Failed to load tournaments');
    } finally {
      // Siempre oculta el indicador de carga al finalizar
      setLoading(false);
    }
  };

  // Función para manejar el envío del formulario de creación de torneo
  // Previene recarga de página y maneja la creación asíncronamente
  const handleSubmit = async (e) => {
    // Previene el comportamiento por defecto del formulario
    e.preventDefault();
    try {
      // Llama a la API para crear un nuevo torneo con los datos del formulario
      await createTournament({
        name: formData.name,
        location: formData.location,
        // Convierte el límite de chefs a número entero
        maxChefs: parseInt(formData.maxChefs)
      });
      // Limpia el formulario después de crear exitosamente
      setFormData({ name: '', location: '', maxChefs: '' });
      // Oculta el formulario
      setShowForm(false);
      // Recarga la lista de torneos para mostrar el nuevo
      fetchTournaments();
    } catch (err) {
      // Establece mensaje de error si falla la creación
      setError('Failed to create tournament');
    }
  };

  // Renderizado condicional: muestra indicador de carga mientras se obtienen datos
  if (loading) return <div>Loading...</div>;
  // Renderizado condicional: muestra mensaje de error si ocurrió algún problema
  if (error) return <div className="error">{error}</div>;

  // Renderizado del componente principal
  return (
    // Contenedor principal con clase CSS para estilos
    <div className="tournaments-list">
      // Título de la página de torneos
      <h2>Torneos</h2>
      // Botón para mostrar/ocultar el formulario de creación
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Create Tournament'}
      </button>
      // Renderizado condicional del formulario solo si showForm es true
      {showForm && (
        // Formulario para crear nuevos torneos
        <form onSubmit={handleSubmit}>
          // Campo de entrada para el nombre del torneo
          <input
            type="text"
            placeholder="Nombre"
            value={formData.name}
            // Actualiza el estado del formulario al cambiar el valor
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          // Campo de entrada para el lugar del torneo
          <input
            type="text"
            placeholder="Lugar"
            value={formData.location}
            // Actualiza el estado del formulario al cambiar el valor
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
          // Campo numérico para el límite máximo de chefs
          <input
            type="number"
            placeholder="limite de Chefs"
            value={formData.maxChefs}
            // Actualiza el estado del formulario al cambiar el valor
            onChange={(e) => setFormData({ ...formData, maxChefs: e.target.value })}
            required
            min="1"
          />
          // Botón para enviar el formulario y crear el torneo
          <button type="submit">crear</button>
        </form>
      )}
      // Lista no ordenada para mostrar los torneos
      <ul>
        // Mapea cada torneo a un elemento de lista
        {tournaments.map(tournament => (
          // Cada elemento debe tener una key única para React
          <li key={tournament.id}>
            // Enlace que navega a la página de detalles del torneo
            <Link to={`/tournaments/${tournament.id}`}>
              // Muestra nombre, lugar y ocupación del torneo (chefs registrados / máximo)
              {tournament.name} - {tournament.location} ({tournament.registeredChefs.length}/{tournament.maxChefs})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Exportación por defecto del componente TournamentsList
// Permite que este componente sea importado en App.jsx para el enrutamiento
export default TournamentsList;