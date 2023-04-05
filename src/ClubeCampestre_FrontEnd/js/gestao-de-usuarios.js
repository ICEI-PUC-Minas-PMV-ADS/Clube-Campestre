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
        columns: [
            { data: 'cota' },
            { data: 'nome' },
            { data: 'cpf' },
            { data: 'email' },
            { data: 'telefonePrincipal' },
            { data: 'dataDeAssociacao' },
            { data: 'condicao'},
            { data: 'situacaoFinanceira' },
        ],
        'columnDefs': [ {
        'targets': [2,4], /* column index */
        'orderable': false, /* true or false */
 }]
    }
    );

  });

$('.select_multiple').select2({
multiple: true,
placeholder: "",
});
