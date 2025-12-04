using System.Text.Json.Serialization;

namespace MovieApp.Domain.Entities
{
    public class FavoriteMovie
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string ImdbId { get; set; } = string.Empty;
        public string PosterUrl { get; set; } = string.Empty;
        public int UserId { get; set; }
        
        [JsonIgnore]
        public User? User { get; set; }
    }
}
