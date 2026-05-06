const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente'); // El modelo que definimos antes

// RUTA: Guardar un nuevo paciente
router.post('/registrar', async (req, res) => {
    try {
        const nuevoPaciente = new Paciente(req.body);
        await nuevoPaciente.save();
        res.status(201).json({ mensaje: "Paciente guardado con éxito", exito: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al guardar el paciente", exito: false });
    }
});

// RUTA: Obtener todos los pacientes (para tu futura lista)
router.get('/todos', async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener pacientes" });
    }
});

module.exports = router;