const mongoose = require('mongoose');

// 1. Definimos el esquema de la sesión (CON TODOS LOS CAMPOS NUEVOS)
const SesionSchema = new mongoose.Schema({
    fecha: { type: Date, default: Date.now },
    observaciones: { type: String, required: true },
    byosen: {
        cabeza: String,
        garganta: String,
        corazon: String,
        plexo: String,
        sacroRaiz: String
    },
    chakras: [
        {
            nombre: String,
            estado: String,
            obs: String
        }
    ],
    recomendaciones: String,    // Consejos, cristales, ejercicios
    medicacionSugerida: String, // Flores de Bach, hierbas, etc.
    tratamientoFinalizado: { type: Boolean, default: false }
});

// 2. Definimos el esquema del Paciente
const PacienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: String,
    dni: { type: String, required: true, unique: true },
    ocupacion: String,
    telefono: String,
    email: String,
    direccion: String,
    
    // Lo que cargamos en el componente HistoriaClinica.jsx
    antecedentes: {
        enfermedades: String,
        medicacion: String,
        calidadSueno: String,
        nivelEstres: { type: Number, min: 1, max: 10 },
        motivoConsulta: String
    },

    aceptaConsentimiento: { type: Boolean, default: false },
    
    // IMPORTANTE: Cambiamos "historial" por "sesiones" si es que en tu React usas paciente.sesiones
    sesiones: [SesionSchema] 
}, { timestamps: true });

// 3. Exportamos el modelo (UNA SOLA VEZ)
module.exports = mongoose.model('Paciente', PacienteSchema);