import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import MovieDetailsModal from '../components/MovieDetailsModal';
import { API_BASE_URL } from '../api/config';
import ClipLoader from 'react-spinners/ClipLoader';

const Favorites: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const { token } = useAuth();
    const [error, setError] = useState('');
    const [loadingMovies, setLoadingMovies] = useState<Set<string>>(new Set());
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<any>(null);
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/favorites`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMovies(response.data);
            } catch (err: any) {
                setError('Error al cargar favoritos');
            }
        };

        if (token) {
            fetchFavorites();
        }
    }, [token]);

    const handleRemoveFavorite = async (imdbId: string) => {
        setLoadingMovies(prev => new Set(prev).add(imdbId));
        try {
            await axios.delete(`${API_BASE_URL}/api/favorites/${imdbId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Refresh the list after removal
            const response = await axios.get(`${API_BASE_URL}/api/favorites`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMovies(response.data);
        } catch (err: any) {
            setError('Error al quitar favorito');
        } finally {
            setLoadingMovies(prev => {
                const newSet = new Set(prev);
                newSet.delete(imdbId);
                return newSet;
            });
        }
    };

    const fetchMovieDetails = async (imdbId: string) => {
        setModalLoading(true);
        setModalOpen(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/movies/${imdbId}/details`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSelectedMovie(response.data);
        } catch (err: any) {
            console.error('Failed to fetch movie details:', err);
            setSelectedMovie(null);
        } finally {
            setModalLoading(false);
        }
    };

    const handleMovieClick = (imdbId: string) => {
        fetchMovieDetails(imdbId);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedMovie(null);
    };

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-white">Mis Favoritos</h2>
            {error && <p className="text-red-300 mb-4 bg-red-500/20 p-2 rounded-lg">{error}</p>}
            {movies.length === 0 && !error && <p className="text-gray-400">Aún no tienes favoritos.</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie: any) => (
                    <MovieCard
                        key={movie.imdbId}
                        title={movie.title}
                        poster={movie.posterUrl}
                        imdbId={movie.imdbId}
                        onRemoveFavorite={handleRemoveFavorite}
                        isFavorite={true}
                        loading={loadingMovies.has(movie.imdbId)}
                        onClick={() => handleMovieClick(movie.imdbId)}
                    />
                ))}
            </div>
            <MovieDetailsModal
                movie={selectedMovie}
                isOpen={modalOpen}
                onClose={closeModal}
                loading={modalLoading}
            />
        </div>
    );
};

export default Favorites;
