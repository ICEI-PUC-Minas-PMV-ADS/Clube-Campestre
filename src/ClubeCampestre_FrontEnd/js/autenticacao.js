function autenticarUsuario() {
    $.ajax({
        type: "POST",
        url: `${BASE_URL}/Usuarios/autenticar`,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            codigoUsuario: $("#codigo_usuario").val(),
            senha: $("#senha").val()
        }),
        success: function (data) {
            localStorage.setItem('token',`${data.jwtToken}`)
            localStorage.setItem('idUsuario',`${data.idUsuario}`)
            window.location.href = '/gestao-de-socios.html'
        },
        error: function () {
            criarAlerta("Ocorreu um erro. Verifique suas credenciais e tente novamente.","alert-danger")
        }
    })

}


function realizarLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('idUsuario')
    window.location.href = '/login.html'
}