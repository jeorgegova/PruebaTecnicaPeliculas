using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieApp.Application.Common.Interfaces;

namespace MovieApp.Api.Controllers
{
    [ApiController]
    [Route("api/movies")]
    [Authorize]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieAppService _movieAppService;

        public MoviesController(IMovieAppService movieAppService)
        {
            _movieAppService = movieAppService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string title)
        {
            var results = await _movieAppService.SearchMoviesAsync(title);
            return Ok(results);
        }
    }
}
