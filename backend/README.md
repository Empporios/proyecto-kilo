# Backend API - Cooking Tournament Manager

Node.js + Express REST API for managing cooking tournaments.

## Installation

```bash
npm install
```

## Running

```bash
npm start
```

Server runs on http://localhost:3000

## API Endpoints

### Chefs

#### POST /chefs
Create a new chef.

**Request Body:**
```json
{
  "name": "string",
  "specialty": "string",
  "experienceYears": number
}
```

**Response:** Chef object with generated ID

#### GET /chefs
Get all chefs.

**Response:** Array of chef objects

### Tournaments

#### POST /tournaments
Create a new tournament.

**Request Body:**
```json
{
  "name": "string",
  "location": "string",
  "maxChefs": number
}
```

**Response:** Tournament object with generated ID

#### GET /tournaments
Get all tournaments.

**Response:** Array of tournament objects

#### GET /tournaments/:id
Get tournament details.

**Response:** Tournament object with registered chefs and results

#### POST /tournaments/:id/register
Register a chef for a tournament.

**Request Body:**
```json
{
  "chefId": "string"
}
```

**Response:** Success message

#### POST /tournaments/:id/submit
Submit a score for a registered chef.

**Request Body:**
```json
{
  "chefId": "string",
  "score": number (0-100)
}
```

**Response:** Success message

#### GET /tournaments/:id/ranking
Get tournament ranking ordered by score.

**Response:** Array of ranking objects with chef details and scores

## Validation Rules

- Chef: name, specialty required; experienceYears >= 0
- Tournament: name, location required; maxChefs > 0
- Score: 0-100 range
- Registration: Chef must exist, tournament not full, chef not already registered
- Score submission: Chef must be registered for the tournament

## Error Responses

All errors return appropriate HTTP status codes with error messages:

- 400: Bad Request (validation errors)
- 404: Not Found
- 500: Internal Server Error

## Data Storage

Currently uses in-memory storage. Data persists only during server runtime.