// Importa 'axios', que es la herramienta que usamos para hacer las llamadas a la API (como GET, POST, etc.)
import axios from 'axios';

// 1. ¡Esta es la URL base del servidor!
// Es genial que esté aquí arriba, porque si el servidor cambia de 'localhost:3000'
// a 'miapi.com', solo lo cambiamos en esta línea y todo sigue funcionando.
const API_BASE_URL = 'http://localhost:3000';

// 2. Aquí creamos una "instancia" de axios.
// Es como un 'axios' personalizado que SIEMPRE usará la 'baseURL' que definimos.
// Así no tenemos que escribir 'http://localhost:3000' en cada función.
const api = axios.create({
  baseURL: API_BASE_URL,
});

// --- 3. LA "BIBLIOTECA" DE FUNCIONES DE LA API ---
// Esta es la parte más importante.
// Cada 'export const' es una función que nuestros componentes de React
// pueden importar y usar, sin tener que saber qué es axios o cuál es la URL.

// Funciones para los Chefs
export const getChefs = () => api.get('/chefs'); // Trae la lista de chefs
export const createChef = (chef) => api.post('/chefs', chef); // Crea un chef nuevo (le pasa el objeto 'chef')

// Funciones para los Torneos
export const getTournaments = () => api.get('/tournaments'); // Trae la lista de torneos
export const createTournament = (tournament) => api.post('/tournaments', tournament); // Crea un torneo nuevo
// Usa el 'id' para construir la URL, ej: /tournaments/5
export const getTournament = (id) => api.get(`/tournaments/${id}`); 
// Registra un chef en un torneo. Fíjate cómo usa los dos IDs.
export const registerChef = (tournamentId, chefId) => api.post(`/tournaments/${tournamentId}/register`, { chefId });
// Manda el puntaje de un chef en un torneo.
export const submitScore = (tournamentId, chefId, score) => api.post(`/tournaments/${tournamentId}/submit`, { chefId, score });
// Trae el ranking de un torneo específico.
export const getRanking = (tournamentId) => api.get(`/tournaments/${tournamentId}/ranking`);

// Exporta la instancia 'api' por si se necesita para algo más avanzado.
export default api;