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
    $("#corpo-pagina").append(`
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

function converterData(data) {
    const [dia, mes, ano] = data.split('/')
    var dataConvertida = new Date(+ano, +mes - 1, +dia, +00, +00, +00, +000)
    return dataConvertida
}

$(function() {
    $('#datepicker,#datepicker2').datepicker({
            format: 'dd/mm/yyyy',
        language: 'pt-BR'
    });       
});

$(function() {
    $('#ano_referencia_mensalidade').datepicker({
        format: 'mm/yyyy',
        minViewMode: "months",
        autoclose:true,
        language: 'pt-BR'
    });
    $('#mes_ano_referencia_mensalidade_baixa').datepicker({
        format: 'mm/yyyy',
        minViewMode: "months",
        autoclose:true,
        language: 'pt-BR'
    });     
});

$('#ano_referencia_mensalidade').change(function() {    
    var diaVencimento = parseInt($("#dia_vencimento_parametrizacao").val());
    var mesAnoReferencia = $('#ano_referencia_mensalidade').val()
    var [mesReferencia, anoReferencia] = mesAnoReferencia.split('/')    
    mesReferencia = parseInt(mesReferencia);
    anoReferencia = parseInt(anoReferencia);

    var mesVencimento
    var anoVencimento
    if (mesReferencia < 12) {
        mesVencimento = mesReferencia + 1;
        anoVencimento = anoReferencia;
    }
    else{
        mesVencimento = 1;
        anoVencimento = anoReferencia + 1;
    }

    if (mesVencimento < 10) {
        mesVencimento = `0${mesVencimento}`
    }

    $('#dt_vencimento_mensalidade_adc').val(`${diaVencimento}/${mesVencimento}/${anoVencimento}`)
})

$('.select_multiple').select2({
    multiple: true,
    placeholder: "",
});

//$('.select2-selection__choice__remove').html('<i style="font-size: 14px" class="fa fa-remove">')

