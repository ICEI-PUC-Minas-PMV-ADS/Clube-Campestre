using Microsoft.EntityFrameworkCore;

namespace ClubeCampestre_WebAPI.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Socio> Socios { get; set; }
        public DbSet<Mensalidade> Mensalidades { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Dependente> Dependentes { get; set; }
    }
}
