using ClubeCampestre_WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClubeCampestre_WebAPI.Controllers {
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
        public async Task<ActionResult> AdicionarUsuario(Usuario usuario) {

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("CriarUsuario", new { id = usuario.Id }, usuario);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> ListarUsuarioPorId(int id) {
            var usuario = await _context.Usuarios
            .FirstOrDefaultAsync(s => s.Id == id);

            if (usuario == null) return NotFound();

            return Ok(usuario);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditarUsuario(int id, Usuario usuario) {

            if (id != usuario.Id) return BadRequest();

            var modeloDb = await _context.Usuarios.AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (modeloDb == null) return NotFound();

            _context.Usuarios.Update(usuario);
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


    }
}