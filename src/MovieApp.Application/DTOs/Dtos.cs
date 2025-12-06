namespace MovieApp.Application.DTOs
{
    public record RegisterDto(string Email, string Password);
    public record LoginDto(string Email, string Password);
    public record AuthResponseDto(string Token, string Email);
    public record MovieDto(string Title, string ImdbId, string PosterUrl);

    public record MovieDetailsDto(
        string Title,
        string Year,
        string Rated,
        string Released,
        string Runtime,
        string Genre,
        string Director,
        string Writer,
        string Actors,
        string Plot,
        string Language,
        string Country,
        string Awards,
        string Poster,
        List<MovieRatingDto> Ratings,
        string Metascore,
        string ImdbRating,
        string ImdbVotes,
        string ImdbID,
        string Type,
        string DVD,
        string BoxOffice,
        string Production,
        string Website,
        string Response
    );

    public record MovieRatingDto(string Source, string Value);
}
