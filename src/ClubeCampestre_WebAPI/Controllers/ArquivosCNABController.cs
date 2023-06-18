using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BoletoNetCore;
using Microsoft.Win32;
using ClubeCampestre_WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Data;

namespace ClubeCampestre_WebAPI.Controllers
{
    [Authorize(Roles = "Administrador")]
    [Route("api/[controller]")]
    [ApiController]
    public class ArquivosCNABController : ControllerBase
    {
        private readonly MensalidadesController _mensalidadesController;

        public ArquivosCNABController(AppDbContext context)
        {
            _mensalidadesController = new MensalidadesController(context);
        }

        [HttpPost("processar")]
        public IActionResult ProcessarArquivoCNABParaBaixaDeMensalidades()
        {
            try
            {
                var arquivo = Request.Form.Files[0]; // Obtém o arquivo enviado

                Stream arquivoConvertido = arquivo.OpenReadStream();

                var arquivoRetorno = new ArquivoRetorno(arquivoConvertido);

                //Preenche o CPF/CNPJ do pagador no Arquivo de Retorno
                foreach (Boleto boleto in arquivoRetorno.Boletos)
                {
                    boleto.Pagador.CPFCNPJ = boleto.RegistroArquivoRetorno.Substring(342, 14);
                }

                foreach (Boleto boleto in arquivoRetorno.Boletos)
                {
                    _mensalidadesController.BaixarMensalidadePorCPFValorEDataDeVencimento(boleto.Pagador.CPFCNPJ, boleto.DataVencimento, boleto.ValorTitulo, boleto.DataCredito, boleto.ValorPago);
                }

                return Ok("Arquivo recebido e processado com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro ao processar o arquivo: " + ex.Message);
            }
        }
    }


}
