import React from "react";
import '../styles/Hero.css'

export const Hero = () => {
    return (
        <>
        <section className="hero">
            <div className="hero-content">
                <h2>Encontrá tu equilibrio interior</h2>
                <p>Sesiones de Reiki para armonizar tu energía y recuperar la paz que necesitás.</p>
                <button className="btn-hero">Agendar Sesión</button>
            </div>
            <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80" 
            alt="Piedras zen y equilibrio" 
            className="hero-img">
            </img>
            {/* Aquí podría ir una imagen suave a la derecha o de fondo */}
        </section>
        </>
    )
}