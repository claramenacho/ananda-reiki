import React from 'react';
import { ClipboardList, Activity, Heart, Moon, Coffee, Utensils } from 'lucide-react';
import "../styles/admin-layout.css"

// Agregamos 'soloLectura' a las propiedades (props)
export const HistoriaClinica = ({ datos, onChange, soloLectura = false }) => {
    return (
        <div className={`seccion-historia-clinica animate-fadeIn ${soloLectura ? 'modo-consulta' : ''}`}>
            <fieldset className="form-group-hc">
                <legend><ClipboardList size={18} /> Historia Clínica Integral</legend>
                
                {/* MOTIVO DE CONSULTA */}
                <div className="input-group full-width" style={{marginBottom: '20px'}}>
                    <label>Motivo de la consulta / Intención</label>
                    <textarea 
                        name="ant_motivoConsulta" 
                        value={datos?.motivoConsulta || ''}
                        placeholder="¿Qué intención o dolencia trae hoy al paciente?" 
                        onChange={onChange} 
                        rows="2"
                        disabled={soloLectura} // Bloqueado si es solo lectura
                    />
                </div>

                <div className="form-grid-hc">
                    {/* SALUD FÍSICA */}
                    <div className="input-group">
                        <label><Heart size={14} /> Enfermedades Preexistentes</label>
                        <input 
                            type="text" 
                            name="ant_enfermedades" 
                            value={datos?.enfermedades || ''} 
                            placeholder="Ej: Hipertensión, Diabetes..."
                            onChange={onChange} 
                            disabled={soloLectura} // Bloqueado
                        />
                    </div>

                    <div className="input-group">
                        <label><Activity size={14} /> Medicación Actual</label>
                        <input 
                            type="text" 
                            name="ant_medicacion" 
                            value={datos?.medicacion || ''} 
                            placeholder="¿Toma algún remedio?"
                            onChange={onChange} 
                            disabled={soloLectura} // Bloqueado
                        />
                    </div>
                    
                    {/* HÁBITOS ZEN */}
                    <div className="input-group">
                        <label><Moon size={14} /> Calidad de Sueño</label>
                        <select 
                            name="ant_calidadSueno" 
                            value={datos?.calidadSueno || ''} 
                            onChange={onChange}
                            disabled={soloLectura} // Bloqueado
                        >
                            <option value="">Seleccionar...</option>
                            <option value="Excelente">Excelente (profundo)</option>
                            <option value="Buena">Buena (descansa)</option>
                            <option value="Regular">Regular (se despierta)</option>
                            <option value="Mala">Mala (insomnio)</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label><Utensils size={14} /> Alimentación</label>
                        <input 
                            type="text" 
                            name="ant_alimentacion" 
                            value={datos?.alimentacion || ''} 
                            placeholder="Ej: Vegetariana, equilibrada..."
                            onChange={onChange} 
                            disabled={soloLectura} // Bloqueado
                        />
                    </div>

                    {/* RANGO DE ESTRÉS */}
                    <div className="range-container full-width">
                        <label style={{display: 'flex', justifyContent: 'space-between'}}>
                            <span><Coffee size={14} /> Nivel de Estrés Percibido</span>
                            <strong className="stress-value">{datos?.nivelEstres || 5}/10</strong>
                        </label>
                        <input 
                            type="range" 
                            name="ant_nivelEstres" 
                            min="1" 
                            max="10" 
                            value={datos?.nivelEstres || 5}
                            onChange={onChange} 
                            className="zen-range"
                            disabled={soloLectura} // Bloqueado
                        />
                    </div>
                </div>
            </fieldset>
        </div>
    );
};