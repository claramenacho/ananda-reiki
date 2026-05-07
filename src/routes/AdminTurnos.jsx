import React, { useEffect, useState } from 'react';
import { Phone, Mail, Calendar, Trash2, Clock, User, LogOut, Users, Home, MessageSquare, Send, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Pacientes } from '../componentes/Pacientes'; 
import "../styles/admin-components.css";
import "../styles/admin-layout.css";

export const AdminTurnos = () => {
    const [turnos, setTurnos] = useState([]);
    const [consultas, setConsultas] = useState([]);
    const [autorizado, setAutorizado] = useState(false);
    const [vistaActual, setVistaActual] = useState('turnos');
    const [cargando, setCargando] = useState(true);

    // 1. Seguridad y Carga de Datos (Todo junto y al principio)
    useEffect(() => {
        const isAuth = localStorage.getItem('auth_ananda');
        
        if (isAuth === 'true') {
            setAutorizado(true);
            
            const cargarTodo = async () => {
                try {
                    // 1. Definimos la base dinámica
                    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                    
                    // 2. Usamos baseURL en ambos fetch con backticks
                    const [resTurnos, resConsultas] = await Promise.all([
                        fetch(`${baseURL}/api/turnos`),   // <--- Verificá que diga /api/turnos
                        fetch(`${baseURL}/api/contacto`)  // <--- Este es el que ya te funciona
                    ]);
                    const dataTurnos = await resTurnos.json();
                    const dataConsultas = await resConsultas.json();

                    setTurnos(dataTurnos);
                    setConsultas(dataConsultas);
                } catch (err) {
                    console.error("Error cargando datos:", err);
                } finally {
                    setCargando(false);
                }
            };
            cargarTodo();
        } else {
            window.location.href = "/admin"; 
        }
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem('auth_ananda');
        window.location.href = "/admin";
    };

    const eliminarTurno = async (id) => {
        if (window.confirm("¿Estás segura de que querés eliminar este turno?")) {
            try {
                const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                
                // ¡Cambiamos la URL aquí!
                const respuesta = await fetch(`${baseURL}/api/turnos/${id}`, {
                    method: 'DELETE',
                });

                if (respuesta.ok) {
                    setTurnos(turnos.filter(turno => turno._id !== id));
                    alert("Turno eliminado correctamente"); // Un aviso siempre ayuda
                }
            } catch (error) {
                console.error("Error al conectar con el servidor", error);
            }
        }
    };

    // Los retornos condicionales SIEMPRE después de los useEffect
    if (!autorizado || cargando) return null;

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h2 className="sidebar-title">Ananda</h2>
                    <p className="sidebar-subtitle">Panel de Gestión</p>
                </div>
                
                <nav className="admin-nav">
                    <button 
                        className={vistaActual === 'consultas' ? 'nav-item activo' : 'nav-item'} 
                        onClick={() => setVistaActual('consultas')}
                    >
                        <MessageSquare size={20} /> Consultas de la Web
                    </button>
                    <button 
                        className={vistaActual === 'turnos' ? 'nav-item activo' : 'nav-item'} 
                        onClick={() => setVistaActual('turnos')}
                    >
                        <Calendar size={20} /> Gestión de Turnos
                    </button>
                    <button 
                        className={vistaActual === 'pacientes' ? 'nav-item activo' : 'nav-item'} 
                        onClick={() => setVistaActual('pacientes')}
                    >
                        <Users size={20} /> Historial de Pacientes
                    </button>
                </nav>

                <div className="admin-sidebar-footer">
                    <Link to="/" className="nav-item">
                        <Home size={18} /> Ver Web Pública
                    </Link>
                    <button onClick={cerrarSesion} className="btn-logout">
                        <LogOut size={18} /> Cerrar Sesión
                    </button>
                </div>
            </aside>

            <main className="admin-content">
                <section className="section-header">
                    <h2 className="content-title">
                        {vistaActual === 'turnos' ? 'Gestión de Turnos' : 
                         vistaActual === 'consultas' ? 'Consultas de la Web' : 'Historial de Pacientes'}
                    </h2>
                </section>

                {vistaActual === 'turnos' && (
                    <div className="turnos-grid">
                        {turnos.map(turno => (
                            <div key={turno._id} className="turno-card">
                                <div className="turno-info">
                                    {/* 1. NOMBRE */}
                                    <h3>{turno.nombre}</h3>
                                    
                                    {/* 2. MAIL */}
                                    <p><Mail size={16} className="icon-zen" /> {turno.email}</p>

                                    {/* 3. HORARIO (Combinando preferencia y mensaje) */}
                                    <p>
                                        <Clock size={16} className="icon-zen" /> 
                                        {turno.preferencia} {turno.mensaje ? `- ${turno.mensaje}` : ''}
                                    </p>

                                    {/* 4. DIA (Usando el campo fechaSolicitud) */}
                                    <p>
                                        <Calendar size={16} className="icon-zen" /> 
                                        {turno.fechaSolicitud ? new Date(turno.fechaSolicitud).toLocaleDateString('es-ES') : "Sin fecha"}
                                    </p>

                                    {/* 5. SERVICIO */}
                                    <p className="turno-servicio-tag">{turno.servicio}</p>
                                </div>
                                <div className="turno-actions">
                                    <button className="btn-delete" onClick={() => eliminarTurno(turno._id)}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {vistaActual === 'consultas' && (
                    <div className="consultas-grid">
                        {consultas.map((consulta) => (
                            <div key={consulta._id} className="consulta-card">
                                <div className="consulta-header">
                                    <div className="user-icon-circle"><Users size={20} /></div>
                                    <h3>{consulta.nombre}</h3>
                                </div>
                                <div className="consulta-body">
                                    <p className="dato-contacto"><Mail size={16} className="icon-zen" /> {consulta.email}</p>
                                    <div className="mensaje-box">
                                        <p className="mensaje-label">Mensaje recibido:</p>
                                        <p className="mensaje-texto">{consulta.mensaje}</p>
                                    </div>
                                </div>
                                <div className="consulta-actions">
                                    <a href={`mailto:${consulta.email}?subject=Respuesta de Ananda Reiki - Consulta de ${consulta.nombre}`} 
                                    className="btn-responder">
                                        <Send size={16} /> Responder por Mail
                                    </a>
                                    <button className="btn-archivar" title="Archivar"><Check size={18} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {vistaActual === 'pacientes' && <Pacientes />}
            </main>
        </div>
    );
};