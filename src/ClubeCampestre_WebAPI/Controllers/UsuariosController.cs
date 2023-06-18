using ClubeCampestre_WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ClubeCampestre_WebAPI.Controllers {
    [Authorize(Roles = "Administrador")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase {

        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> ListarUsuarios() {
            var usuarios = await _context.Usuarios.ToListAsync();

            return Ok(usuarios);
        }

        [HttpPost]
        public async Task<ActionResult> AdicionarUsuario(UsuarioDto usuario) {

            Usuario novo = new Usuario() {

                CodigoUsuario = usuario.CodigoUsuario,
                Nome = usuario.Nome,
                Email = usuario.Email,
                CPF = usuario.CPF,
                Senha = BCrypt.Net.BCrypt.HashPassword(usuario.Senha),
                TipoUsuario = usuario.TipoUsuario
            };

            _context.Usuarios.Add(novo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("ListarUsuarioPorId", new { id = novo.Id }, novo);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> ListarUsuarioPorId(int id) {
            var usuario = await _context.Usuarios
            .FirstOrDefaultAsync(s => s.Id == id);

            if (usuario == null) return NotFound();

            return Ok(usuario);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditarUsuario(int id, UsuarioDto usuario) {

            if (id != usuario.Id) return BadRequest();

            var modeloDb = await _context.Usuarios.AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (modeloDb == null) return NotFound();

            modeloDb.CodigoUsuario = usuario.CodigoUsuario;
            modeloDb.Nome = usuario.Nome;
            modeloDb.Email = usuario.Email;
            modeloDb.CPF = usuario.CPF;
            modeloDb.Senha = BCrypt.Net.BCrypt.HashPassword(usuario.Senha);
            modeloDb.TipoUsuario = usuario.TipoUsuario;

            _context.Usuarios.Update(modeloDb);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoverUsuario(int id) {

            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null) return NotFound();

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [AllowAnonymous]
        [HttpPost("autenticar")]
        public async Task<ActionResult> Authenticate(AuthenticateDto usuario) {

            var usuarioDb = await _context.Usuarios.SingleOrDefaultAsync(u => u.CodigoUsuario == usuario.CodigoUsuario.ToString());

            if (usuarioDb == null || !BCrypt.Net.BCrypt.Verify(usuario.Senha, usuarioDb.Senha))

                return Unauthorized();

            var jwt = GenerateJwtToken(usuarioDb);

            return Ok(new { jwtToken = jwt, idUsuario = usuarioDb.Id });
        }

        private string GenerateJwtToken(Usuario user) {

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("Ry74cBQva5dThwbwchR9jhbtRFnJxWSZ");
            var claims = new ClaimsIdentity(new Claim[] {
                new Claim(ClaimTypes.NameIdentifier, user.CodigoUsuario.ToString()),
                new Claim(ClaimTypes.Role, user.TipoUsuario.ToString())
            });

            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = claims,
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);


        }

    }
}