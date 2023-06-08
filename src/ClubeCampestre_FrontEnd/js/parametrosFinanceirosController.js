function listarParametrosFinanceiros() {    
    var parametros
    $.ajax({
        type: 'GET',
        url: `${BASE_URL}/ParametrosFinanceiros`,
        async: false,
        success: function(data) {
            $("#id_parametros").val(data.id)
            $("#valor_mensalidade_parametrizacao").val(parseFloat(data.valorDaMensalidade).toFixed(2).replace(".",","))
            $("#valor_convite_parametrizacao").val(parseFloat(data.valorDoConvite).toFixed(2).replace(".",","))
            $("#dia_vencimento_parametrizacao").val(data.diaDeVencimento) 
            parametros = data 
        }
    });
    return parametros   
}

function editarParametrosFinanceiros() {
    $("#valor_mensalidade_parametrizacao").prop("disabled",false);
    $("#valor_convite_parametrizacao").prop("disabled",false);
    $("#dia_vencimento_parametrizacao").prop("disabled",false);
    $('#btnEditar').hide()
    $('#btnCancelarEdicao').show()
}

function cancelarEdicaoParametrosFinanceiros() {
    $("#valor_mensalidade_parametrizacao").prop("disabled",true);
    $("#valor_convite_parametrizacao").prop("disabled",true);
    $("#dia_vencimento_parametrizacao").prop("disabled",true);
    $('#btnEditar').show()
    $('#btnCancelarEdicao').hide()
}

function atualizarParametrosFinanceiros() {
    var id = parseInt($('#id_parametros').val())
    $.ajax({
        type: 'PUT',
        url: `${BASE_URL}/ParametrosFinanceiros/${id}`,
        contentType : "application/json",      
        data: JSON.stringify({
            id: id,
            valorDaMensalidade : parseFloat($("#valor_mensalidade_parametrizacao").val().replace(",",".")).toFixed(2),
            valorDoConvite : parseFloat($("#valor_convite_parametrizacao").val().replace(",",".")).toFixed(2),
            diaDeVencimento : parseInt($("#dia_vencimento_parametrizacao").val()),
            usuarioId: 1           
        }),
        success: function(data) {
            cancelarEdicaoParametrosFinanceiros()
            criarAlerta(data,"alert-success")
            listarParametrosFinanceiros()
        },
        error: function() {
            criarAlerta("Erro ao atualizar os parâmetros","alert-danger")
        }
    });
}