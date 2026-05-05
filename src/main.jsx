import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'// <--- Importamos el orquestador que armamos antes

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 
       Solo llamamos a App. 
       Adentro de App ya están el BrowserRouter, el Hero y las Sesiones.
    */}
    <App /> 
  </StrictMode>,
)