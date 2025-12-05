using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieApp.Application.Common.Interfaces;

namespace MovieApp.Api.Controllers
{
    [ApiController]
    [Route("api/favorites")]
    [Authorize]
    public class FavoritesController : ControllerBase
    {
        private readonly IMovieAppService _movieAppService;

        public FavoritesController(IMovieAppService movieAppService)
        {
            _movieAppService = movieAppService;
        }

        [HttpPost]
        public async Task<IActionResult> AddFavorite([FromBody] AddFavoriteRequest request)
        {
            try
            {
                var userId = int.Parse(User.FindFirst("id")?.Value ?? "0");
                await _movieAppService.AddFavoriteAsync(userId, request.ImdbId);
                return Ok(new { message = "Added to favorites" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetFavorites()
        {
            try
            {
                var userId = int.Parse(User.FindFirst("id")?.Value ?? "0");
                var favorites = await _movieAppService.GetFavoritesAsync(userId);
                return Ok(favorites);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{imdbId}")]
        public async Task<IActionResult> RemoveFavorite(string imdbId)
        {
            try
            {
                var userId = int.Parse(User.FindFirst("id")?.Value ?? "0");
                await _movieAppService.RemoveFavoriteAsync(userId, imdbId);
                return Ok(new { message = "Removed from favorites" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }

    public class AddFavoriteRequest
    {
        public string ImdbId { get; set; } = string.Empty;
    }
}
