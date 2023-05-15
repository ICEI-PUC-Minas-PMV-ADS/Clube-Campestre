$(document).ready(function() {
    $('#tabela_mensalidades_em_aberto').DataTable(
    {
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json',
        },
        ajax: {
            type: "GET",
            url: `https://localhost:7013/api/Mensalidades/em-aberto`,
            contentType : "application/json",
            dataType: "json",    
            dataSrc: '',
        },        
        responsive: true,
        columns: [
            { data: 'socio.cota' },
            { data: 'socio.nome' },
            { data: 'socio.cpf' },
            { data: 'socio.situacaoFinanceira',
                render: function (data) {
                    if(data == 0){
                        return '<span class="label_situacao_financeira label_regular">Regular</span>'
                    }
                    else if(data == 1){
                        return '<span class="label_situacao_financeira label_debito">Débito</span>'
                    }
                    else if(data == 2){
                        return '<span class="label_situacao_financeira label_inadimplente">Inadimplente</span>'
                    }
                } 
            },
            { data: 'mesAnoReferencia' },
            { data: 'valor' },
            { data: 'dataDeVencimento' },
            {
                render: function(data, type, row, meta){
                    var dataAtual = new Date(Date.now()).toISOString()
                    if (row.dataDePagamento != null) {
                        return '<span class="label_status_mensalidade label_paga" value=3>Pago</span>'
                    }
                    else {
                        if (row.dataDeVencimento >= dataAtual) {
                            return '<span class="label_status_mensalidade label_a_vencer" value=2>À Vencer</span>'
                        }                         
                        return '<span class="label_status_mensalidade label_vencida" value=1>Vencida</span>'                            
                    }
                }
            },
            {
                render: function(data, type, row, meta){
                    if (row.dataDePagamento != null) {
                        return `
                            <button disabled class="col-auto btn btn-sm btn-primary"">
                                <i class="fa fa-check-square-o" aria-hidden="true"></i>                       
                            </button>`
                    }
                    return `
                    <button class="col-auto btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modal_baixar_parcela" onclick="abrirModalBaixarMensalidade(${row.id})">
                        <i class="fa fa-check-square-o" aria-hidden="true"></i>                       
                    </button>`
                }
            } 
        ],
        lengthMenu: [
            [25, 50, 100, -1],
            [25, 50, 100, 'Todos'],
        ],
        'columnDefs': [ 
            {
                'targets': [2,5,8], /* column index */
                'orderable': false /* true or false */            
            },
            {
                "targets": [3,7],
                "className": "dt-center"
            },
            {
                'targets': 6,
                'render': DataTable.render.date(),
            }
    ],
        
    }
    );

  });

function filtrarListaDeSociosAtivos() {
    var tabelaSocios = $('#tabela_mensalidades_em_aberto').DataTable()
    tabelaSocios.ajax.reload();
}

function resetarFiltros() {   
    $("#condicao_socio").select2("val", 0)
    $("#situacao_financeira").select2("val", 0);
    $('#tabela_socios_ativos').DataTable().reload()
}