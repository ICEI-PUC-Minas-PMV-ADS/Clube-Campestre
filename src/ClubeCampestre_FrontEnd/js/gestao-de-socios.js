$(document).ready(function() {
    $('#tabela_socios_ativos').DataTable(
        {
        dom: 'Bfrtip',
        buttons:[
            {
                extend: 'pdfHtml5',
                orientation: 'landscape',
                pageSize: 'LEGAL'
            },
            'excel',
            'print'
        ],
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json',
        },
        ajax: {
            type: "POST",
            url: `https://localhost:7013/api/Socios/filtrar`,
            contentType : "application/json",
            dataType: "json",    
            dataSrc: '',
            data: function(d) {
                d.condicoesDosSocios = $("#condicao_socio").select2("val");
                d.situacoesFinanceiras = $("#situacao_financeira").select2("val");
                return JSON.stringify(d);
            },
        },        
        responsive: true,
        columns: [
            { data: 'cota',
                render: function (data) {
                    return `<a class="consultar_cota" onclick="consultarCadastroDoSocio(${data})">${data}</a>`
                }
            },
            { data: 'nome' },
            { data: 'cpf' },
            { data: 'email' },
            { data: 'telefonePrincipal' },
            { data: 'dataDeAssociacao' },
            { data: 'condicao',
                render: function (data) {
                    if(data == 0){
                        return '<span>Fundador</span>'
                    }
                    else if(data == 1){
                        return '<span>Proprietário</span>'
                    }
                    else if(data == 2){
                        return '<span>Temporário</span>'
                    }
                    else if(data == 3){
                        return '<span>Inativo</span>'
                    }
                } 
            },
            { data: 'situacaoFinanceira',
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
        ],
        lengthMenu: [
            [50, 100, 150, -1],
            [50, 100, 150, 'Todos'],
        ],
        'columnDefs': [ 
            {
                'targets': [2,4], /* column index */
                'orderable': false /* true or false */            
            },
            {
                "targets": 7,
                "className": "dt-center"
            },
            {
                'targets': 5,
                'render': DataTable.render.date(),
            }
        ],
        
    }
    );

  });

$('.select_multiple').select2({
multiple: true,
placeholder: "",
});


function filtrarListaDeSociosAtivos() {
    var tabelaSocios = $('#tabela_socios_ativos').DataTable()
    tabelaSocios.ajax.reload();
}

function resetarFiltros() {   
    $("#condicao_socio").select2("val", 0)
    $("#situacao_financeira").select2("val", 0);
    $('#tabela_socios_ativos').DataTable().reload()
}