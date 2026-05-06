import React, { useState, useEffect } from 'react';
import { UserPlus, Search, FileText } from 'lucide-react';
import { ModalNuevoPaciente } from './ModalNuevoPaciente';
import { FichaPaciente } from './FichaPacientes';
import "../styles/admin-components.css";

export const Pacientes = () => {
    const [pacientes, setPacientes] = useState([]);
    const [busqueda, setBusqueda] = useState(""); // Estado para el buscador
    const [modalAbierto, setModalAbierto] = useState(false);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

    // 1. Función para traer datos del servidor
    const cargarPacientes = () => {
        fetch('http://localhost:5000/api/pacientes/todos')
            .then(res => res.json())
            .then(data => {
                setPacientes(data);
                // Si hay un paciente seleccionado, actualizamos su info específica
                if (pacienteSeleccionado) {
                    const actualizado = data.find(p => p._id === pacienteSeleccionado._id);
                    setPacienteSeleccionado(actualizado);
                }
            })
            .catch(err => console.error("Error al cargar pacientes:", err));
    };

    // 2. Carga inicial apenas entra a la sección
    useEffect(() => { 
        cargarPacientes(); 
    }, []);

    // 3. Filtrado en tiempo real para el buscador
    const pacientesFiltrados = pacientes.filter(p => 
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        p.dni.toString().includes(busqueda)
    );

    // 4. Vista de la Ficha (Retorno temprano)
    if (pacienteSeleccionado) {
        return (
            <FichaPaciente 
                paciente={pacienteSeleccionado} 
                onVolver={() => setPacienteSeleccionado(null)}
                onActualizar={cargarPacientes} 
            />
        );
    }

    return (
        <div className="pacientes-section">
            <div className="pacientes-header">
                <div className="header-top">
                    <h2>Historial de Pacientes</h2>
                    <button 
                        className="btn-nuevo-paciente" 
                        onClick={() => setModalAbierto(true)}
                    >
                        <UserPlus size={20} /> Nuevo Paciente
                    </button>
                </div>
                
                <div className="buscador-wrapper">
                    <Search size={18} color="#83bca9" />
                    <input 
                        type="text" 
                        placeholder="Buscar por nombre o DNI..." 
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)} // Conecta el input al estado
                    />
                </div>
            </div>

            <div className="pacientes-grid">
                {pacientesFiltrados.map(p => (
                    <div key={p._id} className="tarjeta-paciente">
                        <div className="info-principal">
                            <h3>{p.nombre} {p.apellido}</h3>
                            <p className="dni-text">DNI: {p.dni}</p>
                        </div>
                        <button 
                            className="btn-ver-ficha" 
                            title="Ver Historia Clínica"
                            onClick={() => setPacienteSeleccionado(p)}
                        >
                            <FileText size={20} />
                            <span>Ficha</span>
                        </button>
                    </div>
                ))}
            </div>

            <ModalNuevoPaciente 
                isOpen={modalAbierto} 
                onClose={() => setModalAbierto(false)} 
                onActualizar={cargarPacientes}
            />
        </div>
    );
};