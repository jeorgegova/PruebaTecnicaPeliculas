import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import MovieDetailsModal from '../components/MovieDetailsModal';
import { API_BASE_URL } from '../api/config';
import ClipLoader from 'react-spinners/ClipLoader';

const Search: React.FC = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<any[]>([]);
    const [favorites, setFavorites] = useState<any[]>([]);
    const { token } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<any>(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setHasSearched(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/movies/search?title=${query}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMovies(response.data.filter((movie: any, index: number, self: any[]) => self.findIndex((m: any) => m.imdbId === movie.imdbId) === index));
        } catch (err: any) {
            setError('Failed to fetch movies');
            setMovies([]);
        } finally {
            setLoading(false);
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

    useEffect(() => {
        if (token) {
            fetchFavorites();
        }
    }, [token]);


    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center p-4 relative overflow-hidden">
            {/* Movie-themed background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-red-500 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                <div className="absolute top-20 right-20 w-24 h-24 border-2 border-blue-500 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                <div className="absolute bottom-20 left-20 w-20 h-20 border-2 border-yellow-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-16 h-16 bg-red-500 rounded-full opacity-20 animate-bounce"></div>
            </div>
            <div className="w-full max-w-6xl relative z-10">
                <h2 className="text-4xl font-bold mb-8 text-center text-white mt-8">Descubre Películas</h2>
                <form onSubmit={handleSearch} className="mb-8 flex gap-4 max-w-2xl mx-auto">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full p-4 pl-12 border border-gray-600 rounded-2xl bg-gray-800/80 backdrop-blur-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 shadow-lg"
                            placeholder="Buscar películas..."
                        />
                        <svg className="absolute left-4 top-4 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <button type="submit" disabled={loading} className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        {loading ? <ClipLoader size={20} color="#ffffff" /> : (
                            <>
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Buscar
                            </>
                        )}
                    </button>
                </form>
                {error && <p className="text-red-300 mb-8 bg-red-500/20 p-4 rounded-2xl text-center max-w-2xl mx-auto shadow-lg">{error}</p>}
                {!loading && movies.length === 0 && hasSearched && !error && <p className="text-gray-400 mb-8 text-center">No se encontraron películas. Intenta con un término de búsqueda diferente.</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
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
                                onClick={() => handleMovieClick(movie.imdbId)}
                            />
                        );
                    })}
                </div>
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

export default Search;
