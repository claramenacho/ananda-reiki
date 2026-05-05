const mongoose = require('mongoose');

const ContactoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  mensaje: { type: String, required: true }
}, { timestamps: true }); // Esto anota la fecha solo, como un sello de mesa de entradas.

module.exports = mongoose.model('Contacto', ContactoSchema);