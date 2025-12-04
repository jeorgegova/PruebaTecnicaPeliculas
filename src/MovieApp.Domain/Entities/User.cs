using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MovieApp.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        
        [JsonIgnore]
        public ICollection<FavoriteMovie> Favorites { get; set; } = new List<FavoriteMovie>();
    }
}
