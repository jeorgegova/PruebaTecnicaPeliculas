import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiFilm, FiSearch, FiHeart, FiLogOut, FiLogIn, FiUserPlus } from 'react-icons/fi';

const Navbar: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 w-full bg-gradient-to-r from-gray-900 via-slate-800 to-black backdrop-blur-md bg-opacity-90 shadow-lg z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 text-white text-2xl font-bold hover:scale-105 transition-transform duration-300">
                    <FiFilm className="text-yellow-400" />
                    <span>MovieApp</span>
                </Link>
                <div className="flex space-x-6">
                    {isAuthenticated ? (
                        <>
                            <Link to="/search" className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300">
                                <FiSearch />
                                <span>Buscar</span>
                            </Link>
                            <Link to="/favorites" className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300">
                                <FiHeart />
                                <span>Favoritos</span>
                            </Link>
                            <button onClick={handleLogout} className="flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
                                <FiLogOut />
                                <span>Cerrar Sesión</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300">
                                <FiLogIn />
                                <span>Iniciar Sesión</span>
                            </Link>
                            <Link to="/register" className="flex items-center space-x-1 text-white hover:text-yellow-400 transition-colors duration-300">
                                <FiUserPlus />
                                <span>Registrarse</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
