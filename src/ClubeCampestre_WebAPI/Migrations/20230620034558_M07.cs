using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClubeCampestre_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class M07 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ValorPorDependente",
                table: "parametros_financeiros",
                newName: "ValorDoConvite");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ValorDoConvite",
                table: "parametros_financeiros",
                newName: "ValorPorDependente");
        }
    }
}
