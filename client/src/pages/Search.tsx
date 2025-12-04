import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import { API_BASE_URL } from '../api/config';

const Search: React.FC = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<any[]>([]);
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
        } catch (err: any) {
            alert('Failed to add favorite: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Search Movies</h2>
            <form onSubmit={handleSearch} className="mb-8 flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 p-2 border rounded"
                    placeholder="Enter movie title..."
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Search</button>
            </form>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map((movie: any) => (
                    <MovieCard
                        key={movie.imdbId}
                        title={movie.title}
                        poster={movie.posterUrl}
                        imdbId={movie.imdbId}
                        onAddFavorite={handleAddFavorite}
                    />
                ))}
            </div>
        </div>
    );
};

export default Search;
