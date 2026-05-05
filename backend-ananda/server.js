require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Contacto = require('./models/Contacto');
const Turno = require('./models/Turno')

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a tu MongoDB local
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a tu MongoDB local'))
  .catch((err) => console.error('❌ Error de conexión:', err));

// Ruta para recibir el formulario
app.post('/api/contacto', async (req, res) => {
  try {
    const nuevoContacto = new Contacto(req.body);
    await nuevoContacto.save();
    res.status(201).json({ message: '¡Mensaje guardado en tu PC!' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo guardar el mensaje' });
  }
});

app.post('/api/turnos', async (req, res) => {
    try {
        const nuevoTurno = new Turno(req.body);
        await nuevoTurno.save();
        res.status(201).json({ message: '¡Turno agendado!'});
    } catch (error) {
        res.status(500).json({ error: 'No se guardo el turno' });
    }
});

app.listen(5000, () => console.log('🚀 Servidor en puerto 5000'));