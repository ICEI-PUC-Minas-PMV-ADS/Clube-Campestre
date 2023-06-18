function adicionarDependentePorCotaDoSocio() {
    var cota = parseInt($("#num_cota").val());
    var dtNascDependente = converterData($("#dt_nascimento_dependente_adc").val())
    $.ajax({
        type: "POST",
        url: `${BASE_URL}/Socios/${cota}/dependentes`,
        contentType : "application/json",
        dataType: "json",
        headers: {
            'Authorization': `Bearer ${token}`
        },
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
                url: `${BASE_URL}/Socios/${cota}/dependentes`,
                dataSrc: '',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
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
        url: `${BASE_URL}/Dependentes/${dependenteId}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
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
        url: `${BASE_URL}/Dependentes/${dependenteId}`,
        contentType : "application/json",
        dataType: "json",
        headers: {
            'Authorization': `Bearer ${token}`
        },
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
        url: `${BASE_URL}/Dependentes/${dependenteId}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function(data) {
            $("#id_dependente_exclusao").val(data.dependenteId)
        }
    });
}

function excluirDependente() {
    var dependenteId = $("#id_dependente_exclusao").val()
    $.ajax({
        type: 'DELETE',
        url: `${BASE_URL}/Dependentes/${dependenteId}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function() {
            $("#modal_excluir_dependente").modal("hide")
            criarAlerta("Dependente excluído com sucesso","alert-success")
            var tabelaDependentes = $('#tabela_dependentes').DataTable()
            tabelaDependentes.ajax.reload();        
        }
    });
}