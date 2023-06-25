function ProcessarArquivoCNABParaBaixaDeMensalidades() {      
        var arquivoInput = $('#arquivoCNAB');
        var arquivo = arquivoInput[0].files[0]; // Obtém o arquivo selecionado
    
        if (arquivo == undefined) {
            criarAlerta('Selecione um arquivo para continuar.','alert-warning')
            return
        }

        $("#modal_importar_arquivo").modal('hide')
        var formData = new FormData(); // Cria um objeto FormData
        formData.append('arquivo', arquivo); // Anexa o arquivo ao objeto FormData
    
        abirModalLoader("Processando Arquivo de baixa de Mensalidades dos Sócios...")
    
        // Faz a chamada AJAX usando a biblioteca Fetch
        fetch(`${BASE_URL}/ArquivosCNAB/processar`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        .then(function(response) {
            fecharModalLoader()
            if (response.ok) {
                console.log(response)
                criarAlerta("Arquivo processado com sucesso!",'alert-success')
                var tabelaMensalidadesEmAberto = $('#tabela_mensalidades_em_aberto').DataTable()
                tabelaMensalidadesEmAberto.ajax.reload(); 
            } else {
                criarAlerta('Erro ao processar o arquivo do banco.','alert-danger');
            }
        })
        .catch(function(error) {
            fecharModalLoader()
            criarAlerta('Erro na chamada AJAX', 'alert-danger');
            console.error('Erro na chamada AJAX:', error);
        });    
}