import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { KeyRound } from 'lucide-react'; // Usamos Lucide como te gusta

export const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState({ msg: '', type: '' });

    const handleReset = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setStatus({ msg: 'Las contraseñas no coinciden', type: 'error' });
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword })
            });

            if (response.ok) {
                setStatus({ msg: 'Contraseña actualizada con éxito', type: 'success' });
                setTimeout(() => navigate('/admin'), 3000);
            } else {
                setStatus({ msg: 'El link expiró o es inválido', type: 'error' });
            }
        } catch (error) {
            setStatus({ msg: 'Error de conexión con el servidor', type: 'error' });
        }
    };

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={handleReset}>
                <KeyRound size={44} className="icon-zen" />
                <h2>Nueva Contraseña</h2>
                <p className="recovery-txt">Elegí tu nueva clave de acceso para el Panel de Gestión.</p>

                <input 
                    type="password" 
                    placeholder="Nueva contraseña" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />

                <input 
                    type="password" 
                    placeholder="Confirmar contraseña" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                {status.msg && (
                    <div className={`status-message ${status.type}`}>
                        {status.msg}
                    </div>
                )}

                <button type="submit" className="btn-whatsapp">
                    Actualizar Clave
                </button>
            </form>
        </div>
    );
};