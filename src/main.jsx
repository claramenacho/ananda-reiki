import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Head } from './componentes/Head'
import { Hero } from './componentes/Hero'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Head/>
    <Hero />
  
  </StrictMode>,
)
