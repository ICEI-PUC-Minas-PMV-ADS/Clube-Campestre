function criarAlerta(mensagem, tipo) {
    var icon
    switch (tipo) {
        case "alert-success":
            icon = "bi-check-circle"
            break
        case "alert-warning":
            icon = "bi-exclamation-circle"
            break        
        case "alert-danger":
            icon = "bi-x-circle"
            break;
    } 
    $("body").append(`
        <div class="alert ${tipo} alert-dismissible fade show" role="alert">
            <i class="bi ${icon}"></i>
            <strong>${mensagem}</strong>
            <button type="button" class="btn-close" data-bs-target="#my-alert" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `)
    fecharAlerta()
}

function fecharAlerta() {
    setTimeout(function() {
        $(".alert").alert('close');
    }, 2000);
}

function abrirModalBaixarMensalidade(id) {
    $.ajax({
        type: 'GET',
        url: `https://localhost:7013/api/Mensalidades/${id}`,
        success: function(data) {
            $("#modal_baixar_parcela").modal("show")
            data.dataDeVencimento= new Date(data.dataDeVencimento).toLocaleDateString('pt-br');
            $("#id_mensalidade_baixa").val(data.id),
            $("#mes_ano_referencia_mensalidade_baixa").val(data.mesAnoReferencia).prop("disabled",true),
            $("#valor_mensalidade_baixa").val(data.valor).prop("disabled",true),
            $("#dt_vencimento_mensalidade_baixa").val(data.dataDeVencimento)
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
        url: `https://localhost:7013/api/Mensalidades/${id}`,
        contentType : "application/json",
        dataType: "json",
        // headers: {
        //     'Authorization': `Bearer ${token}`
        // },
        data: JSON.stringify({
            id : parseInt($("#id_mensalidade_baixa").val()),
            mesAnoReferencia : $("#mes_ano_referencia_mensalidade_baixa").val(),
            dataDeVencimento : dtVenc,
            valor : $("#valor_mensalidade_baixa").val(),
            dataDePagamento : dtPagam,
            valorPago: totalPago,
            socioId : parseInt($("#id_socio").val()),
        }),
        success: function () {
            $("#modal_baixar_parcela").modal("hide")
            var tabelaDependentes = $('#tabela_mensalidades').DataTable()
            tabelaDependentes.ajax.reload(); 
            criarAlerta("Parcela baixada com sucesso!","alert-success")

        },
        error: function () {             
            criarAlerta("Não foi possível baixar a Parcela.","alert-danger")
        }
    });
}


$('.select_multiple').select2({
    multiple: true,
    placeholder: "",
});