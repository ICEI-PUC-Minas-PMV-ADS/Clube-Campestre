using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ClubeCampestre_WebAPI.Models
{
    [Table("parametros_financeiros")]
    public class ParametroFinanceiro
    {
        [Key]
        public int Id { get; set; }
        public float ValorDaMensalidade { get; set; }
        public float ValorDoConvite { get; set; }
        public int DiaDeVencimento { get; set; }
        public int UsuarioId { get; set; }
        [JsonIgnore]
        public Usuario Usuario { get; set; }
    }
}
