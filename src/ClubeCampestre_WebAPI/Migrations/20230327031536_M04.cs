using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClubeCampestre_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class M04 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "dependentes",
                columns: table => new
                {
                    DependenteId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DataDeNascimento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Parentesco = table.Column<int>(type: "int", nullable: false),
                    SocioId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dependentes", x => x.DependenteId);
                    table.ForeignKey(
                        name: "FK_dependentes_socios_SocioId",
                        column: x => x.SocioId,
                        principalTable: "socios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_dependentes_SocioId",
                table: "dependentes",
                column: "SocioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "dependentes");
        }
    }
}
