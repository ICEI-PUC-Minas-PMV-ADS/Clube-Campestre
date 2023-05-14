function converterData(data) {
    const [dia, mes, ano] = data.split('/')
    var dataConvertida = new Date(+ano, +mes - 1, +dia, +00, +00, +00, +000)
    return dataConvertida
}

$("#btnFiltrar").click(function () {
    $("#situacao_financeira").val("");
    $("#cadastro_socio :input").prop("disabled",false);
    $("#cadastro_dependentes :input").prop("disabled",false);
    $("#cadastro_mensalidades :input").prop("disabled",false);
    $("#dt_vencimento_mensalidade_adc").prop("disabled",true);
    $('#tabela_dependentes').DataTable().clear().destroy()
    $('#tabela_mensalidades').DataTable().clear().destroy()
    var cota = $("#filtro_num_cota").val();
    if (cota !== null && cota !== undefined && cota !== "" && cota !== " ") {
        listarSocioPorCota(cota);
    }
    else{
        criarAlerta("Preencher o número da cota que deseja consultar.","alert-warning")
    }
}
)

// $("#aba-financeiro").click(function() {
//     var tabelaMensalidades = $('#tabela_mensalidades').DataTable()
//     tabelaMensalidades.ajax.reload();
// })

function limparFormulario() {    
    $("#filtro_num_cota").val("");
    $("#cadastro_socio")[0].reset();
    $("#cadastro_dependentes")[0].reset();
    $("#situacao_financeira").val("");
    $("#cadastro_socio :input").prop("disabled",false);
    $("#cadastro_dependentes :input").prop("disabled",false);
    $("#cadastro_mensalidades :input").prop("disabled",false);
    $("#dt_vencimento_mensalidade_adc").prop("disabled",true);
    $('#tabela_dependentes').DataTable().clear().destroy()
    $('#tabela_mensalidades').DataTable().clear().destroy()
}

function desabilitarCamposDoFormulario() {
    $("#filtro_num_cota").val("");
    $("#cadastro_socio :input").prop("disabled",true);
    $("#cadastro_dependentes :input").prop("disabled",true);
    $("#cadastro_mensalidades :input").prop("disabled",true);
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
    const diaVencimento = 11
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

$(document).ready(function(){
    $('#cpf').mask('000.000.000-00');
    $('#cep').mask('00.000-000');
    $('.data').mask('00/00/0000');
    $('.telefone').mask('(00) 00000-0000');
    $('#valor_mensalidade').maskMoney({allowNegative: false, thousands:'.', decimal:',', affixesStay: false});
    $('#valor_mensalidade_pago_baixa').maskMoney({allowNegative: false, thousands:'.', decimal:',', affixesStay: false}); 
});


function adicionarSocio() {
    var dtAssc = converterData($("#dt_associacao").val())
    var dtNasc = converterData($("#dt_nascimento").val())
    $.ajax({
        type: "POST",
        url: `https://localhost:7013/api/Socios/`,
        contentType : "application/json",
        dataType: "json",
        // headers: {
        //     'Authorization': `Bearer ${token}`
        // },
        data: JSON.stringify({
            cota : parseInt($("#num_cota").val()),
            dataDeAssociacao : dtAssc,
            nome : $("#nome_completo").val(),
            condicao : parseInt($("#condicao_socio").val()),
            cpf : $("#cpf").val(),
            identidade : $("#identidade").val(),
            dataDeNascimento : dtNasc,            
            cep : $("#cep").val(),
            logradouro : $("#rua").val(),
            numero : $("#numero").val(),
            bairro : $("#bairro").val(),
            cidade : $("#cidade").val(),
            uf : $("#uf").val(),
            complemento : $("#complemento").val(),
            email : $("#email").val(),
            telefonePrincipal : $("#telefone_principal").val(),
            telefoneSecundario : $("#telefone_secundario").val(),
            situacaoFinanceira : 0,
            usuarioId : 1
        }),
        success: function () {
            criarAlerta("Cadastro do sócio criado com sucesso!","alert-success")              
        },
        error: function () {
            criarAlerta("Não foi possível cadastrar o sócio.","alert-danger")            
        }
    });
}

function listarSocioPorCota(cota) {
    $("#id_socio").val("..."),
    $("#num_cota").val("..."),
    $("#dt_associacao").val("..."),
    $("#nome_completo").val("..."),
    $("#condicao_socio").val("..."),
    $("#cpf").val("..."),
    $("#identidade").val("..."),
    $("#dt_nascimento").val("..."),            
    $("#cep").val("..."),
    $("#rua").val("..."),
    $("#numero").val("..."),
    $("#bairro").val("..."),
    $("#cidade").val("..."),
    $("#uf").val("..."),
    $("#complemento").val("..."),
    $("#email").val("..."),
    $("#telefone_principal").val("..."),
    $("#telefone_secundario").val("..."),
    $("#situacao_financeira").val("...")
    $.ajax({
        type: "GET",
        url: `https://localhost:7013/api/Socios/${cota}`,
        contentType : "application/json",
        // headers: {
        //     'Authorization': `Bearer ${token}`
        // },
        success: function (data) {
            data.dataDeAssociacao = new Date(data.dataDeAssociacao).toLocaleDateString('pt-br');
            data.dataDeNascimento= new Date(data.dataDeNascimento).toLocaleDateString('pt-br');
            $("#id_socio").val(data.id),
            $("#num_cota").val(data.cota),
            $("#dt_associacao").val(data.dataDeAssociacao),
            $("#nome_completo").val(data.nome),
            $("#condicao_socio").val(data.condicao),
            $("#cpf").val(data.cpf),
            $("#identidade").val(data.identidade),
            $("#dt_nascimento").val(data.dataDeNascimento),            
            $("#cep").val(data.cep),
            $("#rua").val(data.logradouro),
            $("#numero").val(data.numero),
            $("#bairro").val(data.bairro),
            $("#cidade").val(data.cidade),
            $("#uf").val(data.uf),
            $("#complemento").val(data.complemento),
            $("#email").val(data.email),
            $("#telefone_principal").val(data.telefonePrincipal),
            $("#telefone_secundario").val(data.telefoneSecundario),
            $("#situacao_financeira").val(data.situacaoFinanceira)

            /// Trazer os Dependentes e Mensalidades do Sócio
            listarDependentesPorCotaDoSocio(cota)         
            listarMensalidadesPorCotaDoSocio(cota) 

            $("#num_cota").prop("disabled", true)
            $("#situacao_financeira").prop("disabled", true)

            if (parseInt(data.condicao) == 3) {
                desabilitarCamposDoFormulario()
            }

            criarAlerta("Dados do sócio listados com sucesso!","alert-success")            
        },
        error: function (data) {
            criarAlerta(data.responseText,"alert-warning")              
        }
    });
}

function editarSocio(cota) {
    var dtAssc = converterData($("#dt_associacao").val())
    var dtNasc = converterData($("#dt_nascimento").val())
    $.ajax({
        type: "PUT",
        url: `https://localhost:7013/api/Socios/${cota}`,
        contentType : "application/json",
        dataType: "json",
        // headers: {
        //     'Authorization': `Bearer ${token}`
        // },
        data: JSON.stringify({
            id : parseInt($("#id_socio").val()),
            cota : parseInt(cota),
            dataDeAssociacao : dtAssc,
            nome : $("#nome_completo").val(),
            condicao : parseInt($("#condicao_socio").val()),
            cpf : $("#cpf").val(),
            identidade : $("#identidade").val(),            
            dataDeNascimento : dtNasc,            
            cep : $("#cep").val(),
            logradouro : $("#rua").val(),
            numero : $("#numero").val(),
            bairro : $("#bairro").val(),
            cidade : $("#cidade").val(),
            uf : $("#uf").val(),
            complemento : $("#complemento").val(),
            email : $("#email").val(),
            telefonePrincipal : $("#telefone_principal").val(),
            telefoneSecundario : $("#telefone_secundario").val(),
            usuarioId : 1
        }),
        success: function () {
            criarAlerta("Cadastro alterado com sucesso!","alert-success")            
            limparFormulario();          
        },
        error: function () {
            criarAlerta("Ocorreu um erro ao alterar dados do sócio.","alert-danger")
        }
    });
  }


function adicionarDependentePorCotaDoSocio() {
    var cota = parseInt($("#num_cota").val());
    var dtNascDependente = converterData($("#dt_nascimento_dependente_adc").val())
    $.ajax({
        type: "POST",
        url: `https://localhost:7013/api/Socios/${cota}/dependentes`,
        contentType : "application/json",
        dataType: "json",
        // headers: {
        //     'Authorization': `Bearer ${token}`
        // },
        data: JSON.stringify({
            cota : parseInt($("#num_cota").val()),            
            nome : $("#nome_dependente_adc").val(),
            parentesco : parseInt($("#parentesco_dependente_adc").val()),        
            dataDeNascimento : dtNascDependente    
        }),
        success: function () {
            criarAlerta("Dependente adicionado com sucesso","alert-success")           
            // Funcao para recriar a tabela quando adicionar dependente
           var tabelaDependentes = $('#tabela_dependentes').DataTable()
           tabelaDependentes.ajax.reload();
        },
        error: function () {
            criarAlerta("Não foi possível adicionar o dependente.","alert-danger")             
        }
    });
}

function listarDependentesPorCotaDoSocio(cota) {
    $('#tabela_dependentes').DataTable(
        {
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json',
            },
            ajax: {
                url: `https://localhost:7013/api/Socios/${cota}/dependentes`,
                dataSrc: '',
            },        
            responsive: true,
            searching: false,
            info: false,
            paging: false,
            ordering: false,
            columns: [
                { data: 'dependenteId' },
                { data: 'nome' },
                { data: 'dataDeNascimento' },
                { data: 'parentesco',
                    render: function (data) {
                        if(data == 0){
                            return '<span>Conjuge</span>'
                        }
                        else if(data == 1){
                            return '<span>Pai</span>'
                        }
                        else if(data == 2){
                            return '<span>Mãe</span>'
                        }
                        else if(data == 3){
                            return '<span>Filho(a)</span>'
                        }
                        else if(data == 4){
                            return '<span>Outros</span>'
                        }
                    } 
                },
                {
                    render: function(data, type, row, meta){
                        return `
                        <button class="col-auto btn btn-outline-primary" id="botao_edit_dependente" data-bs-toggle="modal" data-bs-target="#modal_editar_dependente" onclick="abrirModalEditarDependente(${row.dependenteId})">
                            <i class="fa fa-pencil" aria-hidden="true"></i>                       
                        </button>
                        <button class="col-auto btn btn-outline-danger" id="botao_del_dependente"  data-bs-toggle="modal" data-bs-target="#modal_excluir_dependente" onclick="abrirModalExcluirDependente(${row.dependenteId})">
                            <i class="fa fa-trash" aria-hidden="true"></i>                       
                        </button>`
                    }
                }            
            ],
            'columnDefs': [
            {
                'targets': 2,
                'render': DataTable.render.date(),
            },
            {
                "targets": 4,
                "className": "dt-center"
            }
        ],                    
        }
        );
}

function abrirModalEditarDependente(dependenteId) {
    $.ajax({
        type: 'GET',
        url: `https://localhost:7013/api/Dependentes/${dependenteId}`,
        success: function(data) {
            data.dataDeNascimento= new Date(data.dataDeNascimento).toLocaleDateString('pt-br');
            $("#id_dependente_edit").val(data.dependenteId),
            $("#nome_dependente_edit").val(data.nome),
            $("#dt_nascimento_dependente_edit").val(data.dataDeNascimento),
            $("#parentesco_dependente_edit").val(data.parentesco)
        }
    });
}

function editarDependente() {
    var dependenteId = $("#id_dependente_edit").val()
    var dtNasc = converterData($("#dt_nascimento_dependente_edit").val())
    $.ajax({
        type: "PUT",
        url: `https://localhost:7013/api/Dependentes/${dependenteId}`,
        contentType : "application/json",
        dataType: "json",
        // headers: {
        //     'Authorization': `Bearer ${token}`
        // },
        data: JSON.stringify({
            dependenteId : parseInt($("#id_dependente_edit").val()),
            nome : $("#nome_dependente_edit").val(),
            parentesco : parseInt($("#parentesco_dependente_edit").val()),
            dataDeNascimento : dtNasc,            
            socioId : parseInt($("#id_socio").val()),
        }),
        success: function () {
            $("#modal_editar_dependente").modal("hide")
            var tabelaDependentes = $('#tabela_dependentes').DataTable()
            tabelaDependentes.ajax.reload(); 
            criarAlerta("Dependente atualizado com sucesso!","alert-success")

        },
        error: function () {             
            criarAlerta("Erro a salvar alterações no registro do Dpendente!","alert-danger")
        }
    });
}

function abrirModalExcluirDependente(dependenteId) {
    $.ajax({
        type: 'GET',
        url: `https://localhost:7013/api/Dependentes/${dependenteId}`,
        success: function(data) {
            $("#id_dependente_exclusao").val(data.dependenteId)
        }
    });
}

function excluirDependente() {
    var dependenteId = $("#id_dependente_exclusao").val()
    $.ajax({
        type: 'DELETE',
        url: `https://localhost:7013/api/Dependentes/${dependenteId}`,
        success: function() {
            $("#modal_excluir_dependente").modal("hide")
            criarAlerta("Dependente excluído com sucesso","alert-success")
            var tabelaDependentes = $('#tabela_dependentes').DataTable()
            tabelaDependentes.ajax.reload();        
        }
    });
}

function adicionarMensalidadePorCotaDoSocio() {
    var cota = parseInt($("#num_cota").val());
    var dtVencimento = converterData($("#dt_vencimento_mensalidade_adc").val())
    var valorMensalidade = $("#valor_mensalidade").val().replace(",",".")
    $.ajax({
        type: "POST",
        url: `https://localhost:7013/api/Socios/${cota}/mensalidades`,
        contentType : "application/json",
        dataType: "json",
        // headers: {
        //     'Authorization': `Bearer ${token}`
        // },
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
            if (data.mesAnoReferencia == null || data.valor == null || data.dataDeVencimento == null) {
                criarAlerta("Certifique-se de preencher todos os campos da mensalidade.","alert-warning") 
            }else{
                criarAlerta(data.responseText,"alert-danger")
            }          
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
                url: `https://localhost:7013/api/Socios/${cota}/mensalidades`,
                dataSrc: '',
            },        
            responsive: true,
            searching: false,
            info: false,
            paging: false,
            //ordering: false,
            order: [[4,'asc']],
            columns: [
                { data: 'mesAnoReferencia' },
                { data: 'valor' },
                { data: 'valorPago'},
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
                                    <i class="fa fa-check-square-o" aria-hidden="true"></i>                       
                                </button>`
                        }
                        return `
                        <button class="col-auto btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modal_baixar_parcela" onclick="abrirModalBaixarMensalidade(${row.id})">
                            <i class="fa fa-check-square-o" aria-hidden="true"></i>                       
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
                    'targets': [0, 1, 2, 3, 4, 5, 6], /* column index */
                    'orderable': false /* true or false */            
                },
            ],                    
        }
    );
}

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
