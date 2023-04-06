using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ClubeCampestre_WebAPI.Models {
    public class UsuarioDto {
        public int? Id { get; set; }
        [Required]
        public string CodigoUsuario { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string CPF { get; set; }
        [Required]
        public string Senha { get; set; }
        [Required]
        public TipoUsuario TipoUsuario { get; set; }

    }
}
