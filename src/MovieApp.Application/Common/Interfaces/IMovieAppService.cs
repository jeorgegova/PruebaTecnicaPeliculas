using System.Collections.Generic;
using System.Threading.Tasks;
using MovieApp.Application.DTOs;
using MovieApp.Domain.Entities;

namespace MovieApp.Application.Common.Interfaces
{
    public interface IMovieAppService
    {
        Task<IEnumerable<FavoriteMovie>> SearchMoviesAsync(string query);
        Task<MovieDetailsDto?> GetMovieDetailsAsync(string imdbId);
        Task AddFavoriteAsync(int userId, string imdbId);
        Task<IEnumerable<FavoriteMovie>> GetFavoritesAsync(int userId);
        Task RemoveFavoriteAsync(int userId, string imdbId);
    }
}
