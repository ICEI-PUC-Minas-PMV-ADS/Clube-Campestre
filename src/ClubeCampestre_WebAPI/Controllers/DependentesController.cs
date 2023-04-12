using ClubeCampestre_WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClubeCampestre_WebAPI.Controllers {
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DependentesController : ControllerBase {
        private readonly AppDbContext _context;

        public DependentesController(AppDbContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> ListarDependentes() {
            var dependentes = await _context.Dependentes.ToListAsync();

            return Ok(dependentes);
        }

        [HttpPost]
        public async Task<ActionResult> AdicionarDependente(Dependente dependente) {
            
            _context.Dependentes.Add(dependente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("ListarDependentePorId", new { id = dependente.DependenteId }, dependente);
        }
                     
        [HttpGet("{id}")]
        public async Task<ActionResult> ListarDependentePorId(int id) {
            var dependente = await _context.Dependentes
            .FirstOrDefaultAsync(s => s.DependenteId == id);

            if (dependente == null) return NotFound();

            return Ok(dependente);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditarDependente(int id, Dependente dependente) {

            if (id != dependente.DependenteId) return BadRequest();

            var modeloDb = await _context.Dependentes.AsNoTracking()
                .FirstOrDefaultAsync(c => c.DependenteId == id);

            if (modeloDb == null) return NotFound();

            _context.Dependentes.Update(dependente);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoverDependente(int id) {

            var dependente = await _context.Dependentes.FindAsync(id);

            if (dependente == null) return NotFound();

            _context.Dependentes.Remove(dependente);
            await _context.SaveChangesAsync();

            return NoContent();

        }
    }
}
