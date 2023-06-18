const token = localStorage.getItem('token');
const idUsuario = localStorage.getItem('idUsuario');

if (!token) {
    window.location.href = "login.html"
} else{
    $(document).ready(function() {
        // Código para carregar os demais scripts após o carregamento completo
        $.getScript("./apiConfig.js");
        $.getScript("./js/menuDeNavegacao.js");
        $.getScript("./js/gestao-de-socios.js");
        $.getScript("./js/formularioCadastroSocios.js");
        $.getScript("./js/financeiro.js");
        $.getScript("./js/sociosController.js");
        $.getScript("./js/dependentesController.js");
        $.getScript("./js/mensalidadesController.js");
        $.getScript("./js/parametrosFinanceirosController.js");
        $.getScript("./js/shared.js");
      });
}