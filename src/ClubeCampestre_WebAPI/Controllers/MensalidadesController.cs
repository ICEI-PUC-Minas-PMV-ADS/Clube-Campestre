using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ClubeCampestre_WebAPI.Models;
using ClubeCampestre_WebAPI.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace ClubeCampestre_WebAPI.Controllers
{
    [Authorize(Roles = "Administrador")]
    [Route("api/[controller]")]
    [ApiController]

    public class MensalidadesController : ControllerBase {
           private readonly AppDbContext _context;
           private readonly SociosController _sociosController;

        public MensalidadesController(AppDbContext context){
            _context = context;
            _sociosController = new SociosController(context);
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
        public async Task<ActionResult> GerarExtratoDePagamento(int idSocio)
        {
            var mensalidades = await _context.Mensalidades
                .Where(m => m.SocioId == idSocio)
                .Where(m => m.DataDePagamento != null)
                .ToListAsync();

            if (mensalidades == null) return NotFound();

            return Ok(mensalidades);
        }

        [HttpGet("socios/{idSocio}/mensalidades")]
        public async Task<ActionResult> ListarMensalidadesEmAbertoDoSocio(int idSocio)
        {
            var mensalidadesEmAberto = await _context.Mensalidades
             .Where(m => m.SocioId == idSocio)
             .Where(m => m.DataDePagamento == null)
             .ToListAsync();

            if (mensalidadesEmAberto == null) return NotFound();

            return Ok(mensalidadesEmAberto);
        }

        [HttpGet("em-aberto")]
        public async Task<ActionResult> ListarTodasAsMensalidadesEmAberto()
        {
            var mensalidades = await _context.Mensalidades
            .Include(s => s.Socio)
            .Where(m => m.DataDePagamento == null)
            .ToListAsync();

            return Ok(mensalidades);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> BaixarMensalidade(int id, Mensalidade model)
        {

            if (id != model.Id) return BadRequest();

            var modeloDb = await _context.Mensalidades.AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (modeloDb == null) return NotFound();

            _context.Mensalidades.Update(model);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("baixar/{cpf}/{dataDeVencimento}/{valor}")]
        public string BaixarMensalidadePorCPFValorEDataDeVencimento(string cpf, DateTime dataDeVencimento, decimal valor, DateTime dataDePagamento, decimal valorPago)
        {            
            cpf = cpf.Substring(3, 11);
            var idSocio = _sociosController.ListarIdDoSocioPorCpf(cpf);

            var mensalidadeBaixada = _context.Mensalidades
                .Where(m => m.SocioId == idSocio)
                .Where(m => m.DataDeVencimento == dataDeVencimento)
                .FirstOrDefault();          

            if (mensalidadeBaixada == null) return "Not OK";

            mensalidadeBaixada.DataDePagamento = dataDePagamento;
            mensalidadeBaixada.ValorPago = (float)valorPago;

            _context.Mensalidades.Update(mensalidadeBaixada);
            _context.SaveChanges();

            return "OK";
        }
    }
}