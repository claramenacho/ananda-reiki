const mongoose = require('mongoose');

const TurnoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    servicio: { type: String, default: 'Armonización Integral' }, // Para saber qué eligieron
    preferencia: { type: String, required: true }, // Ejemplo: "Mañana" o "Tarde"
    mensaje: { type: String },
    fechaSolicitud: { type: Date, default: Date.now } // Se anota solo cuando llega
}); 

module.exports = mongoose.model('Turno', TurnoSchema);