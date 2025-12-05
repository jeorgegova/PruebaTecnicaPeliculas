import React from 'react';

interface MovieProps {
    title: string;
    poster: string;
    imdbId: string;
    onAddFavorite?: (imdbId: string) => void;
    onRemoveFavorite?: (imdbId: string) => void;
    isFavorite?: boolean;
}

const MovieCard: React.FC<MovieProps> = ({ title, poster, imdbId, onAddFavorite, onRemoveFavorite, isFavorite }) => {
    return (
        <div className="bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 flex flex-col items-center border border-gray-700 hover:shadow-red-500/20 transition-all duration-300">
            <img src={poster !== 'N/A' ? poster : 'https://via.placeholder.com/150'} alt={title} className="w-full h-64 object-cover mb-4 rounded-lg" />
            <h3 className="font-bold text-lg text-center mb-2 text-white">{title}</h3>
            {onAddFavorite && !isFavorite && (
                <button
                    onClick={() => onAddFavorite(imdbId)}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 w-full transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                    Add to Favorites
                </button>
            )}
            {isFavorite && onRemoveFavorite && (
                <button
                    onClick={() => onRemoveFavorite(imdbId)}
                    className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 w-full transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                    Remove from Favorites
                </button>
            )}
            {isFavorite && !onRemoveFavorite && (
                <span className="text-green-400 font-semibold">Favorite Movie</span>
            )}
        </div>
    );
};

export default MovieCard;
