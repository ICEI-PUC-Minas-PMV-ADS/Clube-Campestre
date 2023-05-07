function converterData(data) {
    const [dia, mes, ano] = data.split('/')
    var dataConvertida = new Date(+ano, +mes - 1, +dia, +00, +00, +00, +000)
    return dataConvertida
}

$("#btnFiltrar").click(function () {
    $('#tabela_dependentes').DataTable().clear().destroy()
    var cota = $("#filtro_num_cota").val();
    if (cota !== null && cota !== undefined && cota !== "" && cota !== " ") {
        listarSocioPorCota(cota);
    }
    else{
        $("body").append(`
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <i class="bi bi-exclamation-circle"></i>
            <strong>Preencher o número da cota que deseja consultar.</strong>
            <button type="button" class="btn-close" data-bs-target="#my-alert" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `)
    }
}
)

function limparFormulario() {    
    $("#filtro_num_cota").val("");
    $("#cadastro_socio")[0].reset();
    $("#cadastro_dependentes")[0].reset();
    $("#num_cota").prop("disabled", false)
    $('#tabela_dependentes').DataTable().clear().destroy()
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

$(document).ready(function(){
    $('#cpf').mask('000.000.000-00');
    $('#cep').mask('00.000-000');
    $('.data').mask('00/00/0000');
    $('.telefone').mask('(00) 00000-0000');
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
        success: function (data) {
            $("body").append(`
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <i class="bi bi-check-circle"></i>
                <strong>Cadastro do sócio criado com sucesso!</strong>
                <button type="button" class="btn-close" data-bs-target="#my-alert" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `)      
        },
        error: function () {
            $("body").append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <i class="bi bi-x-circle"></i>
                <strong>Não foi possível cadastrar o sócio.</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `)  
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
    $("#telefone_secundario").val("...")
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
            $("#telefone_secundario").val(data.telefoneSecundario)

            /// Trazer os Dependentes do Sócio
            listarDependentesPorCotaDoSocio(cota)         
            listarMensalidadesPorCotaDoSocio(cota) 

            $("#num_cota").prop("disabled", true)
            $("body").append(`
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <i class="bi bi-check-circle"></i>
                    <strong>Dados do sócio listados com sucesso!</strong>
                    <button type="button" class="btn-close" data-bs-target="#my-alert" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `)            
        },
        error: function () {
            $("body").append(`
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <i class="bi bi-exclamation-circle"></i>
                    <strong>Não foi encontrado nenhum sócio com a cota informada.</strong>
                    <button type="button" class="btn-close" data-bs-target="#my-alert" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `)    
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
            $("body").append(`
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <i class="bi bi-check-circle"></i>
                    <strong>Cadastro alterado com sucesso!</strong>
                    <button type="button" class="btn-close" data-bs-target="#my-alert" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                `)
            limparFormulario();          
        },
        error: function () {
            $("body").append(`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <i class="bi bi-x-circle"></i>
                    <strong>Ocorreu um erro ao alterar dados do sócio</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `)  
            console.log("Erro a salvar alterações no registro do Socio!")
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
        success: function (data) {
            $("body").append(`
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <i class="bi bi-check-circle"></i>
                <strong>Dependente adicionado com sucesso!</strong>
                <button type="button" class="btn-close" data-bs-target="#my-alert" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `)
            // Funcao para recriar a tabela quando adicionar dependente
           var tabelaDependentes = $('#tabela_dependentes').DataTable()
           tabelaDependentes.ajax.reload();
        },
        error: function () {
            $("body").append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <i class="bi bi-x-circle"></i>
                <strong>Não foi possível adicionar o dependente.</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `)  
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
                    render: function(){
                        return `
                        <button class="col-auto btn btn-outline-primary" id="botao_edit_dependente">
                            <i class="fa fa-pencil" aria-hidden="true"></i>                       
                        </button>
                        <button class="col-auto btn btn-outline-danger" id="botao_del_dependente">
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
            ordering: false,
            columns: [
                { data: 'mesAnoReferencia' },
                { data: 'valor' },
                { data: 'valorPago'},
                { data: 'dataDeVencimento' },
                { data: 'dataDePagamento' },
                { data: '[dataDeVencimento,dataDePagamento]',
                    render: function(data){
                        if (data.dataDePagamento != null) {
                            return '<span class="label_status_mensalidade label_paga">Pago</span>'
                        }
                        else {
                            if (data.dataDeVencimento >= Date.now()) {
                                return 'span class="label_status_mensalidade label_a_vencer">À Vencer</span>'
                            }
                            return '<span class="label_status_mensalidade label_vencida">Vencida</span>'                            
                        }
                    }
                }            
            ],
            'columnDefs': [
            {
                'targets': [3,4],
                'render': DataTable.render.date(),
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
