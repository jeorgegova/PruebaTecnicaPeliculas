import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import { API_BASE_URL } from '../api/config';

const Favorites: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const { token } = useAuth();
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/favorites`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMovies(response.data);
            } catch (err: any) {
                setError('Failed to fetch favorites');
            }
        };

        if (token) {
            fetchFavorites();
        }
    }, [token]);

    const handleRemoveFavorite = async (imdbId: string) => {
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
            setError('Failed to remove favorite');
        }
    };

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-white">My Favorites</h2>
            {error && <p className="text-red-300 mb-4 bg-red-500/20 p-2 rounded-lg">{error}</p>}
            {movies.length === 0 && !error && <p className="text-gray-400">No favorites yet.</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie: any) => (
                    <MovieCard
                        key={movie.imdbId}
                        title={movie.title}
                        poster={movie.posterUrl}
                        imdbId={movie.imdbId}
                        onRemoveFavorite={handleRemoveFavorite}
                        isFavorite={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
