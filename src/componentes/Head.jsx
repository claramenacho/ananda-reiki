import React from "react"
import '../styles/Head.css'
import { Sparkles } from "lucide-react"

export const Head = () => {

    return (
        <>
        <header>
            <div className="logo-container">
                <h1>Ananda · Reiki & Bienestar</h1>
                <Sparkles 
                    className="simbolo-logo" 
                    size={20} 
                    strokeWidth={1.5} /* Trazo fino para que sea minimalista */
                />
                <img></img>
            </div>
            <nav>
            <ul>
                <li>
                    <h2>Inicio</h2>
                </li>
                <li>
                    <h2>¿Que es Reiki?</h2>
                </li>
                <li>
                    <h2>Seciones/ Servicios</h2>
                </li>
                <li>
                    <h2>Contacto</h2>
                </li>

            </ul>
            

            
        </nav>
        </header>
        
        </>
    )

}
