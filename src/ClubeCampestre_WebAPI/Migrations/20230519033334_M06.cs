using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClubeCampestre_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class M06 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "parametros_financeiros",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ValorDaMensalidade = table.Column<float>(type: "real", nullable: false),
                    ValorPorDependente = table.Column<float>(type: "real", nullable: false),
                    DiaDeVencimento = table.Column<int>(type: "int", nullable: false),
                    UsuarioId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_parametros_financeiros", x => x.Id);
                    table.ForeignKey(
                        name: "FK_parametros_financeiros_usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_parametros_financeiros_UsuarioId",
                table: "parametros_financeiros",
                column: "UsuarioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "parametros_financeiros");
        }
    }
}
