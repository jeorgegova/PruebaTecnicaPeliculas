using MovieApp.Domain.Entities;

namespace MovieApp.Application.Common.Interfaces
{
    public interface IJwtProvider
    {
        string GenerateToken(User user);
    }
}
