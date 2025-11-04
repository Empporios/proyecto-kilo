# API Backend - Administrador de Torneos de Cocina

API REST Node.js + Express para gestionar torneos de cocina.

## Instalación

```bash
npm install
```

## Ejecutando

```bash
npm start
```

El servidor se ejecuta en http://localhost:3000

## Endpoints de la API

### Chefs

#### POST /chefs
Crear un nuevo chef.

**Cuerpo de la Solicitud:**
```json
{
  "name": "string",
  "specialty": "string",
  "experienceYears": number
}
```

**Respuesta:** Objeto chef con ID generado

#### GET /chefs
Obtener todos los chefs.

**Respuesta:** Array de objetos chef

### Torneos

#### POST /tournaments
Crear un nuevo torneo.

**Cuerpo de la Solicitud:**
```json
{
  "name": "string",
  "location": "string",
  "maxChefs": number
}
```

**Respuesta:** Objeto torneo con ID generado

#### GET /tournaments
Obtener todos los torneos.

**Respuesta:** Array de objetos torneo

#### GET /tournaments/:id
Obtener detalles del torneo.

**Respuesta:** Objeto torneo con chefs registrados y resultados

#### POST /tournaments/:id/register
Registrar un chef para un torneo.

**Cuerpo de la Solicitud:**
```json
{
  "chefId": "string"
}
```

**Respuesta:** Mensaje de éxito

#### POST /tournaments/:id/submit
Enviar una puntuación para un chef registrado.

**Cuerpo de la Solicitud:**
```json
{
  "chefId": "string",
  "score": number (0-100)
}
```

**Respuesta:** Mensaje de éxito

#### GET /tournaments/:id/ranking
Obtener ranking del torneo ordenado por puntuación.

**Respuesta:** Array de objetos ranking con detalles del chef y puntuaciones

## Reglas de Validación

- Chef: nombre, especialidad requeridos; años de experiencia >= 0
- Torneo: nombre, ubicación requeridos; maxChefs > 0
- Puntuación: rango 0-100
- Registro: El chef debe existir, el torneo no estar lleno, el chef no registrado previamente
- Envío de puntuación: El chef debe estar registrado para el torneo

## Respuestas de Error

Todos los errores devuelven códigos de estado HTTP apropiados con mensajes de error:

- 400: Solicitud Incorrecta (errores de validación)
- 404: No Encontrado
- 500: Error Interno del Servidor

## Almacenamiento de Datos

Actualmente utiliza almacenamiento en memoria. Los datos persisten solo durante el tiempo de ejecución del servidor.