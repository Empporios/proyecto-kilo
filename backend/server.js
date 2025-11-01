const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// In-memory storage
let chefs = [];
let tournaments = [];

// Helper functions
function validateChef(chef) {
  if (!chef.name || !chef.specialty || typeof chef.experienceYears !== 'number' || chef.experienceYears < 0) {
    return false;
  }
  return true;
}

function validateTournament(tournament) {
  if (!tournament.name || !tournament.location || typeof tournament.maxChefs !== 'number' || tournament.maxChefs <= 0) {
    return false;
  }
  return true;
}

function validateScore(score) {
  return typeof score === 'number' && score >= 0 && score <= 100;
}

// Routes

// POST /chefs - Register chef
app.post('/chefs', (req, res) => {
  const chef = req.body;
  if (!validateChef(chef)) {
    return res.status(400).json({ error: 'Invalid chef data' });
  }
  chef.id = uuidv4();
  chefs.push(chef);
  res.status(201).json(chef);
});

// POST /tournaments - Create tournament
app.post('/tournaments', (req, res) => {
  const tournament = req.body;
  if (!validateTournament(tournament)) {
    return res.status(400).json({ error: 'Invalid tournament data' });
  }
  tournament.id = uuidv4();
  tournament.registeredChefs = [];
  tournament.results = {};
  tournaments.push(tournament);
  res.status(201).json(tournament);
});

// POST /tournaments/:id/register - Register chef in tournament
app.post('/tournaments/:id/register', (req, res) => {
  const { id } = req.params;
  const { chefId } = req.body;
  const tournament = tournaments.find(t => t.id === id);
  if (!tournament) {
    return res.status(404).json({ error: 'Tournament not found' });
  }
  const chef = chefs.find(c => c.id === chefId);
  if (!chef) {
    return res.status(404).json({ error: 'Chef not found' });
  }
  if (tournament.registeredChefs.length >= tournament.maxChefs) {
    return res.status(400).json({ error: 'Tournament is full' });
  }
  if (tournament.registeredChefs.includes(chefId)) {
    return res.status(400).json({ error: 'Chef already registered' });
  }
  tournament.registeredChefs.push(chefId);
  res.status(200).json({ message: 'Chef registered successfully' });
});

// POST /tournaments/:id/submit - Submit result for chef
app.post('/tournaments/:id/submit', (req, res) => {
  const { id } = req.params;
  const { chefId, score } = req.body;
  const tournament = tournaments.find(t => t.id === id);
  if (!tournament) {
    return res.status(404).json({ error: 'Tournament not found' });
  }
  if (!tournament.registeredChefs.includes(chefId)) {
    return res.status(400).json({ error: 'Chef not registered in this tournament' });
  }
  if (!validateScore(score)) {
    return res.status(400).json({ error: 'Invalid score' });
  }
  tournament.results[chefId] = score;
  res.status(200).json({ message: 'Score submitted successfully' });
});

// GET /tournaments/:id/ranking - Get ranking
app.get('/tournaments/:id/ranking', (req, res) => {
  const { id } = req.params;
  const tournament = tournaments.find(t => t.id === id);
  if (!tournament) {
    return res.status(404).json({ error: 'Tournament not found' });
  }
  const ranking = tournament.registeredChefs
    .map(chefId => {
      const chef = chefs.find(c => c.id === chefId);
      return {
        chef: chef,
        score: tournament.results[chefId] || 0
      };
    })
    .sort((a, b) => b.score - a.score);
  res.status(200).json(ranking);
});

// GET /chefs - Get all chefs
app.get('/chefs', (req, res) => {
  res.status(200).json(chefs);
});

// GET /tournaments - Get all tournaments
app.get('/tournaments', (req, res) => {
  res.status(200).json(tournaments);
});

// GET /tournaments/:id - Get tournament details
app.get('/tournaments/:id', (req, res) => {
  const { id } = req.params;
  const tournament = tournaments.find(t => t.id === id);
  if (!tournament) {
    return res.status(404).json({ error: 'Tournament not found' });
  }
  res.status(200).json(tournament);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;