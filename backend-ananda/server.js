require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Contacto = require('./models/Contacto');
const Turno = require('./models/Turno');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs'); 
const crypto = require('crypto');
const User = require('./models/User');// Asegurate de tener el modelo en su archivo


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
app.get('/api/turnos', async (req, res) => {
  try {
    // 1. Buscamos todos los turnos guardados en la base de datos
    // Usamos .sort({ fecha: 1 }) para que aparezcan ordenados por fecha próxima
    const turnos = await Turno.find().sort({ fecha: 1 });
    // 2. Si todo sale bien, respondemos con el array de turnos
    res.status(200).json(turnos);
  } catch (error) {
    // 3. Si hay un error de conexión, avisamos qué pasó
    console.error("Error al obtener los turnos:", error);
    res.status(500).json({ mensaje: "Error al obtener la lista de turnos" });
  }
});
// Ruta para eliminar un turno por su ID
app.delete('/api/turnos/:id', async (req, res) => {
    try {
        const { id } = req.params; // Capturamos el ID que viene en la URL
        await Turno.findByIdAndDelete(id); // La magia de Mongoose para borrarlo
        res.status(200).json({ mensaje: "Turno eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar:", error);
        res.status(500).json({ mensaje: "No se pudo eliminar el turno" });
    }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Tu mail de Ananda
    pass: process.env.EMAIL_PASS  // Tu contraseña de aplicación
  }
});
// Ruta para agregar una nueva sesión al historial de un paciente
app.patch('/api/pacientes/:id/nueva-sesion', async (req, res) => {
    try {
        const { id } = req.params;
        const nuevaSesion = req.body; // Aquí vienen las notas de la sesión

        // Buscamos al paciente y "empujamos" (push) la sesión al array historial
        const pacienteActualizado = await Paciente.findByIdAndUpdate(
            id,
            { $push: { historial: nuevaSesion } },
            { new: true } // Para que nos devuelva el paciente con la sesión ya agregada
        );

        if (!pacienteActualizado) {
            return res.status(404).json({ mensaje: "Paciente no encontrado" });
        }

        res.status(200).json({ mensaje: "Sesión registrada con éxito", paciente: pacienteActualizado });
    } catch (error) {
        console.error("Error al registrar sesión:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});
// Ruta para actualizar los antecedentes (Historia Clínica Inicial)
// Ruta para actualizar los antecedentes (Historia Clínica Inicial)
// Agregamos /api/pacientes al principio para que coincida con el Frontend
app.patch('/api/pacientes/:id/hc-inicial', async (req, res) => {
    try {
        const { antecedentes } = req.body;
        
        // Buscamos al paciente y actualizamos solo el objeto 'antecedentes'
        const pacienteActualizado = await Paciente.findByIdAndUpdate(
            req.params.id,
            { $set: { antecedentes: antecedentes } },
            { new: true } 
        );

        if (!pacienteActualizado) {
            return res.status(404).json({ mensaje: "Paciente no encontrado" });
        }

        res.json(pacienteActualizado);
    } catch (error) {
        console.error("Error al guardar HC:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});
// Ruta para OBTENER las consultas (la que te estaba faltando)
app.get('/api/contacto', async (req, res) => {
    try {
        // Buscamos todos los mensajes de contacto guardados
        const consultas = await Contacto.find().sort({ createdAt: -1 }); // Las más nuevas primero
        res.status(200).json(consultas);
    } catch (error) {
        console.error("Error al obtener consultas:", error);
        res.status(500).json({ mensaje: "No se pudieron cargar las consultas" });
    }
});
// Ruta: POST /api/auth/reset-password/:token
app.post('/reset-password/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        // Buscamos al usuario que tenga ese token y que no haya expirado
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() } // $gt significa "greater than" (mayor que)
        });

        if (!user) {
            return res.status(400).json({ mensaje: "El link es inválido o expiró." });
        }

        // Encriptamos la nueva clave
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Limpiamos los campos de recuperación
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.json({ mensaje: "Contraseña actualizada correctamente." });

    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor." });
    }
});
// Ruta para registrar al administrador (vos)
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Contamos cuántos usuarios existen en total
        const usuariosTotales = await User.countDocuments();

        // 2. Si ya hay al menos uno, prohibimos el registro público
        if (usuariosTotales > 0) {
            return res.status(403).json({ 
                mensaje: "El sistema ya tiene un dueño configurado. El registro público está cerrado." 
            });
        }

        // 3. Si no hay nadie, procedemos a crear el primer Administrador
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const nuevoUsuario = new User({
            email,
            password: passwordHash,
            rol: 'admin' // Le asignamos el rango de jefe
        });

        await nuevoUsuario.save();
        res.status(201).json({ mensaje: "¡Dueño registrado con éxito!", exito: true });

    } catch (error) {
        res.status(500).json({ mensaje: "Error al configurar el administrador." });
    }
});

// 2. RUTA PARA PEDIR EL MAIL (La que te faltaba)
app.post('/api/auth/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // Generamos el token de seguridad
        const token = crypto.randomBytes(20).toString('hex');
        
        // Guardamos en el "expediente" del usuario en MongoDB
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora de vida
        await user.save();

        // Enviamos el mail con el link dinámico
        const resetLink = `http://localhost:5173/reset-password/${token}`;
        
        await transporter.sendMail({
            from: '"Ananda Reiki" <tu-mail@gmail.com>',
            to: user.email,
            subject: 'Recuperación de contraseña',
            html: `<h1>Ananda</h1><p>Hacé click <a href="${resetLink}">acá</a> para resetear tu clave.</p>`
        });

        res.json({ mensaje: "Mail enviado con éxito" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al procesar la solicitud" });
    }
});

// 3. TU RUTA DE RESET-PASSWORD (Cambiando 'router' por 'app')
app.post('/api/auth/reset-password/:token', async (req, res) => {
    // ... acá va la lógica que ya escribiste para bcrypt y actualizar el usuario ...
});
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscamos si el mail existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ mensaje: "Usuario o contraseña incorrectos" });
        }

        // 2. Comparamos la clave que escribiste con la encriptada en la base de datos
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ mensaje: "Usuario o contraseña incorrectos" });
        }

        // 3. Si todo está ok, avisamos al Frontend
        res.json({ mensaje: "¡Bienvenida, Maria!", exito: true });

    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

// Importamos el modelo de Paciente (asegurante de que el archivo models/Paciente existe)
const Paciente = require('./models/Paciente');

// Ruta para registrar un paciente nuevo
app.post('/api/pacientes/registrar', async (req, res) => {
    try {
        const nuevoPaciente = new Paciente(req.body);
        await nuevoPaciente.save();
        res.status(201).json({ mensaje: "Paciente guardado con éxito", exito: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al guardar el paciente" });
    }
});

// Ruta para ver todos los pacientes
app.get('/api/pacientes/todos', async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener pacientes" });
    }
});

app.listen(5000, () => console.log('🚀 Servidor en puerto 5000'));