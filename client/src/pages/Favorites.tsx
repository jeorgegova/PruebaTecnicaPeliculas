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

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {movies.length === 0 && !error && <p>No favorites yet.</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map((movie: any) => (
                    <MovieCard
                        key={movie.imdbId}
                        title={movie.title}
                        poster={movie.posterUrl}
                        imdbId={movie.imdbId}
                        isFavorite={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
