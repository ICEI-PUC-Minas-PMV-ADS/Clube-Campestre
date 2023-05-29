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
            cota : 0,
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
            criarAlerta("Cadastro do sócio criado com sucesso!","alert-success")
            listarSocioPorCota(data.cota)
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
            $("#ano_referencia_mensalidade").prop("disabled", false)
            $(".botaoAdicionar").css("pointer-events", "auto");
            $(".botaoAdicionar").removeClass("disabled");

            if (parseInt(data.condicao) == 3) {
                $("#btnReativarSocio").show()
                desabilitarCamposDoFormulario()
            } else {
                $("#btnInativarSocio").show()
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

  function ativarOuInativarSocio(idcAtivacao) {
    var cota = parseInt($("#num_cota").val());
    $.ajax({
        type: "PUT",
        url: `https://localhost:7013/api/Socios/${cota}/ativacao`,
        contentType: "application/json",
        // headers: {
        //     'Authorization': `Bearer ${token}`
        // },
        data: JSON.stringify({
            cota : parseInt($("#num_cota").val()),
            condicao : parseInt(2),
            idcAtivacao : parseInt(idcAtivacao)
        }),
        success: function (data) {
            criarAlerta(data,"alert-success")
            limparFormulario()         
        },
        error: function (data) {
            criarAlerta(data,"alert-danger")
        }
    });
  }

  function reativarSocio() {
    
  }