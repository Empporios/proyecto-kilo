import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getChefs = () => api.get('/chefs');
export const createChef = (chef) => api.post('/chefs', chef);

export const getTournaments = () => api.get('/tournaments');
export const createTournament = (tournament) => api.post('/tournaments', tournament);
export const getTournament = (id) => api.get(`/tournaments/${id}`);
export const registerChef = (tournamentId, chefId) => api.post(`/tournaments/${tournamentId}/register`, { chefId });
export const submitScore = (tournamentId, chefId, score) => api.post(`/tournaments/${tournamentId}/submit`, { chefId, score });
export const getRanking = (tournamentId) => api.get(`/tournaments/${tournamentId}/ranking`);

export default api;