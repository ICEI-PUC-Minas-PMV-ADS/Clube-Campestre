function adicionarMensalidadePorCotaDoSocio() {
    var cota = parseInt($("#num_cota").val());
    var dtVencimento = converterData($("#dt_vencimento_mensalidade_adc").val())
    var valorMensalidade = $("#valor_mensalidade").val().replace(",",".")
    $.ajax({
        type: "POST",
        url: `${BASE_URL}/Socios/${cota}/mensalidades`,
        contentType : "application/json",
        dataType: "json",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify({
            cota : parseInt($("#num_cota").val()), 
            mesAnoReferencia: $("#ano_referencia_mensalidade").val(),           
            valor: parseFloat(valorMensalidade),
            dataDeVencimento : dtVencimento    
        }),
        success: function (data) {
            console.log(data)
            criarAlerta("Mensalidade criada com sucesso!","alert-success")
            
            // Funcao para recriar a tabela quando adicionar mensalidade
            var tabelaMensalidades = $('#tabela_mensalidades').DataTable()
            tabelaMensalidades.ajax.reload();
        },
        error: function (data) {
            // if (data.mesAnoReferencia == null || data.valor == null || data.dataDeVencimento == null) {
            //     criarAlerta("Certifique-se de preencher todos os campos da mensalidade.","alert-warning") 
            // }else{
                criarAlerta(data.responseText,"alert-danger")
            //}          
        }
    });
}

function listarMensalidadesPorCotaDoSocio(cota) {
    $('#tabela_mensalidades').DataTable(
        {
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json',
            },
            ajax: {
                url: `${BASE_URL}/Socios/${cota}/mensalidades`,
                dataSrc: '',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            },        
            responsive: true,
            searching: false,
            info: false,
            paging: false,
            //ordering: false,
            order: [[4,'asc']],
            columns: [
                { data: 'mesAnoReferencia' },
                { data: 'valor', render: function(data) {
                    return "R$ " + parseFloat(data).toFixed(2).replace(".",",")
                }  },
                { data: 'valorPago', render: function(data) {
                    if (data == null){return "-";}                        
                    return "R$ " + parseFloat(data).toFixed(2).replace(".",",")
                } },
                { data: 'dataDeVencimento' },
                { data: 'dataDePagamento' },
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
                                    <i class="bi bi-check2-circle"></i>                       
                                </button>`
                        }
                        return `
                        <button class="col-auto btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modal_baixar_parcela" onclick="abrirModalBaixarMensalidade(${row.id},${row.socioId})">
                            <i class="bi bi-download"></i>                      
                        </button>`
                    }
                }            
            ],
            'columnDefs': [
                {
                    'targets': [3,4],
                    'render': DataTable.render.date(),
                },
                {
                    "targets": [2,3,4,5],
                    "className": "dt-center"
                },
                {
                    'targets': [0, 1, 2, 3, 4, 5, 6], /* column index */
                    'orderable': false /* true or false */            
                },
            ],                    
        }
    );
}

function abrirModalCriarMensalidades() {
    var parametros = listarParametrosFinanceiros();
    $('#valor_mensalidade').val(parseFloat(parametros.valorDaMensalidade).toFixed(2).replace(".",","))
}

function adicionarMensalidadeGrid() {
    var mesAnoReferencia = $("#ano_referencia_mensalidade").val()
    var valorDaMensalidade = $("#valor_mensalidade").val()
    var dataDeVencimento = $("#dt_vencimento_mensalidade_adc").val()
    if (mesAnoReferencia == "") {
        return
    }
    
    var colunaExistente = false;
    $(".mes_ano").each(function() {
    if ($(this).text() === mesAnoReferencia) {
        colunaExistente = true;
        return false; // Interrompe o loop each
    }
    });
    if (!colunaExistente) {
        $("#tabela_criar_mensalidades_body").append(`
        <tr>
            <td scope="row" class="mes_ano">${mesAnoReferencia}</td>
            <td>R$ ${valorDaMensalidade}</td>
            <td>${dataDeVencimento}</td>
            <td>
                <span class=" remove_mensalidade_lista">
                    <i class="fa fa-minus-circle" style="color: red; font-size: 20px; cursor: pointer"></i>
                </span>
            </td>
        </tr>`)
        limparCamposAdicionarMensalidade()
    }
}

function limparCamposAdicionarMensalidade() {
    $("#ano_referencia_mensalidade").val("");
    $("#dt_vencimento_mensalidade_adc").val("");
}

$("#tabela_criar_mensalidades").on("click", ".remove_mensalidade_lista", function() {
    // Encontre a linha pai do botão clicado
    var linha = $(this).closest("tr");
    // Remova a linha da tabela
    linha.remove();
  });

function adicionarMensalidadesParaTodosOsSociosAtivos() {
    var mensalidades = []

    $("#tabela_criar_mensalidades tbody tr").each(function() {
        var mesAnoReferencia = $(this).find("td:eq(0)").text();
        var valor = $(this).find("td:eq(1)").text().replace("R$ ",'');
        var dataDeVencimento = $(this).find("td:eq(2)").text();
        
        dataDeVencimento = converterData(dataDeVencimento);

        var mensalidade = {
          "mesAnoReferencia": mesAnoReferencia,
          "valor": parseFloat(valor.replace(",",".")).toFixed(2),
          "dataDeVencimento": dataDeVencimento
        };
    
        mensalidades.push(mensalidade);
    });
    console.log(mensalidades)
    
    $.ajax({
        type: "POST",
        url: `${BASE_URL}/Socios/mensalidades/lista`,
        contentType : "application/json",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify(mensalidades),
        success: function (data) {
            $("#modal_ciar_mensalidades").modal("hide")
            criarAlerta(data,"alert-success")
            // Funcao para recriar a tabela quando adicionar mensalidade
            var tabelaMensalidadesEmAberto = $('#tabela_mensalidades_em_aberto').DataTable()
            tabelaMensalidadesEmAberto.ajax.reload();
        },
        error: function (data) {
            criarAlerta(data.responseText,"alert-danger")        
        }
    });
    $("#tabela_criar_mensalidades_body").children().remove()
    limparCamposAdicionarMensalidade()
}

function abrirModalBaixarMensalidade(id,socioId) {
    $.ajax({
        type: 'GET',
        url: `${BASE_URL}/Mensalidades/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(data) {
            $("#modal_baixar_parcela").modal("show")
            data.dataDeVencimento= new Date(data.dataDeVencimento).toLocaleDateString('pt-br');
            $("#id_mensalidade_baixa").val(data.id),
            $("#mes_ano_referencia_mensalidade_baixa").val(data.mesAnoReferencia).prop("disabled",true),
            $("#valor_mensalidade_baixa").val(parseFloat(data.valor).toFixed(2).replace(".",",")).prop("disabled",true),
            $("#dt_vencimento_mensalidade_baixa").val(data.dataDeVencimento),
            $("#id_socio").val(socioId)
        }
    });
}

function baixarMensalidade() {
    var id = $("#id_mensalidade_baixa").val()
    var dtPagam = converterData($("#dt_pagamento_mensalidade_baixa").val())
    var dtVenc = converterData($("#dt_vencimento_mensalidade_baixa").val())
    var totalPago = $("#valor_mensalidade_pago_baixa").val().replace(",",".")
    $.ajax({
        type: "PUT",
        url: `${BASE_URL}/Mensalidades/${id}`,
        contentType : "application/json",
        dataType: "json",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: JSON.stringify({
            id : parseInt($("#id_mensalidade_baixa").val()),
            mesAnoReferencia : $("#mes_ano_referencia_mensalidade_baixa").val(),
            dataDeVencimento : dtVenc,
            valor : $("#valor_mensalidade_baixa").val().replace(",","."),
            dataDePagamento : dtPagam,
            valorPago: totalPago,
            socioId : parseInt($("#id_socio").val()),
        }),
        success: function () {
            $("#modal_baixar_parcela").modal("hide")
            var tabelaDependentes = $('#tabela_mensalidades').DataTable()
            tabelaDependentes.ajax.reload(); 
            var tabelaMensalidadesEmAberto = $('#tabela_mensalidades_em_aberto').DataTable()
            tabelaMensalidadesEmAberto.ajax.reload(); 
            criarAlerta("Parcela baixada com sucesso!","alert-success")

        },
        error: function () {
            $("#modal_baixar_parcela").modal("hide")             
            criarAlerta("Não foi possível baixar a Parcela.","alert-danger")
        }
    });
}