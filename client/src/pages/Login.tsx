import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../api/config';
import ClipLoader from 'react-spinners/ClipLoader';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
            login(response.data.token, response.data.email);
            navigate('/search');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex justify-center items-center p-4 relative overflow-hidden">
            {/* Movie-themed background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-red-500 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                <div className="absolute top-20 right-20 w-24 h-24 border-2 border-blue-500 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                <div className="absolute bottom-20 left-20 w-20 h-20 border-2 border-yellow-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-16 h-16 bg-red-500 rounded-full opacity-20 animate-bounce"></div>
            </div>
            <form onSubmit={handleSubmit} className="bg-gray-800/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 relative z-10">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">Iniciar Sesión</h2>
                {error && <p className="text-red-300 mb-4 text-center bg-red-500/20 p-2 rounded-lg">{error}</p>}
                <div className="mb-4 relative">
                    <label className="block text-gray-300 mb-2 font-medium">Correo Electrónico</label>
                    <div className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 pl-10 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                            placeholder="Ingresa tu correo electrónico"
                            required
                        />
                        <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                    </div>
                </div>
                <div className="mb-6 relative">
                    <label className="block text-gray-300 mb-2 font-medium">Contraseña</label>
                    <div className="relative">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 pl-10 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                        <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                    {loading ? <ClipLoader size={20} color="#ffffff" /> : 'Iniciar Sesión'}
                </button>
                <p className="text-center text-gray-400 mt-4">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/register" className="text-red-400 font-semibold hover:underline hover:text-red-300 transition-colors duration-200">
                        Regístrate aquí
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
