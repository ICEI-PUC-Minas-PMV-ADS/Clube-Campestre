$(document).ready(function() {
    carregarPerfilDoUsuarioLogado()
})

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

function abirModalLoader(mensagem) {
    $("#corpo-pagina").append(`
        <div class="modal" id="modal_carregando" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="uploadingLabel">
            <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border text-primary m-4" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          </div>
                        <div class="loader-txt">
                            <p>${mensagem}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `)
    $("#modal_carregando").modal('show')
}

function fecharModalLoader() {
    $("#modal_carregando").modal('hide')
}

function converterData(data) {
    const [dia, mes, ano] = data.split('/')
    var dataConvertida = new Date(+ano, +mes - 1, +dia, -03, +00, +00, +000)
    return dataConvertida
}

$(function() {
    $('#datepicker,#datepicker2').datepicker({
            format: 'dd/mm/yyyy',
        language: 'pt-BR'
    });       
});

$(document).ready(function() {
    $('[data-bs-toggle="tooltip"]').tooltip();
})

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


function consultarCadastroDoSocio(cota) {
    window.location.href = `socio.html?cota=${cota}`;
}

$('.select_multiple').select2({
    multiple: true,
    placeholder: "",
});

//$('.select2-selection__choice__remove').html('<i style="font-size: 14px" class="fa fa-remove">')

