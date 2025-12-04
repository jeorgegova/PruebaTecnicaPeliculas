using System;
using System.Threading.Tasks;
using MovieApp.Application.Common.Interfaces;
using MovieApp.Application.DTOs;
using MovieApp.Domain.Entities;
using MovieApp.Domain.Interfaces;

namespace MovieApp.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtProvider _jwtProvider;

        public AuthService(IUserRepository userRepository, IJwtProvider jwtProvider)
        {
            _userRepository = userRepository;
            _jwtProvider = jwtProvider;
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
        {
            var user = await _userRepository.GetByEmailAsync(dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                throw new Exception("Invalid credentials");
            }

            var token = _jwtProvider.GenerateToken(user);
            return new AuthResponseDto(token, user.Email);
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
        {
            if (await _userRepository.ExistsAsync(dto.Email))
            {
                throw new Exception("User already exists");
            }

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            var user = new User
            {
                Email = dto.Email,
                PasswordHash = passwordHash
            };

            await _userRepository.AddAsync(user);
            var token = _jwtProvider.GenerateToken(user);
            return new AuthResponseDto(token, user.Email);
        }
    }
}
