import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const SetupAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${baseURL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (data.exito) {
            alert("¡Configuración exitosa! Ahora podés loguearte.");
            navigate('/admin'); // Lo mandamos al login normal
        } else {
            alert(data.mensaje); // Aquí le dirá que ya hay un dueño si intenta registrarse dos veces
        }
    };

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={handleRegister}>
                <ShieldCheck size={50} color="#83bca9" />
                <h2>Configuración Inicial</h2>
                <p>Bienvenida a Ananda. Creá tu cuenta de Administradora para empezar.</p>
                
                <input 
                    type="email" 
                    placeholder="Tu Email Profesional" 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Creá tu Contraseña" 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                
                <button type="submit" className="btn-whatsapp">Finalizar Configuración</button>
            </form>
        </div>
    );
};