import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin } from 'lucide-react';
import '../styles/Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Columna 1: Marca */}
        <div className="footer-brand">
          <h2 className="footer-logo">Ananda</h2>
          <p>Reiki & Bienestar</p>
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a href="mailto:hola@ananda.com">
              <Mail size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Columna 2: Navegación */}
        <div className="footer-nav">
          <h4>Explorá</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/que-es-reiki">¿Qué es Reiki?</Link></li>
            <li><Link to="/sesiones">Sesiones</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        {/* Columna 3: Info */}
        <div className="footer-info">
          <h4>Ubicación</h4>
          <div className="info-item">
            <MapPin size={16} color="#83bca9" />
            <span>La Plata, Buenos Aires- Argentina</span>
          </div>
          <p className="footer-tagline">Sanación consciente a tu alcance.</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ananda. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};