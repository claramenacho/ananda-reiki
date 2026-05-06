import React from "react"
import '../styles/Head.css'
import { Sparkles } from "lucide-react"
import { NavLink } from 'react-router-dom'; // <--- Cambiamos Link por NavLink

export const Head = () => {
    // Definimos una función pequeñita para no repetir código en cada li
    const activeClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

    return (
        <header>
            <div className="logo-container">
                <h1>Ananda · Reiki & Bienestar</h1>
                <Sparkles 
                    className="simbolo-logo" 
                    size={20} 
                    strokeWidth={1.5} 
                />
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" className={activeClass}>Inicio</NavLink>
                    </li>
                    <li>
                        <NavLink to="/queesreiki" className={activeClass}>¿Qué es Reiki?</NavLink>
                    </li>
                    <li>
                        <NavLink to="/reiki" className={activeClass}>Sesiones</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contacto" className={activeClass}>Contacto</NavLink>
                    </li>
                    <li>
                        <NavLink to="/adminturnos" className={activeClass}>Iniciar Sesion</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}