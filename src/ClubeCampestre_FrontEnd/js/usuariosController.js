function buscarDadosDoUsuarioLogado() {
    var usuario
    $.ajax({
        type: 'GET',
        url: `${BASE_URL}/Usuarios/${idUsuario}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        async: false,
        success: function(data) {
            usuario = data
        },
        error: function () {             
            criarAlerta("Erro","alert-danger")
        }
    });
    return usuario
}
