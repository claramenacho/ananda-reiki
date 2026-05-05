import React from 'react';
import { Sun, Wind, Heart } from 'lucide-react';
import { Footer } from "../componentes/Footer";
import '../styles/QueEsReiki.css';

export const QueEsReiki = () => {
  return (
    <>
      <div className="reiki-page">
        {/* Encabezado de Página - Quitamos la img de aquí */}
        <header className="reiki-header">
          <h1>Sanación a través de la energía</h1>
          <p>Una guía para entender esta disciplina milenaria de armonización.</p>
        </header>

        {/* Sección 1: Definición con imagen lateral */}
        <section className="reiki-intro">
          <div className="reiki-container">
            <div className="reiki-text">
              <h2>¿Qué es el Reiki?</h2>
              <p>
                El Reiki es una técnica japonesa de canalización de energía a través de la imposición de manos. 
                Su objetivo es promover la autosanación, equilibrando los centros energéticos (chakras) para 
                restaurar el bienestar físico, mental y emocional.
              </p>
              <p>
                No es una religión ni requiere un sistema de creencias; es una herramienta práctica y 
                gentil para reducir el estrés y la ansiedad.
              </p>
            </div>
            <div className="reiki-image">
              <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80" alt="Sesión de Reiki" />
            </div>
          </div>
        </section>

        {/* Sección 2: Beneficios */}
        <section className="reiki-benefits">
          <div className="benefits-grid">
            <div className="benefit-card">
              <Sun size={32} strokeWidth={1} />
              <h3>Claridad Mental</h3>
              <p>Ayuda a disipar la bruma mental y a tomar decisiones desde un lugar de calma.</p>
            </div>
            <div className="benefit-card">
              <Wind size={32} strokeWidth={1} />
              <h3>Liberación Emocional</h3>
              <p>Permite soltar bloqueos y cargas que acumulamos en el día a día.</p>
            </div>
            <div className="benefit-card">
              <Heart size={32} strokeWidth={1} />
              <h3>Vitalidad Física</h3>
              <p>Fortalece el sistema inmune al reducir los niveles de cortisol y estrés.</p>
            </div>
          </div>
        </section>
      </div>

      {/* SECCIÓN DE ADVERTENCIA PROFESIONAL */}
      <section className="reiki-disclaimer">
        <div className="disclaimer-container">
          <p>
            <strong>Importante:</strong> La técnica de Reiki es una terapia complementaria que busca el equilibrio energético y bienestar integral. No reemplaza la consulta, diagnóstico o tratamiento médico especializado.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
};