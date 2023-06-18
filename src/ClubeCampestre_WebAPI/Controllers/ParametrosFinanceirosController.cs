using ClubeCampestre_WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ClubeCampestre_WebAPI.Controllers
{
    [Authorize(Roles = "Administrador")]
    [Route("api/[controller]")]
    [ApiController]
    public class ParametrosFinanceirosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ParametrosFinanceirosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> ListarParametrosFinanceiros()
        {
            var parametros = await _context.ParametrosFinanceiros.FirstOrDefaultAsync();

            return Ok(parametros);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> AtualizarParametrosFinanceiros(ParametroFinanceiro parametro, int id)
        {
            if (id != parametro.Id) return BadRequest();

            var modeloDb = await _context.ParametrosFinanceiros.AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);

            if (modeloDb == null) return NotFound();

            _context.ParametrosFinanceiros.Update(parametro);
            await _context.SaveChangesAsync();

            return Ok("Parâmetros atualizados com sucesso!");
        }
    }
}
