import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react'; 
import "../styles/login.css";

export const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(''); 
    const [olvidoClave, setOlvidoClave] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    // 1. Función para ingresar (AHORA DINÁMICA)
    const handleLogin = async (e) => {
        e.preventDefault();
        try { // <-- Faltaba este try
            const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }) 
            });
            const data = await response.json();

            if (data.exito) {
                localStorage.setItem('auth_ananda', 'true');
                navigate('/adminturnos');
            } else {
                alert(data.mensaje);
            }
        } catch (error) {
            alert("No se pudo conectar con el servidor.");
        }
    };

    // 2. Función para recuperar
    const handleSendEmail = async (e) => {
        e.preventDefault();
        try {
            const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            setMensaje(data.mensaje);
        } catch (error) {
            setMensaje("Error al conectar con el servidor.");
        }
    };

    return (
        <div className="login-container">
            {!olvidoClave ? (
                /* FORMULARIO DE LOGIN DINÁMICO */
                <form className="login-card" onSubmit={handleLogin}>
                    <Lock size={40} color="#83bca9" />
                    <h2>Panel de Gestión</h2>
                    <p>Ingresá tus credenciales para ver las sesiones</p>
                    
                    {/* AGREGAMOS ESTE INPUT DE EMAIL PARA QUE SEA VENDIBLE */}
                    <input 
                        type="email" 
                        placeholder="Correo electrónico" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <button type="submit" className="btn-login">Ingresar</button>
                    
                    <button 
                        type="button" 
                        className="btn-forgot-pass"
                        onClick={() => { setOlvidoClave(true); setMensaje(''); }}
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </form>
            ) : (
                /* FORMULARIO DE RECUPERACIÓN */
                <form className="login-card" onSubmit={handleSendEmail}>
                    <Mail size={40} color="#83bca9" />
                    <h2>Recuperar Acceso</h2>
                    <p className="recovery-txt">Ingresá tu email para recibir un enlace de recuperación.</p>
                    
                    <input 
                        type="email" 
                        placeholder="Tu correo registrado" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />

                    {mensaje && <p className="status-message info">{mensaje}</p>}

                    <button type="submit" className="btn-whatsapp">
                        Enviar Email
                    </button>
                    
                    <button 
                        type="button" 
                        className="back-link" 
                        onClick={() => {setOlvidoClave(false); setMensaje('');}}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#83bca9', marginTop: '10px' }}
                    >
                        Volver al login
                    </button>
                </form>
            )}
        </div>
    );
}