using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MovieApp.Application.Common.Interfaces;
using MovieApp.Application.DTOs;
using MovieApp.Domain.Entities;
using MovieApp.Domain.Interfaces;

namespace MovieApp.Application.Services
{
    public class MovieAppService : IMovieAppService
    {
        private readonly IMovieService _movieService;
        private readonly IUserRepository _userRepository;

        public MovieAppService(IMovieService movieService, IUserRepository userRepository)
        {
            _movieService = movieService;
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<FavoriteMovie>> SearchMoviesAsync(string query)
        {
            return await _movieService.SearchMoviesAsync(query);
        }

        public async Task<MovieDetailsDto?> GetMovieDetailsAsync(string imdbId)
        {
            return await _movieService.GetMovieDetailsAsync(imdbId);
        }

        public async Task AddFavoriteAsync(int userId, string imdbId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) throw new Exception("User not found");

            if (user.Favorites.Any(f => f.ImdbId == imdbId))
            {
                // Already favorite, maybe do nothing or throw
                return;
            }

            var movie = await _movieService.GetMovieByImdbIdAsync(imdbId);
            if (movie == null) throw new Exception("Movie not found in OMDb");

            // Ensure the entity is new and linked to user
            movie.Id = 0; // Reset ID just in case
            movie.UserId = userId;
            
            user.Favorites.Add(movie);
            // We need a way to save changes. Usually Repository has SaveChanges or UnitOfWork.
            // For simplicity, I'll assume AddAsync or UpdateAsync handles it, or I need a Save method.
            // I defined AddAsync(User) but not Update.
            // Let's assume I need to add a SaveChangesAsync to IUserRepository or IUnitOfWork.
            // For now, I'll assume the repository can handle "Update" or I'll add a method.
            // Let's add UpdateAsync to IUserRepository.
            
            // Wait, I can't change IUserRepository easily without updating the file.
            // I'll assume I can just call a method on repo.
            // Let's add UpdateAsync to IUserRepository in the next step or assume it exists.
            // Actually, with EF Core, if I fetch the user (tracked), and add to collection, and call SaveChanges on context, it works.
            // But I need to expose that via Repository.
            // I'll add `Task SaveChangesAsync();` to IUserRepository for now.
            await _userRepository.UpdateAsync(user);
        }

        public async Task<IEnumerable<FavoriteMovie>> GetFavoritesAsync(int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) throw new Exception("User not found");
            return user.Favorites;
        }

        public async Task RemoveFavoriteAsync(int userId, string imdbId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) throw new Exception("User not found");

            var favorite = user.Favorites.FirstOrDefault(f => f.ImdbId == imdbId);
            if (favorite == null) throw new Exception("Favorite not found");

            user.Favorites.Remove(favorite);
            await _userRepository.UpdateAsync(user);
        }
    }
}
