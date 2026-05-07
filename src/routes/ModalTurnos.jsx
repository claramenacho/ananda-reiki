import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale/es';
import '../styles/ModalTurnos.css';

registerLocale('es', es);

export const ModalTurnos = ({ alCerrar }) => {
    const [horariosOcupados, setHorariosOcupados] = useState([]);
    const [datosTurno, setDatosTurno] = useState({
        nombre: '',
        email: '',
        preferencia: '',
        mensaje: '',
        fecha: new Date(),
        servicio: 'Armonización Integral'
    });

    const HORARIOS_POR_DIA = {
        1: ["16:00", "17:00", "18:00", "19:00"], // Lunes
        2: ["09:00", "10:00", "11:00"],           // Martes
        4: ["09:00", "10:00", "11:00"]            // Jueves
    };

    // --- FUNCIONES DE LÓGICA ---

    const esDiaLaboral = (date) => {
        const day = date.getDay();
        return day === 1 || day === 2 || day === 4;
    };

    const verificarDisponibilidad = async (fechaSeleccionada) => {
        try {
            const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const fechaISO = fechaSeleccionada.toISOString().split('T')[0];
            
            const respuesta = await fetch(`${baseURL}/api/turnos/ocupados?fecha=${fechaISO}`);
            const ocupados = await respuesta.json(); 
            setHorariosOcupados(ocupados);
        } catch (error) {
            console.error("Error verificando disponibilidad:", error);
        }
    };

    const obtenerHorariosDisponibles = () => {
        const dia = datosTurno.fecha.getDay();
        const todosLosHorarios = HORARIOS_POR_DIA[dia] || [];
        return todosLosHorarios.filter(hora => !horariosOcupados.includes(hora));
    };

    const handleChange = (e) => {
        setDatosTurno({
            ...datosTurno,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
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

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Solicitar Turno</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input type="text" name="nombre" onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Elegí un día (Lunes, Martes o Jueves)</label>
                        <DatePicker
                            locale="es"
                            selected={datosTurno.fecha}
                            onChange={(date) => {
                                setDatosTurno({...datosTurno, fecha: date, preferencia: ''});
                                verificarDisponibilidad(date); 
                            }}
                            filterDate={esDiaLaboral}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            className="input-custom"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Horarios disponibles</label>
                        <select 
                            name="preferencia" 
                            value={datosTurno.preferencia} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">Seleccioná un horario</option>
                            {obtenerHorariosDisponibles().map((hora) => (
                                <option key={hora} value={hora}>
                                    {hora} hs
                                </option>
                            ))}
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