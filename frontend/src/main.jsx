import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// 1. Importa el componente App (el que tiene las rutas) que vimos antes.
import App from './App.jsx'

// 2. Esta es la línea clave: busca en el HTML (seguro en index.html)
//    un elemento que tenga el id="root".
createRoot(document.getElementById('root'))
  
// 3. Y le dice a React: "Okey, dibuja (renderiza) el componente <App> 
//    DENTRO de ese <div id="root">".
  .render(
    // StrictMode es como un "ayudante" de React.
    // No se ve en la web final, pero te tira avisos en la consola 
    // si estás usando código viejo o haciendo algo que podría dar problemas.
    <StrictMode>
      <App />
    </StrictMode>,
  )