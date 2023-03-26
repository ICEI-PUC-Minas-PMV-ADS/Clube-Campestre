using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace ClubeCampestre_WebAPI.Models
{
    [Table("socios")]
    public class Socio
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Cota { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Cpf { get; set; }
        public string Identidade { get; set; }
        [Required]
        public DateTime DataDeNascimento { get; set; }
        public string Cep { get; set; }
        public string Logradouro { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string Numero { get; set; }
        public string Complemento { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string TelefonePrincipal { get; set; }
        public string TelefoneSecundario { get; set; }
        [Required]
        public DateTime DataDeAssociacao { get; set; }
        [Required]
        public CondicaoDoSocio Condicao { get; set; }
        [Required]
        public SituacaoFinanceira SituacaoFinanceira { get; set; }

        public ICollection<Mensalidade> Mensalidades { get; set; }


    }
    public enum CondicaoDoSocio
    {
        [Display(Name = "Fundador")]
        Fundador,
        [Display(Name = "Proprietario")]
        Proprietario,
        [Display(Name = "Temporario")]
        Temporario,
        [Display(Name = "Inativo")]
        Inativo
    }

    public enum SituacaoFinanceira
    {
        [Display(Name = "Regular")]
        Regular,
        [Display(Name = "Debito")]
        Debito,
        [Display(Name = "Inadimplente")]
        Inadimplente
    }
}
