using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ClubeCampestre_WebAPI.Models
{
    [Table("dependentes")]
    public class Dependente
    {

        [Required]
        public int DependenteId { get; set; }
       
        [Required]
        public string Nome { get; set; }
        
        [Required]
        public DateTime DataDeNascimento { get; set; }
        [Required]
        public Parentesco Parentesco { get; set; }

        public int SocioId { get; set; }

        [JsonIgnore]
        public Socio Socio { get; set; }
    }

    public enum Parentesco
    {
        [Display(Name = "Cônjuge")]
        Conjuge,
        [Display(Name = "Pai")]
        Pai,
        [Display(Name = "Mãe")]
        Mae,
        [Display(Name = "Filho(a)")]
        Filho,
        [Display(Name = "Outros")]
        Outros
    }
}
