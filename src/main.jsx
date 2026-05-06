import React from 'react'
import { createRoot } from 'react-dom/client' // Esta es la forma moderna
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// En lugar de ReactDOM.render, usamos createRoot
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)