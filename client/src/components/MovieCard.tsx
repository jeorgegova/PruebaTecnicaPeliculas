import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface MovieProps {
    title: string;
    poster: string;
    imdbId: string;
    onAddFavorite?: (imdbId: string) => void;
    onRemoveFavorite?: (imdbId: string) => void;
    isFavorite?: boolean;
    loading?: boolean;
    onClick?: () => void;
}

const MovieCard: React.FC<MovieProps> = ({ title, poster, imdbId, onAddFavorite, onRemoveFavorite, isFavorite, loading, onClick }) => {
    return (
        <div
            className="bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 flex flex-col items-center border border-gray-700 hover:shadow-red-500/20 hover:scale-105 transition-all duration-300 min-h-[400px] cursor-pointer"
            onClick={onClick}
        >
            <img src={poster !== 'N/A' ? poster : 'https://via.placeholder.com/150'} alt={title} className="w-full h-64 object-cover mb-4 rounded-lg" />
            <div className="flex-1 flex flex-col justify-between w-full">
                <h3 className="font-bold text-lg text-center mb-4 text-white line-clamp-2 leading-tight">{title}</h3>
                <div className="mt-auto">
                    {onAddFavorite && !isFavorite && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddFavorite(imdbId);
                            }}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 w-full transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Agregar a Favoritos
                        </button>
                    )}
                    {isFavorite && onRemoveFavorite && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemoveFavorite(imdbId);
                            }}
                            disabled={loading}
                            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 w-full transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {loading ? <ClipLoader size={16} color="#ffffff" /> : 'Quitar de Favoritos'}
                        </button>
                    )}
                    {isFavorite && !onRemoveFavorite && (
                        <span className="text-green-400 font-semibold text-center block">Película Favorita</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
