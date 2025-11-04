# Administrador de Torneos de Cocina

Una aplicación full-stack para gestionar torneos de cocina, construida con backend Node.js/Express y frontend React.

## Estructura del Proyecto

- `/backend` - Servidor API Node.js + Express
- `/frontend` - SPA React + Vite

## Características

- **API Backend**: Endpoints RESTful para chefs, torneos, registro, puntuación y rankings
- **SPA Frontend**: Interfaz amigable para gestionar chefs y torneos
- **Actualizaciones en Tiempo Real**: Estado consistente entre frontend y backend
- **Diseño Responsivo**: Funciona en dispositivos de escritorio y móviles
- **Validaciones de Formularios**: Validaciones del lado del cliente y servidor
- **Manejo de Errores**: Mensajes de error claros para los usuarios

## Inicio Rápido

### Prerrequisitos

- Node.js (v14 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio
2. Instala las dependencias del backend:
   ```bash
   cd backend
   npm install
   ```
3. Instala las dependencias del frontend:
   ```bash
   cd ../frontend
   npm install
   ```

### Ejecutando la Aplicación

1. Inicia el servidor backend:
   ```bash
   cd backend
   npm start
   ```
   El servidor se ejecutará en http://localhost:3000

2. Inicia el servidor de desarrollo del frontend:
   ```bash
   cd frontend
   npm run dev
   ```
   El frontend se ejecutará en http://localhost:5173

### Pruebas

Ejecuta las pruebas del frontend:
```bash
cd frontend
npm test
```

## Endpoints de la API

### Chefs
- `POST /chefs` - Crear un nuevo chef
- `GET /chefs` - Obtener todos los chefs

### Torneos
- `POST /tournaments` - Crear un nuevo torneo
- `GET /tournaments` - Obtener todos los torneos
- `GET /tournaments/:id` - Obtener detalles del torneo
- `POST /tournaments/:id/register` - Registrar chef para el torneo
- `POST /tournaments/:id/submit` - Enviar puntuación para el chef
- `GET /tournaments/:id/ranking` - Obtener ranking del torneo

## Ejemplo de Uso

1. Crea chefs a través de la página de Gestión de Chefs
2. Crea un torneo a través de la página de Torneos
3. Registra chefs para el torneo
4. Envía puntuaciones para cada chef
5. Ve el ranking final

## Tecnologías Utilizadas

- **Backend**: Node.js, Express.js, CORS, UUID
- **Frontend**: React, React Router, Axios, Vite
- **Pruebas**: Vitest, Testing Library
- **Estilos**: CSS

## Desarrollo

- El backend utiliza almacenamiento en memoria (puede actualizarse a base de datos)
- El frontend está construido con hooks modernos de React y componentes funcionales
- Diseño responsivo con enfoque mobile-first
- Manejo completo de errores y retroalimentación del usuario