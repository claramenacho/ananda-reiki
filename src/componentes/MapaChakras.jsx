import React from 'react';

// Definimos los colores estándar para cada estado
const coloresEstado = {
    'Armónico': '#83bca9',   // Tu verde Ananda (Sano/Equilibrado)
    'Bloqueado': '#e57373',   // Rojo suave (Falta de energía)
    'Hiperactivo': '#fff176', // Amarillo brillante (Exceso de energía)
    'No Evaluado': '#e0e0e0'  // Gris (Predeterminado)
};

export const MapaChakras = ({ chakras }) => {

    // Función auxiliar para obtener el color de un chakra por su nombre
    const obtenerColorChakra = (nombreChakra) => {
        // Buscamos el chakra en el array que nos pasan
        const chakraInfo = chakras.find(c => c.nombre.includes(nombreChakra));
        
        // Si lo encontramos y tiene un estado válido, devolvemos su color
        if (chakraInfo && coloresEstado[chakraInfo.estado]) {
            return coloresEstado[chakraInfo.estado];
        }
        
        // Color por defecto si no hay info
        return coloresEstado['No Evaluado'];
    };

    return (
        <div className="mapa-chakras-container animate-fadeIn">
            {/* Silueta humana minimalista en SVG */}
            <svg viewBox="0 0 100 200" className="silueta-svg">
                {/* Cuerpo humano (forma básica) */}
                <path 
                    d="M50,10 C60,10 70,20 70,35 C70,50 60,60 50,60 C40,60 30,50 30,35 C30,20 40,10 50,10 Z 
                       M50,60 C30,60 20,80 20,110 L20,190 C20,195 25,200 30,200 L70,200 C75,200 80,195 80,190 L80,110 C80,80 70,60 50,60 Z" 
                    fill="#f4fcfb" // Un fondo muy suave verde-crema
                    stroke="#e0eadd" // Borde suave
                    strokeWidth="1"
                />

                {/* --- CHAKRAS DINÁMICOS --- */}
                {/* Explicación: 'fill' usa la función para cambiar el color en tiempo real */}
                
                {/* 7. Corona (Violeta) */}
                <circle cx="50" cy="20" r="6" fill={obtenerColorChakra('Corona')} stroke="white" strokeWidth="1.5">
                    <title>7. Corona</title>
                </circle>
                
                {/* 6. Tercer Ojo (Índigo) */}
                <circle cx="50" cy="40" r="6" fill={obtenerColorChakra('Tercer Ojo')} stroke="white" strokeWidth="1.5">
                    <title>6. Tercer Ojo</title>
                </circle>
                
                {/* 5. Garganta (Azul Cielo) */}
                <circle cx="50" cy="65" r="6" fill={obtenerColorChakra('Garganta')} stroke="white" strokeWidth="1.5">
                    <title>5. Garganta</title>
                </circle>
                
                {/* 4. Corazón (Verde) */}
                <circle cx="50" cy="90" r="6" fill={obtenerColorChakra('Corazón')} stroke="white" strokeWidth="1.5">
                    <title>4. Corazón</title>
                </circle>
                
                {/* 3. Plexo Solar (Amarillo) */}
                <circle cx="50" cy="115" r="6" fill={obtenerColorChakra('Plexo Solar')} stroke="white" strokeWidth="1.5">
                    <title>3. Plexo Solar</title>
                </circle>
                
                {/* 2. Sacro (Naranja) */}
                <circle cx="50" cy="140" r="6" fill={obtenerColorChakra('Sacro')} stroke="white" strokeWidth="1.5">
                    <title>2. Sacro</title>
                </circle>
                
                {/* 1. Raíz (Rojo) */}
                <circle cx="50" cy="165" r="6" fill={obtenerColorChakra('Raíz')} stroke="white" strokeWidth="1.5">
                    <title>1. Raíz</title>
                </circle>
            </svg>

            {/* Leyenda sutil de colores */}
            <div className="leyenda-mapa">
                <span style={{color: coloresEstado['Armónico']}}>● Armónico</span>
                <span style={{color: coloresEstado['Bloqueado']}}>● Bloqueado</span>
                <span style={{color: coloresEstado['Hiperactivo']}}>● Hiperactivo</span>
            </div>
        </div>
    );
};