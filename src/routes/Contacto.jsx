import React, { useState } from 'react';
import { Mail, MessageCircle, MapPin, Send } from 'lucide-react';
import { Footer } from "../componentes/Footer";
import '../styles/Contacto.css';

export const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    alert("¡Gracias por tu mensaje! Te contactaré pronto.");
  };

  return (
    <>
      <div className="contacto-page">
        <header className="contacto-header">
          <h1>Ponete en contacto</h1>
          <p>¿Tenés alguna duda sobre las sesiones? Escribime y charlamos.</p>
        </header>

        <section className="contacto-container">
          {/* Información de contacto */}
          <div className="contacto-info">
            <div className="info-item">
                <div className="info-icon-wrapper">
                <Mail className="info-icon" size={24} />
                </div>
                <div>
                <h3>Email</h3>
                <p>hola@anandareiki.com</p>
                </div>
            </div>

            <div className="info-item">
                <div className="info-icon-wrapper">
                <MessageCircle className="info-icon" size={24} />
                </div>
                <div>
                <h3>WhatsApp</h3>
                <p>+54 221 123-4567</p>
                </div>
            </div>

            <div className="info-item">
                <div className="info-icon-wrapper">
                <MapPin className="info-icon" size={24} />
                </div>
                <div>
                <h3>Ubicación</h3>
                <p>La Plata, Buenos Aires</p>
                </div>
            </div>
            </div>

          {/* Formulario Estilo Glassmorphism */}
          <form className="contacto-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input 
                type="text" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange} 
                placeholder="Tu nombre completo"
                required 
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="tu@email.com"
                required 
              />
            </div>
            <div className="form-group">
              <label>Mensaje</label>
              <textarea 
                name="mensaje" 
                value={formData.mensaje} 
                onChange={handleChange} 
                placeholder="¿En qué puedo ayudarte?"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-submit">
              Enviar Mensaje <Send size={18} />
            </button>
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
};