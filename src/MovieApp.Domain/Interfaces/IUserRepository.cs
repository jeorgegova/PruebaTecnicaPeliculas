using System.Threading.Tasks;
using MovieApp.Domain.Entities;

namespace MovieApp.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByIdAsync(int id);
        Task AddAsync(User user);
        Task UpdateAsync(User user);
        Task<bool> ExistsAsync(string email);
    }
}
