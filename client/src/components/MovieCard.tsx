import React from 'react';

interface MovieProps {
    title: string;
    poster: string;
    imdbId: string;
    onAddFavorite?: (imdbId: string) => void;
    isFavorite?: boolean;
}

const MovieCard: React.FC<MovieProps> = ({ title, poster, imdbId, onAddFavorite, isFavorite }) => {
    return (
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <img src={poster !== 'N/A' ? poster : 'https://via.placeholder.com/150'} alt={title} className="w-full h-64 object-cover mb-4 rounded" />
            <h3 className="font-bold text-lg text-center mb-2">{title}</h3>
            {onAddFavorite && !isFavorite && (
                <button
                    onClick={() => onAddFavorite(imdbId)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                >
                    Add to Favorites
                </button>
            )}
            {isFavorite && (
                <span className="text-green-500 font-semibold">Favorite</span>
            )}
        </div>
    );
};

export default MovieCard;
