const token = localStorage.getItem('token');
const idUsuario = localStorage.getItem('idUsuario');

if (!token) {
    window.location.href = "login.html"
} else{
    $(document).ready(function() {
        $('body').append(
            `<script src="./apiConfig.js"></script>
            <script src="./js/menuDeNavegacao.js"></script>
            <script src="./js/gestao-de-socios.js"></script>
            <script src="./js/formularioCadastroSocios.js"></script>
            <script src="./js/financeiro.js"></script>
            <script src="./js/sociosController.js"></script>
            <script src="./js/dependentesController.js"></script>
            <script src="./js/mensalidadesController.js"></script>
            <script src="./js/parametrosFinanceirosController.js"></script>
            <script src="./js/usuariosController.js"></script>
            <script src="./js/perfil.js"></script>
            <script src="./js/autenticacao.js"></script>
            <script src="./js/shared.js"></script>`
        )
      });
}