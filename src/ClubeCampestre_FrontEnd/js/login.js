

function autenticarUsuario() {

    $.ajax({

        type: "POST",
        url: `https://localhost:7013/api/Usuarios/authenticate`,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            codigoUsuario: $("#codigo_usuario").val(),
            senha: $("#senha").val()
        }),
        success: function (data) {
            console.log(data)
        },
        error: function () {
        }
    })

}

