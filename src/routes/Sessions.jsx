import React, { useState } from 'react';
import { Wind, Send, Sparkles } from 'lucide-react';
import { sesionesData } from '../componentes/servicios.js';
import { Footer } from '../componentes/Footer.jsx';
import { ModalTurnos } from './ModalTurnos.jsx';
import "../styles/session.css";

// ... (tus imports iguales)

export const Sessions = () => {
  const [seleccionada, setSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <section className="sessions-section">
      <div className="sessions-header">
        <h2>Nuestras Sesiones</h2>
        <p>Elegí el camino que mejor resuene con tu momento actual.</p>
      </div>

      <div className="sessions-grid">
        {sesionesData.map((sesion) => (
          <div 
            key={sesion.id} 
            className="session-card"
            onClick={() => setSeleccionada(sesion)}
          >
            <div className="icon-container">
               {sesion.icono === "Wind" && <Wind size={32} strokeWidth={1.2} />}
               {sesion.icono === "Send" && <Send size={32} strokeWidth={1.2} />}
               {sesion.icono === "Sparkles" && <Sparkles size={32} strokeWidth={1.2} />}
            </div>
            <h3>{sesion.titulo}</h3>
            <p>{sesion.descripcion}</p>
            <span className="duration">{sesion.duracion}</span>
          </div>
        ))}
      </div>

      {seleccionada && (
        <div className="session-detail-container">
          <div className="detail-content">
            <img 
              src={seleccionada.imagen} 
              alt={seleccionada.titulo} 
              className="detail-img" 
            />

            <div className="detail-info">
              <div className="info-header">
                <h3>{seleccionada.titulo}</h3>
                <span className="duration-tag">{seleccionada.duracion}</span>
              </div>

              {/* El beneficio corto con el icono arriba */}
              <div className="benefits-list">
                <div className="benefit-item">
                  <Sparkles size={16} color="#83bca9" />
                  <span>Armonización energética profunda</span>
                </div>
              </div>

              {/* La descripción detallada justo donde la querías */}
              <p className="detailed-text">
                {seleccionada.descripcionDetallada}
              </p>

              <div className="action-buttons">
                <button className="btn-consultar"onClick={() => setShowModal(true)}>Consultar Turno</button>
                <button className="btn-close-detail" onClick={() => setSeleccionada(null)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
    {showModal && <ModalTurnos alCerrar={() => setShowModal(false)} />}
    <Footer />
    </>
  );
};