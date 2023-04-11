using ClubeCampestre_WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClubeCampestre_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SociosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SociosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> AdicionarSocio(Socio socio)
        {
            var cotaJaExiste = await _context.Socios.FirstOrDefaultAsync(s => s.Cota == socio.Cota) != null;

            if (cotaJaExiste)
                return StatusCode(StatusCodes.Status405MethodNotAllowed);

            _context.Socios.Add(socio);
            await _context.SaveChangesAsync();

            return CreatedAtAction("ListarSocioPorCota", new { cota = socio.Cota }, socio);
        }


        [HttpGet]
        public async Task<ActionResult> ListarSociosAtivos()
        {
            var socios = await _context.Socios
            .Include(t => t.Dependentes)
            .Include(m => m.Mensalidades)
            .Where(s => s.Condicao != CondicaoDoSocio.Inativo)
            .ToListAsync();

            return Ok(socios);
        }

        [HttpGet("{cota}")]
        public async Task<ActionResult> ListarSocioPorCota(int cota)
        {
            var socio = await _context.Socios
            .Include(t => t.Dependentes)
            .FirstOrDefaultAsync(s => s.Cota == cota);  

            if (socio == null) return NotFound();

            return Ok(socio);
        }

        [HttpPut("{cota}")]
        public async Task<ActionResult> EditarSocio(int cota, Socio socio)
        {

            if (cota != socio.Cota) return BadRequest();

            var modeloDb = await _context.Socios.AsNoTracking()
                .FirstOrDefaultAsync(c => c.Cota == cota);

            if (modeloDb == null) return NotFound();

            _context.Socios.Update(socio);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch("{cota}")]
        public async Task<ActionResult> InativarSocio(int cota, Socio socio)
        {
            if (cota != socio.Cota) return BadRequest();

            socio.Condicao = CondicaoDoSocio.Inativo;

            var modeloDb = await _context.Socios.AsNoTracking()
                .FirstOrDefaultAsync(c => c.Cota == cota);

            if (modeloDb == null) return NotFound();

            _context.Socios.Update(socio);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //[HttpPut("{cota}/condicao}")]
        //public async Task<ActionResult> ReativarSocio(int cota, int condicao, Socio socio)
        //{

        //    if (cota != socio.Cota) return BadRequest();

        //    socio.Condicao = (CondicaoDoSocio)condicao;

        //    var modeloDb = await _context.Socios.AsNoTracking()
        //        .FirstOrDefaultAsync(c => c.Cota == cota);

        //    if (modeloDb == null) return NotFound();

        //    _context.Socios.Update(socio);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}


        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoverSocio(int id)
        {

            var socio = await _context.Socios.FindAsync(id);

            if (socio == null) return NotFound();

            _context.Socios.Remove(socio);
            await _context.SaveChangesAsync();

            return NoContent();

        }


        [HttpGet("{cota}/dependentes")]
        public async Task<ActionResult> ListarDependentesPorCotaDoSocio(int cota)
        {
            var socio = await _context.Socios
            .Include(t => t.Dependentes)
            .FirstOrDefaultAsync(s => s.Cota == cota);

            if (socio == null) return NotFound();            

            return Ok(socio.Dependentes);
        }

        [HttpPost("{cota}/dependentes")]
        public async Task<ActionResult> AdicionarDependentePorCotaDoSocio(int cota, Dependente dependente)
        {
            var socio = await _context.Socios
           .Include(t => t.Dependentes)
           .FirstOrDefaultAsync(s => s.Cota == cota);

            dependente.SocioId = socio.Id;

            _context.Dependentes.Add(dependente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("ListarDependentePorId","Dependentes", new {id = dependente.DependenteId }, dependente);
        }
    }
}
