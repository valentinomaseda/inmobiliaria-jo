import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-jo-surface flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src="/src/public/logo-png.png" 
              alt="Juliana Ortiz Inmobiliaria" 
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-3xl font-display font-bold text-jo-dark mb-2">
            Panel de Administración
          </h1>
          <p className="text-jo-textMuted">
            Ingresa con tus credenciales
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-premium p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-jo-dark mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent transition-all outline-none"
                placeholder="admin@inmobiliaria.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-jo-dark mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-jo-border rounded-lg focus:ring-2 focus:ring-jo-pink focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-jo-pink hover:bg-jo-pinkHover text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-jo-textMuted mt-6">
          ¿Problemas para acceder? Contacta al administrador del sistema
        </p>
      </div>
    </div>
  );
}
