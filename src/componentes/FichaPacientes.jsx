import React, { useState } from 'react';
import { ArrowLeft, Save, AlertCircle, Calendar, Heart, Activity, Sparkles, User, ShieldCheck, ClipboardList, CheckCircle } from 'lucide-react';
import { HistoriaClinica } from './HistoriaClinica'; 
import { MapaChakras } from './MapaChakras';
import "../styles/fichaPacientes.css";

export const FichaPaciente = ({ paciente, onVolver, onActualizar }) => {
    const [cargando, setCargando] = useState(false);
    const [pestanaActiva, setPestanaActiva] = useState('sesion');
    
    // Estado temporal para la Historia Clínica Inicial (por si es nueva)
    const [tempHC, setTempHC] = useState(paciente.antecedentes || {
        motivoConsulta: '',
        enfermedades: '',
        medicacion: '',
        calidadSueno: '',
        alimentacion: '',
        nivelEstres: 5
    });

    const [nuevaSesion, setNuevaSesion] = useState({
        recomendaciones: '',
        medicacionSugerida: '',
        finalizaTratamiento: false,
        proximaCita: '',
        observaciones: '', 
        byosen: { cabeza: '', garganta: '', corazon: '', plexo: '', sacroRaiz: '' },
        chakras: [
            { nombre: '7. Corona', estado: 'Armónico', obs: '' },
            { nombre: '6. Tercer Ojo', estado: 'Armónico', obs: '' },
            { nombre: '5. Garganta', estado: 'Armónico', obs: '' },
            { nombre: '4. Corazón', estado: 'Armónico', obs: '' },
            { nombre: '3. Plexo Solar', estado: 'Armónico', obs: '' },
            { nombre: '2. Sacro', estado: 'Armónico', obs: '' },
            { nombre: '1. Raíz', estado: 'Armónico', obs: '' }
        ]
    });

    // --- LÓGICA DE CONTROL ---
    // Consideramos que ya tiene HC si existe un motivo de consulta cargado
    const tieneHCGuardada = paciente.antecedentes && paciente.antecedentes.motivoConsulta;

    const handleHCChange = (e) => {
        const { name, value } = e.target;
        // IMPORTANTE: Si tus inputs en HistoriaClinica tienen name="ant_motivoConsulta"
        // esta lógica limpia el "ant_" para que coincida con tu base de datos
        const fieldName = name.startsWith('ant_') ? name.replace('ant_', '') : name;
        
        setTempHC(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    const guardarHCInicial = async () => {
        setCargando(true);
        try {
            const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await fetch(`${baseURL}/api/pacientes/${paciente._id}/hc-inicial`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ antecedentes: tempHC }) // Enviamos lo que escribiste
            });

            if (res.ok) {
                alert("¡Historia Clínica guardada!");
                onActualizar(); // <--- ESTO ES CLAVE: Avisa al padre que recargue los datos
            } else {
                alert("Error del servidor al guardar");
            }
        } catch (error) {
            console.error("Error de red:", error);
        } finally {
            setCargando(false);
        }
    };

    const actualizarChakra = (index, campo, valor) => {
        const nuevosChakras = [...nuevaSesion.chakras];
        nuevosChakras[index][campo] = valor;
        setNuevaSesion({ ...nuevaSesion, chakras: nuevosChakras });
    };

    const guardarSesion = async (e) => {
        e.preventDefault();
        setCargando(true);
        try {
            const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            
            // CAMBIO AQUÍ: Usamos baseURL y backticks ``
            const res = await fetch(`${baseURL}/api/pacientes/${paciente._id}/nueva-sesion`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaSesion) 
            });
            
            if (res.ok) {
                onActualizar(); 
                alert("Sesión guardada con éxito.");
                onVolver();
            }
        } catch (error) {
            console.error("Error al guardar:", error);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="ficha-layout animate-fadeIn">
            <header className="ficha-header">
                <button onClick={onVolver} className="btn-volver">
                    <ArrowLeft size={20} /> Volver
                </button>
                <div className="paciente-titulo">
                    <h1>{paciente.nombre} {paciente.apellido}</h1>
                    <div className="tags-container">
                        <span className="dni-tag">DNI: {paciente.dni}</span>
                        <div className={`legal-badge-inline ${paciente.aceptaConsentimiento ? 'ok' : 'falta'}`}>
                            <ShieldCheck size={14} /> {paciente.aceptaConsentimiento ? 'Consentimiento OK' : 'Sin Consentimiento'}
                        </div>
                    </div>
                </div>
            </header>

            <nav className="ficha-tabs">
                <button className={`tab-link ${pestanaActiva === 'sesion' ? 'active' : ''}`} onClick={() => setPestanaActiva('sesion')}>
                    <Sparkles size={18} /> Sesión del Día
                </button>
                <button className={`tab-link ${pestanaActiva === 'historia' ? 'active' : ''}`} onClick={() => setPestanaActiva('historia')}>
                    <ClipboardList size={18} /> Historia Clínica Inicial
                </button>
            </nav>

            <div className="ficha-content-wrapper">
                {pestanaActiva === 'sesion' ? (
                    <main className="ficha-main">
                        <div className="resumen-critico">
                            <div className={`alerta-consentimiento ${paciente.aceptaConsentimiento ? 'ok' : 'falta'}`}>
                                <ShieldCheck size={16} /> 
                                {paciente.aceptaConsentimiento ? 'Consentimiento Firmado' : 'Falta Firma de Consentimiento'}
                            </div>
                            {paciente.antecedentes?.enfermedades && (
                                <div className="alerta-salud">
                                    <Heart size={16} /> <strong>Alerta Médica:</strong> {paciente.antecedentes.enfermedades}
                                </div>
                            )}
                        </div>

                        <form onSubmit={guardarSesion} className="box-nueva-sesion">
                            <h2 className="section-title">Nueva Sesión de Reiki</h2>
                            
                            <div className="form-section">
                                <h4>1. Percepción Inicial (Byosen)</h4>
                                <div className="byosen-grid">
                                    <input type="text" placeholder="Cabeza" onChange={(e) => setNuevaSesion({...nuevaSesion, byosen: {...nuevaSesion.byosen, cabeza: e.target.value}})} />
                                    <input type="text" placeholder="Garganta" onChange={(e) => setNuevaSesion({...nuevaSesion, byosen: {...nuevaSesion.byosen, garganta: e.target.value}})} />
                                    <input type="text" placeholder="Corazón" onChange={(e) => setNuevaSesion({...nuevaSesion, byosen: {...nuevaSesion.byosen, corazon: e.target.value}})} />
                                    <input type="text" placeholder="Plexo" onChange={(e) => setNuevaSesion({...nuevaSesion, byosen: {...nuevaSesion.byosen, plexo: e.target.value}})} />
                                    <input type="text" placeholder="Raíz" onChange={(e) => setNuevaSesion({...nuevaSesion, byosen: {...nuevaSesion.byosen, sacroRaiz: e.target.value}})} />
                                </div>
                            </div>

                            <div className="form-section">
                                <h4>2. Mapa de Chakras Interactivo</h4>
                                <MapaChakras chakras={nuevaSesion.chakras} />
                                <table className="tabla-reiki">
                                    <thead>
                                        <tr>
                                            <th>Chakra</th>
                                            <th>Estado</th>
                                            <th>Notas</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {nuevaSesion.chakras.map((c, index) => (
                                            <tr key={c.nombre}>
                                                <td>{c.nombre}</td>
                                                <td>
                                                    <select value={c.estado} onChange={(e) => actualizarChakra(index, 'estado', e.target.value)}>
                                                        <option value="Bloqueado">Bloqueado</option>
                                                        <option value="Hiperactivo">Hiperactivo</option>
                                                        <option value="Armónico">Armónico</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input type="text" value={c.obs} placeholder="..." onChange={(e) => actualizarChakra(index, 'obs', e.target.value)} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="form-section">
                                <h4>3. Evolución y Notas de la Sesión</h4>
                                <textarea 
                                    placeholder="Describir sensaciones del paciente..."
                                    value={nuevaSesion.observaciones}
                                    onChange={(e) => setNuevaSesion({...nuevaSesion, observaciones: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="form-section recomendaciones-box">
                                <h4>4. Plan de Acción</h4>
                                <div className="input-group">
                                    <label>Consejos y Tareas</label>
                                    <textarea 
                                        placeholder="Meditación, cristales, etc."
                                        value={nuevaSesion.recomendaciones}
                                        onChange={(e) => setNuevaSesion({...nuevaSesion, recomendaciones: e.target.value})}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Sugerencias Adicionales</label>
                                    <input 
                                        type="text"
                                        value={nuevaSesion.medicacionSugerida}
                                        onChange={(e) => setNuevaSesion({...nuevaSesion, medicacionSugerida: e.target.value})}
                                    />
                                </div>
                                <div className="checkbox-group">
                                    <label className="switch-label">
                                        <input 
                                            type="checkbox" 
                                            checked={nuevaSesion.finalizaTratamiento}
                                            onChange={(e) => setNuevaSesion({...nuevaSesion, finalizaTratamiento: e.target.checked})}
                                        />
                                        <span>¿Finaliza tratamiento?</span>
                                    </label>
                                </div>
                            </div>

                            <button type="submit" disabled={cargando} className="btn-primario full-width">
                                {cargando ? 'Guardando...' : <><Save size={18} /> Finalizar y Guardar Sesión</>}
                            </button>
                        </form>

                        <section className="historial-evolucion">
                            <h3 className="section-subtitle"><Activity size={20} /> Historial</h3>
                            {paciente.sesiones?.length > 0 ? (
                                <div className="timeline">
                                    {[...paciente.sesiones].reverse().map((sesion, index) => (
                                        <div key={index} className="sesion-card-pasada">
                                            {/* ... (Contenido del historial igual que antes) ... */}
                                            <div className="sesion-header-pasada">
                                                <span className="sesion-fecha"><Calendar size={14} /> {new Date(sesion.fecha).toLocaleDateString()}</span>
                                            </div>
                                            <div className="sesion-body-pasada">
                                                <p>{sesion.observaciones}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : <p className="no-data">Sin sesiones previas.</p>}
                        </section>
                    </main>
                ) : (
                    <main className="ficha-main animate-fadeIn">
                        <div className="hc-view-container">
                            
                            {/* CONDICIONAL: ¿Ya hay datos o está vacío? */}
                            {paciente.antecedentes && paciente.antecedentes.motivoConsulta ? (
                                // SI YA TIENE DATOS: Mostramos el cartel de éxito y la ficha bloqueada
                                <>
                                    <div className="hc-header-info ok">
                                        <CheckCircle size={20} />
                                        <p><strong>Historia Clínica Inicial cargada.</strong> Los datos están protegidos para consulta.</p>
                                    </div>
                                    <HistoriaClinica 
                                        datos={tempHC} 
                                        onChange={handleHCChange} 
                                        soloLectura={false} 
                                    />
                                </>
                            ) : (
                                // SI ESTÁ VACÍO: Mostramos el formulario para llenar por primera vez
                                <>
                                    <div className="hc-header-info alerta">
                                        <AlertCircle size={20} />
                                        <p><strong>Ficha Inicial Pendiente:</strong> Por favor, completá los antecedentes del paciente para su primera sesión.</p>
                                    </div>

                                    <form className="hc-form-nuevo">
                                        <HistoriaClinica 
                                            datos={tempHC} 
                                            onChange={handleHCChange} 
                                            soloLectura={false} 
                                        />
                                        
                                        <button 
                                            type="button" 
                                            onClick={guardarHCInicial} 
                                            className="btn-primario full-width"
                                            style={{ marginTop: '20px', background: '#83bca9' }}
                                        >
                                            <Save size={18} /> Guardar Historia Clínica Inicial
                                        </button>
                                    </form>
                                </>
                            )}

                            <div className="info-extra-hc">
                                <p><strong>Ocupación:</strong> {paciente.ocupacion || 'No informada'}</p>
                                <p><strong>Fecha de alta:</strong> {new Date(paciente.fechaAlta).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </main>
                )}
            </div>
        </div>
    );
};