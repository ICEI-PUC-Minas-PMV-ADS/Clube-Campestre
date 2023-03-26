﻿namespace ClubeCampestre_WebAPI.Models
{
    public class Mensalidade
    {
        public int Id { get; set; }
        public string MesAnoReferencia { get; set; }
        public DateTime DataDeVencimento { get; set; }
        public float Valor { get; set; }
        public DateTime DataDePagamento { get; set; }
        public float ValorPago { get; set; }

        public int SocioId { get; set; }
        public Socio Socio { get; set; }
    }
}