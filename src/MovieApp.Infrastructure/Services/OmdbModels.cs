using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MovieApp.Infrastructure.Services
{
    public class OmdbSearchResponse
    {
        [JsonPropertyName("Search")]
        public List<OmdbMovieSummary>? Search { get; set; }
        
        [JsonPropertyName("totalResults")]
        public string? TotalResults { get; set; }
        
        [JsonPropertyName("Response")]
        public string? Response { get; set; }
    }

    public class OmdbMovieSummary
    {
        [JsonPropertyName("Title")]
        public string Title { get; set; } = string.Empty;
        
        [JsonPropertyName("Year")]
        public string Year { get; set; } = string.Empty;
        
        [JsonPropertyName("imdbID")]
        public string ImdbID { get; set; } = string.Empty;
        
        [JsonPropertyName("Type")]
        public string Type { get; set; } = string.Empty;
        
        [JsonPropertyName("Poster")]
        public string Poster { get; set; } = string.Empty;
    }

    public class OmdbMovieDetail
    {
        [JsonPropertyName("Title")]
        public string Title { get; set; } = string.Empty;
        
        [JsonPropertyName("imdbID")]
        public string ImdbID { get; set; } = string.Empty;
        
        [JsonPropertyName("Poster")]
        public string Poster { get; set; } = string.Empty;
        
        // Add other fields if needed
    }
}
