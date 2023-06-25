$(document).ready(function() {
    var parametros = listarParametrosFinanceiros()
    $('#valor_mensalidade').val(parseFloat(parametros.valorDaMensalidade).toFixed(2).replace(".",","))
    $('#dia_vencimento_parametrizacao').val(parseInt(parametros.diaDeVencimento))
    $('#valor_mensalidade, #valor_mensalidade_pago_baixa').maskMoney({allowNegative: false, thousands:'.', decimal:',', affixesStay: false}); 
    $("#btnReativarSocio, #btnInativarSocio").hide()
})

$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const cotaSocio = urlParams.get('cota'); 
    
    if (cotaSocio) {
        listarSocioPorCota(cotaSocio)       
    }  

})

$("#btnBuscar").click(function () {
    buscarSocioPorCota()
}
)

$("#filtro_num_cota").blur(function () {
    buscarSocioPorCota()
}
)

function buscarSocioPorCota() {
    var cota = $("#filtro_num_cota").val();
    if (cota !== null && cota !== undefined && cota !== "" && cota !== " ") {
        $("#cadastro_socio :input, #cadastro_dependentes :input").prop("disabled",false);
        $('#tabela_dependentes, #tabela_mensalidades').DataTable().clear().destroy()
        $("#btnReativarSocio, #btnInativarSocio").hide()
        listarSocioPorCota(cota);
    }
    else{
        criarAlerta("Preencha o número da cota que deseja consultar.","alert-warning")
    }
}

function limparFormulario() {    
    $("#filtro_num_cota").val("");
    $("#cadastro_socio, #cadastro_dependentes")[0].reset();
    $("#situacao_financeira, #ano_referencia_mensalidade, #dt_vencimento_mensalidade_adc").val("");
    $("#cadastro_socio :input").prop("disabled",false);
    $("#cadastro_dependentes :input, #ano_referencia_mensalidade, #dt_vencimento_mensalidade_adc, #num_cota").prop("disabled",true);
    $(".botaoAdicionar").css("pointer-events", "none");
    $(".botaoAdicionar").addClass("disabled");
    $('#tabela_dependentes, #tabela_mensalidades').DataTable().clear().destroy()
    $("#btnReativarSocio").hide()
    $("#btnInativarSocio").hide()
}

function desabilitarCamposDoFormulario() {
    $("#filtro_num_cota").val("");
    $(`#cadastro_socio :input, 
        #cadastro_dependentes :input, 
        #cadastro_mensalidades :input`
    ).prop("disabled",true);
}

$("#btnSalvar").click(function () {
    var idSocio = $("#id_socio").val();
    var cota = $("#num_cota").val();
    adicionarEditarSocio(idSocio, cota);
}
)

function adicionarEditarSocio(id, cota) {
    if (id == null || id == undefined || id == 0) {
        adicionarSocio()
    }
    else{
        editarSocio(cota)
    }
}

$(document).ready(function(){
    $('#cpf').mask('000.000.000-00');
    $('#cep').mask('00.000-000');
    $('.data').mask('00/00/0000');
    $('.telefone').mask('(00) 00000-0000');
    $('#valor_mensalidade').maskMoney({allowNegative: false, thousands:'.', decimal:',', affixesStay: false});
    $('#valor_mensalidade_pago_baixa').maskMoney({allowNegative: false, thousands:'.', decimal:',', affixesStay: false}); 
});




(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


// ------------- VALIDAÇÃO DE CEP ------------ //

$(document).ready(function() {

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
        $("#ibge").val("");
    }
    
    //Quando o campo cep perde o foco.    
    $("#cep").blur(function() {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#rua").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");
                $("#ibge").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#rua").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
                        $("#ibge").val(dados.ibge);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
});
