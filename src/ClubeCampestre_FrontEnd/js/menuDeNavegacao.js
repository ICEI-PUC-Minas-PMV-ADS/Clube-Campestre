function carregarMenuDeNavegacao(itemAtivo) {
    $('body').prepend(
        `<nav id="sidebar" class="active">
        <div class="sidebar-header">
            <span id="sidebarCollapse" class="btn">
                <i class="bi bi-list"></i>
            </span>
            <h3 id="titulo_clube">Clube Campestre</h3>
        </div>
        <ul class="list-unstyled components">
            <li id="item1" class="item_menu">
                <a href="./gestao-de-socios.html">
                    <i class="bi bi-people-fill"></i>
                    <span class="label-item-menu">Gestão de Sócios</span>
                </a>
            </li>
            <li id="item2" class="item_menu">
                <a href="./socio.html" data-toggle="collapse" aria-expanded="false">
                    <i class="bi bi-person-plus-fill"></i>
                    <span class="label-item-menu">Cadastro de Sócios</span>
                </a>                
            </li>
            <li id="item3" class="item_menu">
                <a href="./financeiro.html" data-toggle="collapse" aria-expanded="false">
                    <i class="bi bi-cash-stack"></i>
                    <span class="label-item-menu">Financeiro</span>
                </a>                
            </li>
        </ul>
    </nav>`
    )

    $(`#item${parseInt(itemAtivo)}`).addClass("active")
    
    $('#sidebarCollapse').on('click', function () {
        alternarSidebar();
    });    
}

function alternarSidebar() {
    $("#sidebar").toggleClass('active')

    if ($("#sidebar").hasClass('active')) {
        $("#corpo-pagina").css({marginLeft: "60px"})  
        $("#titulo_clube").hide();      
    }
    else {
        $("#corpo-pagina").css({marginLeft: "18%"}) 
        setTimeout(function() {
            $("#titulo_clube").show();
        }, 100);       
    }

}