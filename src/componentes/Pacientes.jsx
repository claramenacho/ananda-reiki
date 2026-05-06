import React, { useState, useEffect } from 'react';
import { UserPlus, Search, FileText } from 'lucide-react';
import "../styles/admin-components.css"

export const Pacientes = () => {
    const [pacientes, setPacientes] = useState([]);

    // 1. Buscamos los pacientes en el servidor apenas carga la página
    useEffect(() => {
        fetch('http://localhost:5000/api/pacientes/todos')
            .then(res => res.json())
            .then(data => setPacientes(data))
            .catch(err => console.error("Error:", err));
    }, []);

    return (
        <div className="pacientes-section">
            <div className="pacientes-header">
                <h2>Historial de Pacientes</h2>
                <div className="buscador-wrapper">
                    <Search size={18} color="#83bca9" />
                    <input type="text" placeholder="Buscar por nombre o DNI..." />
                </div>
            </div>

            <div className="pacientes-grid">
                {pacientes.map(p => (
                    <div key={p._id} className="tarjeta-paciente">
                        <div className="info-principal">
                            <h3>{p.nombre} {p.apellido}</h3>
                            <p>DNI: {p.dni}</p>
                        </div>
                        <button className="btn-ver-ficha" title="Ver Historia Clínica">
                            <FileText size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};