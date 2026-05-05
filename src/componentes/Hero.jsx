import React from "react";
import { Link } from "react-router-dom"; 
import { Leaf, Heart, ShieldCheck } from 'lucide-react';
import { Footer } from "./Footer";
import '../styles/Hero.css'

export const Hero = () => {
    return (
    <>    
        <section className="hero">
            <div className="hero-content">
                <h2>Encontrá tu equilibrio interior</h2>
                <p>Sesiones de Reiki para armonizar tu energía y recuperar la paz que necesitás.</p>
                
                {/* 2. Cambiamos button por Link y agregamos 'to' */}
                <Link to="/reiki" className="btn-hero">
                    Agendar Sesión
                </Link>
            </div>
            
        </section>
        <section className="features-section">
            <div className="features-container">
                <div className="feature-item">
                    <div className="feature-icon-wrapper">
                        <Leaf size={40} strokeWidth={1} />
                    </div>
                    <h3>Bienestar Natural</h3>
                    <p>Técnicas milenarias para sanar de forma orgánica y consciente.</p>
                </div>

                <div className="feature-item">
                    <div className="feature-icon-wrapper">
                        <Heart size={40} strokeWidth={1} />
                    </div>
                    <h3>Acompañamiento</h3>
                    <p>Un espacio seguro diseñado para tu proceso personal de sanación.</p>
                </div>

                <div className="feature-item">
                    <div className="feature-icon-wrapper">
                        <ShieldCheck size={40} strokeWidth={1} />
                    </div>
                    <h3>Paz Mental</h3>
                    <p>Bajá las revoluciones y reconectá con tu silencio interior.</p>
                </div>
            </div>
        </section>
        {/* NUEVA SECCIÓN: Cierre de Inicio */}
        <section className="quote-section">
            <div className="quote-content">
                <span className="quote-badge">Tu momento es ahora</span>
                <h3>"La paz interior empieza en el momento en que decides no permitir que otra persona o evento controle tus emociones."</h3>
                <p>En Ananda, te acompaño a redescubrir esa calma que ya habita en vos.</p>
                <Link to="/contacto" className="btn-secondary">
                    Hacé tu consulta
                </Link>
            </div>
        </section>
        <Footer />
        
    </>
    );
};