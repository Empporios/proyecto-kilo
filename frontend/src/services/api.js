// Importación de axios para realizar peticiones HTTP
import axios from 'axios';

// URL base del servidor backend donde se ejecuta la API
const API_BASE_URL = 'http://localhost:3000';

// Creación de una instancia de axios con configuración base
// Esto permite tener una configuración centralizada para todas las peticiones
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Funciones para gestionar chefs
// Obtiene todos los chefs registrados en el sistema
export const getChefs = () => api.get('/chefs');
// Crea un nuevo chef enviando sus datos al servidor
export const createChef = (chef) => api.post('/chefs', chef);

// Funciones para gestionar torneos
// Obtiene todos los torneos disponibles
export const getTournaments = () => api.get('/tournaments');
// Crea un nuevo torneo enviando sus datos al servidor
export const createTournament = (tournament) => api.post('/tournaments', tournament);
// Obtiene los detalles de un torneo específico por su ID
export const getTournament = (id) => api.get(`/tournaments/${id}`);
// Registra un chef en un torneo específico
export const registerChef = (tournamentId, chefId) => api.post(`/tournaments/${tournamentId}/register`, { chefId });
// Envía el puntaje de un chef en un torneo específico
export const submitScore = (tournamentId, chefId, score) => api.post(`/tournaments/${tournamentId}/submit`, { chefId, score });
// Obtiene el ranking/clasificación de un torneo específico
export const getRanking = (tournamentId) => api.get(`/tournaments/${tournamentId}/ranking`);

// Exportación por defecto de la instancia de axios
// Permite usar la instancia configurada en otros archivos si es necesario
export default api;