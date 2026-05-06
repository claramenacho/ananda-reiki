const mongoose = require('mongoose');

const PacienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: String, unique: true }, // Útil para no repetir pacientes
    telefono: String,
    email: String,
    fechaNacimiento: Date,
    
    // Ficha Médica / Antecedentes
    antecedentes: { type: String, default: "Ninguno" }, 
    motivoConsulta: String,
    
    // Historial de Sesiones (Un array que guarda cada visita)
    historial: [{
        fecha: { type: Date, default: Date.now },
        observaciones: String, // Lo que trabajaste en esa sesión de Reiki
        evolucion: String
    }],
    
    creadoEn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Paciente', PacienteSchema);