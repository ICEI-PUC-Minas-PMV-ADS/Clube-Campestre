using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ClubeCampestre_WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
 

namespace ClubeCampestre_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class MensalidadesController : ControllerBase {
           private readonly AppDbContext _context;

        public MensalidadesController(AppDbContext context){
                    _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> ListarMensalidades() {
            var mensalidade = await _context.Mensalidades.ToListAsync();

            return Ok(mensalidade);
        }
  [HttpPost]
        public async Task<ActionResult> AdicionarMensalidade(Mensalidade mensalidade) {

            _context.Mensalidades.Add(mensalidade);
            await _context.SaveChangesAsync();

            return CreatedAtAction("VisualizarMensalidade", new { id = mensalidade.Id }, mensalidade);
        }

       [HttpGet("{id}")]
        public async Task<ActionResult> VisualizarMensalidade (int id) {
            var mensalidade = await _context.Mensalidades
               .FirstOrDefaultAsync(c => c.Id == id);

            if (mensalidade == null) return NotFound();

            return Ok(mensalidade);
        }

        [HttpGet("socios/{idSocio}/extrato")]
        public async Task<ActionResult> ListarExtratoPagamento(int idSocio)
        {
            var mensalidade = await _context.Mensalidades
                .Where(m => m.SocioId == idSocio)
                .Where(m => m.DataDePagamento != null)
                .ToListAsync();

            if (mensalidade == null) return NotFound();

            return Ok(mensalidade);
        }

        [HttpGet("socios/{idSocio}/mensalidades")]
        public async Task<ActionResult> ListarMensalidadesEmAberto(int idSocio)
        {
            var mensalidadesEmAberto = await _context.Mensalidades
             .Where(m => m.SocioId == idSocio)
             .Where(m => m.DataDePagamento == null)
             .ToListAsync();

            if (mensalidadesEmAberto == null) return NotFound();

            return Ok(mensalidadesEmAberto);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> MarcarPagamento(int id, Mensalidade model)
        {

            if (id != model.Id) return BadRequest();

            var modeloDb = await _context.Mensalidades.AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (modeloDb == null) return NotFound();

            _context.Mensalidades.Update(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }


    }
}