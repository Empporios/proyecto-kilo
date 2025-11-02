const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del middleware
// Habilita CORS para permitir solicitudes desde el frontend
app.use(cors());
// Parsea el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Middleware de logging para registrar todas las solicitudes
// Registra fecha, método HTTP y URL de cada petición
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Almacenamiento en memoria (simula una base de datos)
// Arrays para almacenar chefs y torneos temporalmente
let chefs = [];
let tournaments = [];

// Funciones auxiliares para validación de datos
// Valida que los datos del chef sean correctos antes de guardarlos
function validateChef(chef) {
  if (!chef.name || !chef.specialty || typeof chef.experienceYears !== 'number' || chef.experienceYears < 0) {
    return false;
  }
  return true;
}

// Valida que los datos del torneo sean correctos antes de crearlo
function validateTournament(tournament) {
  if (!tournament.name || !tournament.location || typeof tournament.maxChefs !== 'number' || tournament.maxChefs <= 0) {
    return false;
  }
  return true;
}

// Valida que el puntaje esté en el rango correcto (0-100)
function validateScore(score) {
  return typeof score === 'number' && score >= 0 && score <= 100;
}

// Definición de rutas/endpoints de la API

// POST /chefs - Registra un nuevo chef en el sistema
app.post('/chefs', (req, res) => {
  // Obtiene los datos del chef del cuerpo de la solicitud
  const chef = req.body;
  // Valida que los datos sean correctos
  if (!validateChef(chef)) {
    return res.status(400).json({ error: 'Invalid chef data' });
  }
  // Asigna un ID único al chef
  chef.id = uuidv4();
  // Agrega el chef al array de chefs
  chefs.push(chef);
  // Responde con el chef creado y código 201 (creado)
  res.status(201).json(chef);
});

// POST /tournaments - Crea un nuevo torneo
app.post('/tournaments', (req, res) => {
  // Obtiene los datos del torneo del cuerpo de la solicitud
  const tournament = req.body;
  // Valida que los datos sean correctos
  if (!validateTournament(tournament)) {
    return res.status(400).json({ error: 'Invalid tournament data' });
  }
  // Asigna un ID único al torneo
  tournament.id = uuidv4();
  // Inicializa arrays para chefs registrados y resultados
  tournament.registeredChefs = [];
  tournament.results = {};
  // Agrega el torneo al array de torneos
  tournaments.push(tournament);
  // Responde con el torneo creado
  res.status(201).json(tournament);
});

// POST /tournaments/:id/register - Registra un chef en un torneo específico
app.post('/tournaments/:id/register', (req, res) => {
  // Obtiene el ID del torneo de los parámetros de la URL
  const { id } = req.params;
  // Obtiene el ID del chef del cuerpo de la solicitud
  const { chefId } = req.body;
  // Busca el torneo por ID
  const tournament = tournaments.find(t => t.id === id);
  if (!tournament) {
    return res.status(404).json({ error: 'Tournament not found' });
  }
  // Verifica que el chef exista
  const chef = chefs.find(c => c.id === chefId);
  if (!chef) {
    return res.status(404).json({ error: 'Chef not found' });
  }
  // Verifica que el torneo no esté lleno
  if (tournament.registeredChefs.length >= tournament.maxChefs) {
    return res.status(400).json({ error: 'Tournament is full' });
  }
  // Verifica que el chef no esté ya registrado
  if (tournament.registeredChefs.includes(chefId)) {
    return res.status(400).json({ error: 'Chef already registered' });
  }
  // Registra al chef en el torneo
  tournament.registeredChefs.push(chefId);
  res.status(200).json({ message: 'Chef registered successfully' });
});

// POST /tournaments/:id/submit - Envía el resultado/puntaje de un chef en un torneo
app.post('/tournaments/:id/submit', (req, res) => {
  // Obtiene el ID del torneo de los parámetros
  const { id } = req.params;
  // Obtiene el ID del chef y el puntaje del cuerpo de la solicitud
  const { chefId, score } = req.body;
  // Busca el torneo por ID
  const tournament = tournaments.find(t => t.id === id);
  if (!tournament) {
    return res.status(404).json({ error: 'Tournament not found' });
  }
  // Verifica que el chef esté registrado en el torneo
  if (!tournament.registeredChefs.includes(chefId)) {
    return res.status(400).json({ error: 'Chef not registered in this tournament' });
  }
  // Valida que el puntaje sea correcto
  if (!validateScore(score)) {
    return res.status(400).json({ error: 'Invalid score' });
  }
  // Guarda el resultado del chef
  tournament.results[chefId] = score;
  res.status(200).json({ message: 'Score submitted successfully' });
});

// GET /tournaments/:id/ranking - Obtiene el ranking/clasificación de un torneo
app.get('/tournaments/:id/ranking', (req, res) => {
  // Obtiene el ID del torneo de los parámetros
  const { id } = req.params;
  // Busca el torneo por ID
  const tournament = tournaments.find(t => t.id === id);
  if (!tournament) {
    return res.status(404).json({ error: 'Tournament not found' });
  }
  // Crea el ranking mapeando chefs registrados con sus puntajes
  const ranking = tournament.registeredChefs
    .map(chefId => {
      // Busca los datos del chef
      const chef = chefs.find(c => c.id === chefId);
      return {
        chef: chef,
        // Usa el puntaje guardado o 0 si no tiene
        score: tournament.results[chefId] || 0
      };
    })
    // Ordena por puntaje descendente (mayor a menor)
    .sort((a, b) => b.score - a.score);
  res.status(200).json(ranking);
});

// GET /chefs - Obtiene todos los chefs registrados
app.get('/chefs', (req, res) => {
  res.status(200).json(chefs);
});

// GET /tournaments - Obtiene todos los torneos disponibles
app.get('/tournaments', (req, res) => {
  res.status(200).json(tournaments);
});

// GET /tournaments/:id - Obtiene los detalles de un torneo específico
app.get('/tournaments/:id', (req, res) => {
  // Obtiene el ID del torneo de los parámetros
  const { id } = req.params;
  // Busca el torneo por ID
  const tournament = tournaments.find(t => t.id === id);
  if (!tournament) {
    return res.status(404).json({ error: 'Tournament not found' });
  }
  // Responde con los datos del torneo
  res.status(200).json(tournament);
});

// Middleware de manejo de errores
// Captura cualquier error no manejado en las rutas
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Inicia el servidor
// Escucha en el puerto especificado y muestra mensaje de confirmación
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Exporta la aplicación para testing o uso en otros módulos
module.exports = app;