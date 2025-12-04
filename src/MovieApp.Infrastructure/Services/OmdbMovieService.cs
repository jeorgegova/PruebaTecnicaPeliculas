using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MovieApp.Application.Common.Interfaces;
using MovieApp.Domain.Entities;

namespace MovieApp.Infrastructure.Services
{
    public class OmdbMovieService : IMovieService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public OmdbMovieService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri("http://www.omdbapi.com/");
            _apiKey = configuration["OmdbApiKey"] ?? throw new ArgumentNullException("OmdbApiKey not configured");
        }

        public async Task<IEnumerable<FavoriteMovie>> SearchMoviesAsync(string query)
        {
            var response = await _httpClient.GetFromJsonAsync<OmdbSearchResponse>($"?apikey={_apiKey}&s={query}&type=movie");
            
            if (response?.Search == null)
            {
                return Enumerable.Empty<FavoriteMovie>();
            }

            return response.Search.Select(m => new FavoriteMovie
            {
                Title = m.Title,
                ImdbId = m.ImdbID,
                PosterUrl = m.Poster
            });
        }

        public async Task<FavoriteMovie?> GetMovieByImdbIdAsync(string imdbId)
        {
            var response = await _httpClient.GetFromJsonAsync<OmdbMovieDetail>($"?apikey={_apiKey}&i={imdbId}");
            
            if (response == null || string.IsNullOrEmpty(response.Title))
            {
                return null;
            }

            return new FavoriteMovie
            {
                Title = response.Title,
                ImdbId = response.ImdbID,
                PosterUrl = response.Poster
            };
        }
    }
}
