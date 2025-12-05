import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import { API_BASE_URL } from '../api/config';

const Search: React.FC = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<any[]>([]);
    const [favorites, setFavorites] = useState<any[]>([]);
    const { token } = useAuth();
    const [error, setError] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${API_BASE_URL}/api/movies/search?title=${query}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMovies(response.data);
            setError('');
        } catch (err: any) {
            setError('Failed to fetch movies');
            setMovies([]);
        }
    };

    const handleAddFavorite = async (imdbId: string) => {
        try {
            await axios.post(`${API_BASE_URL}/api/favorites`, { imdbId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Added to favorites!');
            // Refresh favorites after adding
            fetchFavorites();
        } catch (err: any) {
            alert('Failed to add favorite: ' + (err.response?.data?.message || err.message));
        }
    };

    const fetchFavorites = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/favorites`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFavorites(response.data);
        } catch (err: any) {
            console.error('Failed to fetch favorites:', err);
        }
    };

    useEffect(() => {
        if (token) {
            fetchFavorites();
        }
    }, [token]);

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-white">Search Movies</h2>
            <form onSubmit={handleSearch} className="mb-8 flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 p-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                    placeholder="Enter movie title..."
                />
                <button type="submit" className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">Search</button>
            </form>
            {error && <p className="text-red-300 mb-4 bg-red-500/20 p-2 rounded-lg">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie: any) => {
                    const isFavorite = favorites.some((fav: any) => fav.imdbId === movie.imdbId);
                    return (
                        <MovieCard
                            key={movie.imdbId}
                            title={movie.title}
                            poster={movie.posterUrl}
                            imdbId={movie.imdbId}
                            onAddFavorite={!isFavorite ? handleAddFavorite : undefined}
                            isFavorite={isFavorite}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Search;
