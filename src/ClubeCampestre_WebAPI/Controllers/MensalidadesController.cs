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
        public async Task<ActionResult> ListarMensalidade() {
            var mensalidade = await _context.Mensalidades.ToListAsync();

            return Ok(mensalidade);
        }
  [HttpPost]
        public async Task<ActionResult> AdicionarMensalidade(Mensalidade mensalidade) {

            _context.Mensalidades.Add(mensalidade);
            await _context.SaveChangesAsync();

            return CreatedAtAction("CriarMensalidade", new { id = mensalidade.Id }, mensalidade);
        }

       [HttpGet("{id}")]
        public async Task<ActionResult> ListarMensalidadePorId(int id) {
            var mensalidade = await _context.Mensalidades
            .FirstOrDefaultAsync(s => s.Id == id);

            if (mensalidade == null) return NotFound();

            return Ok(mensalidade);
        }

    }
}