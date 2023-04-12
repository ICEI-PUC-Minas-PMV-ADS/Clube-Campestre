using System.ComponentModel.DataAnnotations;

namespace ClubeCampestre_WebAPI.Models {
    public class AuthenticateDto {

        [Required]
        public int CodigoUsuario { get; set; }
        [Required]
        public string Senha { get; set; }
    }
}
