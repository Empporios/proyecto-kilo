# Frontend - Cooking Tournament Manager

React SPA for managing cooking tournaments, built with Vite.

## Installation

```bash
npm install
```

## Running

```bash
npm run dev
```

Frontend runs on http://localhost:5173

## Building

```bash
npm run build
npm run preview
```

## Testing

```bash
npm test
```

## Pages

### Home (/)
- Welcome page with navigation links

### Tournaments (/tournaments)
- List all tournaments with registration status
- Create new tournaments
- Link to tournament details

### Tournament Detail (/tournaments/:id)
- Tournament information
- List of registered chefs with scores
- Register new chefs
- Submit scores for registered chefs
- View final ranking

### Chef Management (/chefs)
- Create new chefs
- List all existing chefs

## Features

- **Responsive Design**: Works on desktop and mobile
- **Form Validation**: Client-side validation with error messages
- **Loading States**: Indicators during API calls
- **Error Handling**: User-friendly error messages
- **Real-time Updates**: State synchronized with backend

## Technologies

- React 19
- React Router DOM
- Axios for API calls
- Vite for build tooling
- Vitest for testing
- Testing Library
- CSS for styling

## API Integration

Communicates with backend API at http://localhost:3000

All CRUD operations for chefs and tournaments are supported with proper error handling.
