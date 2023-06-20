function carregarPerfilDoUsuarioLogado() {
    var usuario = buscarDadosDoUsuarioLogado()
    $('#cabecalho').append(
        `<div id="perfil">
            <i style="font-size: 32px; color: #002A48;" class="bi bi-person-circle"></i>
            <p id="nome_usuario_logado" style="font-size: 20px; color: #002A48; margin-left: 10px; margin-bottom: 0; font-weight: 600;">${usuario.nome}</p>
            <button type="button" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Sair" style="border: none; background-color: #fff; margin-left: 25px;" onclick="realizarLogout()">
                <i id="icon_logout" style="font-size: 28px; color: #002A48;" class="bi bi-box-arrow-right"></i>
            </button>
        </div>`
    )
}