# Frontend - Administrador de Torneos de Cocina

SPA React para gestionar torneos de cocina, construida con Vite.

## Instalación

```bash
npm install
```

## Ejecutando

```bash
npm run dev
```

El frontend se ejecuta en http://localhost:5173

## Construyendo

```bash
npm run build
npm run preview
```

## Pruebas

```bash
npm test
```

## Páginas

### Inicio (/)
- Página de bienvenida con enlaces de navegación

### Torneos (/tournaments)
- Lista todos los torneos con estado de registro
- Crear nuevos torneos
- Enlace a detalles del torneo

### Detalle del Torneo (/tournaments/:id)
- Información del torneo
- Lista de chefs registrados con puntuaciones
- Registrar nuevos chefs
- Enviar puntuaciones para chefs registrados
- Ver ranking final

### Gestión de Chefs (/chefs)
- Crear nuevos chefs
- Listar todos los chefs existentes

## Características

- **Diseño Responsivo**: Funciona en escritorio y móvil
- **Validación de Formularios**: Validación del lado del cliente con mensajes de error
- **Estados de Carga**: Indicadores durante llamadas a la API
- **Manejo de Errores**: Mensajes de error amigables para el usuario
- **Actualizaciones en Tiempo Real**: Estado sincronizado con el backend

## Tecnologías

- React 19
- React Router DOM
- Axios para llamadas a la API
- Vite para herramientas de construcción
- Vitest para pruebas
- Testing Library
- CSS para estilos

## Integración con API

Se comunica con la API del backend en http://localhost:3000

Todas las operaciones CRUD para chefs y torneos están soportadas con manejo adecuado de errores.
