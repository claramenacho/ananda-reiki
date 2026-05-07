import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker'; // Notá las llaves { }
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale/es'; // Esto es para el idioma español
import '../styles/ModalTurnos.css';

registerLocale('es', es);

export const ModalTurnos = ({ alCerrar }) => {
  
  const [datosTurno, setDatosTurno] = useState({
    nombre: '',
    email: '',
    preferencia: '',
    mensaje: '',
    fecha: new Date()
  });

  const handleChange = (e) => {
    if (e.target.name === 'fecha') {
        const fechaSeleccionada = new Date(e.target.value);
        const dia = fechaSeleccionada.getUTCDay(); // Obtenemos el número de día

        // Verificamos si es Lunes (1), Martes (2) o Jueves (4)
        if (dia !== 1 && dia !== 2 && dia !== 4) {
        alert("Lo siento, solo atiendo los días Lunes, Martes y Jueves.");
        e.target.value = ''; // Limpiamos el campo
        return;
        }
    }
    
    setDatosTurno({
        ...datosTurno,
        [e.target.name]: e.target.value
    });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      // CAMBIÁ LA LÍNEA DE ABAJO: Usamos backticks `` y ${baseURL}
      const respuesta = await fetch(`${baseURL}/api/turnos`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosTurno)
      });

      if (respuesta.ok) {
        alert("¡Turno solicitado con éxito! Me contactaré pronto.");
        alCerrar(); 
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al conectar con el servidor.");
    }
  };
  const esDiaLaboral = (date) => {
    const day = date.getDay();
    // Solo permite Lunes (1), Martes (2) y Jueves (4)
    return day === 1 || day === 2 || day === 4;
    };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Solicitar Turno</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Nombre</label>
                <input 
                type="text" 
                name="nombre" // Coincide con tu Schema
                onChange={handleChange} 
                required 
                />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input 
                type="email" 
                name="email" // Coincide con tu Schema
                onChange={handleChange} 
                required 
                />
            </div>
            {/* Borrá el div anterior y dejá solo este */}
            <div className="form-group">
                <label>Elegí un día (Lunes, Martes o Jueves)</label>
                <DatePicker
                    locale="es"
                    selected={datosTurno.fecha}
                    onChange={(date) => setDatosTurno({...datosTurno, fecha: date})}
                    filterDate={esDiaLaboral}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Tocá para elegir"
                    className="input-custom" // Luego le damos estilo en CSS
                    required
                />
            </div>

            <div className="form-group">
                <label>Preferencia Horaria</label>
                <select name="preferencia" onChange={handleChange} required>
                <option value="">Seleccioná una opción</option>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
                </select>
            </div>

            <div className="form-group">
                <label>Mensaje (opcional)</label>
                <textarea name="mensaje" onChange={handleChange}></textarea>
            </div>

            <div className="modal-buttons">
                <button type="submit" className="btn-confirmar">Solicitar Turno</button>
                <button type="button" onClick={alCerrar} className="btn-cancelar">Cerrar</button>
            </div>
            </form>
      </div>
    </div>
  );
};