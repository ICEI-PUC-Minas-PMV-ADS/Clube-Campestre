using ClubeCampestre_WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClubeCampestre_WebAPI.Controllers
{
    [Authorize(Roles = "Administrador")]
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
        [AllowAnonymous]
        public async Task<ActionResult> AdicionarSocio(Socio socio)
        {
            var cotaJaExiste = await _context.Socios.FirstOrDefaultAsync(s => s.Cota == socio.Cota) != null;

            if (cotaJaExiste)
                return BadRequest("Já existe um sócio cadastrado com cota informada.");

            _context.Socios.Add(socio);
            await _context.SaveChangesAsync();

            return CreatedAtAction("ListarSocioPorCota", new { cota = socio.Cota }, socio);
        }

        [HttpPost("lista")]
        [AllowAnonymous]
        public async Task<ActionResult> AdicionarListaDeSocios(List<Socio> socios)
        {
            foreach(Socio socio in socios)
            {
                await AdicionarSocio(socio);       
            }
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("listar")]
        public async Task<ActionResult> ListarSociosAtivos()
        {
            var socios = await _context.Socios
            .Include(t => t.Dependentes)
            .Include(m => m.Mensalidades)
            .Where(s => s.Condicao != CondicaoDoSocio.Inativo)
            .ToListAsync();

            return Ok(socios);
        }

        [AllowAnonymous]
        [HttpPost("filtrar")]
        public async Task<ActionResult> FiltrarListaDeSociosAtivos(FiltroSocios filtros)
        {
            var enumCondicoesDosSocios = Enum.GetValues(typeof(CondicaoDoSocio));
            var enumSituacoesFinanceiras = Enum.GetValues(typeof(SituacaoFinanceira));

            if (filtros.CondicoesDosSocios.Count == 0)
            {
                foreach (var condicao in enumCondicoesDosSocios)
                {
                    filtros.CondicoesDosSocios.Add((int)condicao);
                }
            }

            if (filtros.SituacoesFinanceiras.Count == 0)
            {
                foreach (var situacao in enumSituacoesFinanceiras)
                {
                    filtros.SituacoesFinanceiras.Add((int)situacao);
                }
            }

            if (filtros.CondicoesDosSocios.Count == enumCondicoesDosSocios.Length && filtros.SituacoesFinanceiras.Count == enumSituacoesFinanceiras.Length)
            {
                var socios = ListarSociosAtivos();
                return Ok(socios);
            }
            else { 
                var socios = await _context.Socios
                .Include(t => t.Dependentes)
                .Include(m => m.Mensalidades)
                .Where(s => s.Condicao != CondicaoDoSocio.Inativo)
                .Where(c => filtros.CondicoesDosSocios.Contains((int)c.Condicao))
                .Where(f => filtros.SituacoesFinanceiras.Contains((int)f.SituacaoFinanceira))
                .ToListAsync();
                return Ok(socios);
            }
        }

        [HttpGet("{cota}")]
        [AllowAnonymous]
        public async Task<ActionResult> ListarSocioPorCota(int cota)
        {
            var socio = await _context.Socios
            .Include(t => t.Dependentes)
            .Include(m => m.Mensalidades)
            .FirstOrDefaultAsync(s => s.Cota == cota);  

            if (socio == null) return NotFound("Não foi encontrado nenhum sócio com a cota informada.");

            return Ok(socio);
        }

        [HttpPut("{cota}")]
        [AllowAnonymous]
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

        [HttpPut("{cota}/inativar")]
        [AllowAnonymous]
        public async Task<ActionResult> InativarSocio(int cota)
        {
            Socio socio = _context.Socios.Where(s => s.Cota == cota).FirstOrDefault();

            if (socio == null) return NotFound("Sócio não encontrado.");

            socio.Condicao = CondicaoDoSocio.Inativo;

            _context.Socios.Update(socio);
            await _context.SaveChangesAsync();

            return Ok("Cota inativada com sucesso!");
        }

        [HttpPut("{cota}/ativar")]
        [AllowAnonymous]
        public async Task<ActionResult> ReativarSocio(int cota, int condicao)
        {
            Socio socio = _context.Socios.Where(s => s.Cota == cota).FirstOrDefault();

            if (socio == null) return NotFound("Sócio não encontrado.");

            socio.Condicao = (CondicaoDoSocio)condicao;

            _context.Socios.Update(socio);
            await _context.SaveChangesAsync();

            return Ok("Cota reativada com sucesso!");
        }


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
        [AllowAnonymous]
        public async Task<ActionResult> ListarDependentesPorCotaDoSocio(int cota)
        {
            var socio = await _context.Socios
            .Include(t => t.Dependentes)
            .FirstOrDefaultAsync(s => s.Cota == cota);

            if (socio == null) return NotFound();            

            return Ok(socio.Dependentes);
        }

        [HttpPost("{cota}/dependentes")]
        [AllowAnonymous]
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

        [HttpGet("{cota}/mensalidades")]
        [AllowAnonymous]
        public async Task<ActionResult> ListarMensalidadesPorCotaDoSocio(int cota)
        {
            var socio = await _context.Socios
            .Include(t => t.Mensalidades)
            .FirstOrDefaultAsync(s => s.Cota == cota);

            if (socio == null) return NotFound();

            return Ok(socio.Mensalidades);
        }

        [HttpPost("{cota}/mensalidades")]
        [AllowAnonymous]
        public async Task<ActionResult> AdicionarMensalidadePorCotaDoSocio(int cota, Mensalidade mensalidade)
        {
            var socio = await _context.Socios
           .Include(t => t.Mensalidades)
           .FirstOrDefaultAsync(s => s.Cota == cota);

            mensalidade.SocioId = socio.Id;
            mensalidade.Id = 0;

            var mensalidadeJaCriada = await _context.Mensalidades.FirstOrDefaultAsync(m => (m.MesAnoReferencia == mensalidade.MesAnoReferencia && m.SocioId == mensalidade.SocioId)) != null;

            if (mensalidadeJaCriada)
            {
                return BadRequest("Mensalidade já criada para o sócio informado");
            }

            _context.Mensalidades.Add(mensalidade);
            await _context.SaveChangesAsync();

            return CreatedAtAction("VisualizarMensalidade", "Mensalidades", new { id = mensalidade.Id }, mensalidade);
        }

        [HttpPost("mensalidades/lista")]
        [AllowAnonymous]
        public async Task<ActionResult> AdicionarMensalidadesParaTodosOsSociosAtivos(List<Mensalidade> mensalidades)
        {
            var sociosAtivos = _context.Socios 
            .Where(s => s.Condicao != CondicaoDoSocio.Inativo)
            .ToList();

            foreach (Mensalidade mensalidade in mensalidades)            {
                foreach (var socio in sociosAtivos)
                {
                    await AdicionarMensalidadePorCotaDoSocio(socio.Cota, mensalidade);
                }
            }
            return Ok("Mensalidades criadas para os sócios ativos do clube com sucesso.");
        }

        [HttpPut("situacao-financeira")]
        [AllowAnonymous]
        public async Task<ActionResult> AtualizarSituacaoFinanceiraDosSocios()
        {
            var sociosAtivos = _context.Socios
            .Where(s => s.Condicao != CondicaoDoSocio.Inativo)
            .ToList();

            foreach (Socio socio in sociosAtivos)
            {
                var mensalidadesVencidas = _context.Mensalidades.Where(m => (m.SocioId == socio.Id && m.DataDePagamento == null && m.DataDeVencimento <= DateTime.Now));

                if (mensalidadesVencidas.Count() == 0 || mensalidadesVencidas == null)
                {
                    socio.SituacaoFinanceira = SituacaoFinanceira.Regular;
                }
                else if (mensalidadesVencidas.Count() <= 2)
                {
                    socio.SituacaoFinanceira = SituacaoFinanceira.Debito;
                }
                else
                {
                    socio.SituacaoFinanceira = SituacaoFinanceira.Inadimplente;

                }
                _context.Socios.Update(socio);
            }

            await _context.SaveChangesAsync();

            return Ok("Situação financeira dos sócios atualizada com sucesso!");
        }
    }
}
