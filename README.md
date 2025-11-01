# Cooking Tournament Manager

A full-stack application for managing cooking tournaments, built with Node.js/Express backend and React frontend.

## Project Structure

- `/backend` - Node.js + Express API server
- `/frontend` - React + Vite SPA

## Features

- **Backend API**: RESTful endpoints for chefs, tournaments, registration, scoring, and rankings
- **Frontend SPA**: User-friendly interface for managing chefs and tournaments
- **Real-time Updates**: Consistent state between frontend and backend
- **Responsive Design**: Works on desktop and mobile devices
- **Form Validations**: Client and server-side validations
- **Error Handling**: Clear error messages for users

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
   Server will run on http://localhost:3000

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on http://localhost:5173

### Testing

Run frontend tests:
```bash
cd frontend
npm test
```

## API Endpoints

### Chefs
- `POST /chefs` - Create a new chef
- `GET /chefs` - Get all chefs

### Tournaments
- `POST /tournaments` - Create a new tournament
- `GET /tournaments` - Get all tournaments
- `GET /tournaments/:id` - Get tournament details
- `POST /tournaments/:id/register` - Register chef for tournament
- `POST /tournaments/:id/submit` - Submit score for chef
- `GET /tournaments/:id/ranking` - Get tournament ranking

## Usage Example

1. Create chefs via the Chef Management page
2. Create a tournament via the Tournaments page
3. Register chefs for the tournament
4. Submit scores for each chef
5. View the final ranking

## Technologies Used

- **Backend**: Node.js, Express.js, CORS, UUID
- **Frontend**: React, React Router, Axios, Vite
- **Testing**: Vitest, Testing Library
- **Styling**: CSS

## Development

- Backend uses in-memory storage (can be upgraded to database)
- Frontend is built with modern React hooks and functional components
- Responsive design with mobile-first approach
- Comprehensive error handling and user feedback