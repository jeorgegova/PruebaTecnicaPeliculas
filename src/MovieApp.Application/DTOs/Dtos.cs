namespace MovieApp.Application.DTOs
{
    public record RegisterDto(string Email, string Password);
    public record LoginDto(string Email, string Password);
    public record AuthResponseDto(string Token, string Email);
    public record MovieDto(string Title, string ImdbId, string PosterUrl);
}
