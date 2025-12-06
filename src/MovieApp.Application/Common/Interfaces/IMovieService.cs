using System.Collections.Generic;
using System.Threading.Tasks;
using MovieApp.Application.DTOs;
using MovieApp.Domain.Entities; // Or a DTO if we want to decouple

namespace MovieApp.Application.Common.Interfaces
{
    public interface IMovieService
    {
        Task<IEnumerable<FavoriteMovie>> SearchMoviesAsync(string query);
        Task<FavoriteMovie?> GetMovieByImdbIdAsync(string imdbId);
        Task<MovieDetailsDto?> GetMovieDetailsAsync(string imdbId);
    }
}
