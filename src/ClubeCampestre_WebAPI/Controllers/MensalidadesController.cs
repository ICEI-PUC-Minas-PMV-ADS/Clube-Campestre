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

        [HttpGet("{mensalidade}")]
        public async Task<ActionResult> ListarExtratoPagamento(int pagamento)
        {
            var mensalidade = await _context.Mensalidades
            .FirstOrDefaultAsync(s => s.ValorPago == pagamento);

            if (mensalidade == null) return NotFound();

            return Ok(mensalidade);
        }

        [HttpGet("{mensalidade}")]
        public async Task<ActionResult> ListarContasAbertas(int pendente)
        {
            var mensalidade = await _context.Mensalidades
             .FirstOrDefaultAsync(s => s.DataDePagamento == pendente);

            if (mensalidade == null) return NotFound();

            return Ok(mensalidade);
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