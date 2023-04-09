using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ClubeCampestre_WebAPI.Models {

    [Table("usuarios")]
    public class Usuario {

        [Key]
        public int Id { get; set; }
        [Required]
        public string CodigoUsuario { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string CPF { get; set; }
        [Required]
        [JsonIgnore]
        public string Senha { get; set; }
        [Required]
        public TipoUsuario TipoUsuario { get; set; }

        public ICollection<Socio> Socios { get; set; }

    }

    public enum TipoUsuario {
        [Display(Name = "Administrador")]
        Administrador,
        [Display(Name = "Socio")]
        Socio
    }
}
