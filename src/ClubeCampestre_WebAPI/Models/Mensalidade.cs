﻿using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ClubeCampestre_WebAPI.Models
{
    [Table("mensalidades")]
    public class Mensalidade
    {
        public int Id { get; set; }
        public string MesAnoReferencia { get; set; }
        public DateTime DataDeVencimento { get; set; }
        public float Valor { get; set; }
        public DateTime? DataDePagamento { get; set; }
        public float? ValorPago { get; set; }

        public int SocioId { get; set; }
        
        public Socio Socio { get; set; }
    }
}
