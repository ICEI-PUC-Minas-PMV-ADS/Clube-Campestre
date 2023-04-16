$(document).ready(function() {
    $('#tabela_socios_ativos').DataTable(
    {
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json',
        },
        ajax: {
            url: `https://localhost:7013/api/Socios`,
            dataSrc: '',
        },        
        responsive: true,
        columns: [
            { data: 'cota' },
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
            [25, 50, 100, -1],
            [25, 50, 100, 'Todos'],
        ],
            'columnDefs': [ {
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
        }],
        
    }
    );

  });

$('.select_multiple').select2({
multiple: true,
placeholder: "",
});
