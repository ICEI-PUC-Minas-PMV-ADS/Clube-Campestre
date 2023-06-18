$(document).ready(function() {
    listarParametrosFinanceiros()
    $('#btnCancelarEdicao').hide()
    $('#valor_mensalidade_parametrizacao').maskMoney({allowNegative: false, thousands:'.', decimal:',', affixesStay: false});
    $('#valor_convite_parametrizacao').maskMoney({allowNegative: false, thousands:'.', decimal:',', affixesStay: false}); 
    $('#valor_mensalidade').maskMoney({allowNegative: false, thousands:'.', decimal:',', affixesStay: false}); 
    $('#valor_mensalidade_pago_baixa').maskMoney({allowNegative: false, thousands:'.', decimal:',', affixesStay: false}); 
})

$(document).ready(function() {
    $('#tabela_mensalidades_em_aberto').DataTable(
    {
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json',
        },
        ajax: {
            type: "GET",
            url: `${BASE_URL}/Mensalidades/em-aberto`,
            contentType : "application/json",
            dataType: "json",    
            dataSrc: '',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        },        
        responsive: true,
        columns: [
            { data: 'socio.cota',
                render: function (data) {
                    return `<a class="consultar_cota" onclick="consultarCadastroDoSocio(${data})">${data}</a>`
                }
             },
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
            { data: 'valor', render: function(data) {
                return "R$ " + parseFloat(data).toFixed(2).replace(".",",")
            } },
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
                    <button class="col-auto btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modal_baixar_parcela" onclick="abrirModalBaixarMensalidade(${row.id},${row.socioId})">
                        <i class="fa fa-check-square-o" aria-hidden="true"></i>                       
                    </button>`
                }
            } 
        ],
        order: [[7, 'asc'], [4,'asc']],
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
                "targets": [3,6,7],
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

function abirModalImportarArquivo() {
    $("#corpo-pagina").append(`
        <div class="modal" id="modal_importar_arquivo" tabindex="-1" data-bs-keyboard="false" role="dialog" aria-labelledby="uploadingLabel">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div id="corpo-modal-arquivo" class="modal-body text-center">
                        <h4 id="titulo_modal_arquivo">Selecionar Arquivo</h4>                                                    
                        <input class="form-control file" type="file" id="arquivoCNAB">                                             
                        <button id="processar_arquivo" type="submit" class="col-auto btn botao-padrao" onclick="ProcessarArquivoCNABParaBaixaDeMensalidades()"><i class="bi bi-file-earmark-break"></i> Processar</button>
                    </div>
                </div>
            </div>
        </div>
    `)
    $("#modal_importar_arquivo").modal('show')
}


function AtualizarSituacaoFinanceiraDosSocios() {
    $.ajax({
        type: "PUT",
        url: `${BASE_URL}/Socios/situacao-financeira`,
        contentType : "application/json",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        beforeSend: function () {
            abirModalLoader('Atualizando Situação Financeira dos Sócios')
        },  
        success: function (data) {
            fecharModalLoader()            
            var tabelaMensalidadesEmAberto = $('#tabela_mensalidades_em_aberto').DataTable()
            tabelaMensalidadesEmAberto.ajax.reload(); 
            criarAlerta(data,"alert-success")
        },
        error: function (data) { 
            setTimeout(function() {
                fecharModalLoader()         
            }, 750); 
            criarAlerta("Falha ao atualizar a situação financeira dos Sócios","alert-danger")
        }
    });
}

function resetarFiltros() {   
    $("#condicao_socio").select2("val", 0)
    $("#situacao_financeira").select2("val", 0);
    $('#tabela_socios_ativos').DataTable().reload()
}