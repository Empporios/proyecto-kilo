// Importaciones necesarias para inicializar la aplicación React
// StrictMode ayuda a identificar problemas potenciales en el código durante desarrollo
import { StrictMode } from 'react'
// createRoot es la nueva API para renderizar aplicaciones React
import { createRoot } from 'react-dom/client'
// Importa los estilos globales de la aplicación
import './index.css'
// Importa el componente principal App que contiene toda la aplicación
import App from './App.jsx'

// Crea el root de React y renderiza la aplicación
// Busca el elemento con id 'root' en el HTML y lo usa como punto de montaje
createRoot(document.getElementById('root')).render(
  // Envuelve la aplicación en StrictMode para detectar problemas en desarrollo
  <StrictMode>
    // Renderiza el componente principal App que contiene toda la lógica de la aplicación
    <App />
  </StrictMode>,
)
