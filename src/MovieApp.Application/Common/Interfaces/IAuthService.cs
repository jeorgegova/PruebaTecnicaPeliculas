using System.Threading.Tasks;
using MovieApp.Application.DTOs;

namespace MovieApp.Application.Common.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
        Task<AuthResponseDto> LoginAsync(LoginDto dto);
    }
}
