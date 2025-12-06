import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface MovieDetails {
    title: string;
    year: string;
    rated: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    writer: string;
    actors: string;
    plot: string;
    language: string;
    country: string;
    awards: string;
    poster: string;
    ratings: Array<{ source: string; value: string }>;
    metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    type: string;
    dvd: string;
    boxOffice: string;
    production: string;
    website: string;
    response: string;
}

interface MovieDetailsModalProps {
    movie: MovieDetails | null;
    isOpen: boolean;
    onClose: () => void;
    loading: boolean;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ movie, isOpen, onClose, loading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-3xl font-bold text-white">Detalles de la Película</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white text-2xl font-bold"
                        >
                            ×
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <ClipLoader size={50} color="#ef4444" />
                        </div>
                    ) : movie ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <img
                                    src={movie.poster !== 'N/A' ? movie.poster : 'https://via.placeholder.com/300x450'}
                                    alt={movie.title}
                                    className="w-full rounded-lg shadow-lg"
                                />
                            </div>
                            <div className="text-white space-y-4">
                                <h3 className="text-2xl font-bold">{movie.title}</h3>
                                <p className="text-gray-300">{movie.year} • {movie.rated} • {movie.runtime}</p>
                                <p className="text-gray-300"><strong>Género:</strong> {movie.genre}</p>
                                <p className="text-gray-300"><strong>Director:</strong> {movie.director}</p>
                                <p className="text-gray-300"><strong>Actores:</strong> {movie.actors}</p>
                                <p className="text-gray-300"><strong>Sinopsis:</strong> {movie.plot}</p>
                                <p className="text-gray-300"><strong>Idioma:</strong> {movie.language}</p>
                                <p className="text-gray-300"><strong>País:</strong> {movie.country}</p>
                                <p className="text-gray-300"><strong>Premios:</strong> {movie.awards}</p>
                                <p className="text-gray-300"><strong>Calificación IMDB:</strong> {movie.imdbRating}/10 ({movie.imdbVotes} votos)</p>
                                {movie.ratings && movie.ratings.length > 0 && (
                                    <div>
                                        <strong className="text-gray-300">Otras Calificaciones:</strong>
                                        <ul className="text-gray-300 ml-4">
                                            {movie.ratings.map((rating: any, index: number) => (
                                                <li key={index}>{rating.source}: {rating.value}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {movie.boxOffice && movie.boxOffice !== 'N/A' && (
                                    <p className="text-gray-300"><strong>Recaudación:</strong> {movie.boxOffice}</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p className="text-red-300 text-center py-8">Error al cargar los detalles de la película.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsModal;