import React, { useState } from 'react';
import { X, Save, User, CreditCard, Phone, MapPin, ClipboardList } from 'lucide-react';
// Quitamos el import de HistoriaClinica de aquí porque ya no se usa en el modal

export const ModalNuevoPaciente = ({ isOpen, onClose, onActualizar }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        telefono: '',
        direccion: '',
        antecedentes: {
            motivoConsulta: '',
            enfermedades: '',
            medicacion: '',
            calidadSueno: '',
            nivelEstres: 5
        }
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/pacientes/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                alert("¡Paciente registrado con éxito!");
                onActualizar();
                
                // Preguntamos si quiere ir a la HC ahora
                const quiereCargarHC = window.confirm("¿Deseas completar la Historia Clínica ahora?");
                if (quiereCargarHC) {
                    // Aquí usamos el ID que nos devolvió el backend
                    // Si usas React Router, sería algo como: navigate(`/paciente/${data._id}`)
                    console.log("Redirigiendo al paciente:", data._id);
                    // Por ahora, solo cerramos y notificamos
                }
                onClose();
            }
        } catch (error) {
            console.error("Error al registrar:", error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content animate-pop">
                <div className="modal-header">
                    <h3><User size={20} /> Alta Rápida de Paciente</h3>
                    <button onClick={onClose} className="btn-close"><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-grid">
                        <div className="input-group">
                            <label>Nombre</label>
                            <input type="text" name="nombre" required onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>Apellido</label>
                            <input type="text" name="apellido" onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label><CreditCard size={14} /> DNI</label>
                            <input type="number" name="dni" required onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label><Phone size={14} /> Teléfono</label>
                            <input type="text" name="telefono" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="input-group full-width">
                        <label><MapPin size={14} /> Dirección</label>
                        <input type="text" name="direccion" onChange={handleChange} />
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancelar">Cancelar</button>
                        <button type="submit" className="btn-guardar">
                            <Save size={18} /> Registrar y Continuar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};