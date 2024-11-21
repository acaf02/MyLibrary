import $ from 'jquery'
import { onLoadHtmlSucess } from '../core/includes'

const duration = 600

function filterByCity(city) {
    $('[wm-city]').each(function (i, e) {
        const isTarget = $(e).attr('wm-city') === city || city === null;
        if (isTarget) {
            $(e).parent().removeClass('d-nome'); // Mostra o item
            $(e).fadeIn(duration);
        } else {
            $(e).fadeOut(duration, () => {
                $(e).parent().addClass('d-nome'); // Esconde o item
            });
        }
    });
}

const cityButtons = $('[wm-city-buttons]');

$.fn.cityButtons = function () {
    const cities = new Set();

    // Corrigindo o erro no nome do atributo para 'wm-city'
    $('[wm-city]').each(function (i, e) {
        cities.add($(e).attr('wm-city')); // Adiciona as cidades ao Set
    });

    // Criação dos botões de cidade
    const btns = Array.from(cities).map(city => {
        const btn = $('<button>')
            .addClass(['btn', 'btn-info'])
            .html(city)
            .click(() => filterByCity(city)); // Callback para filtrar por cidade
        return btn;
    });

    // Botão "Todas" que filtra todas as cidades
    const btnAll = $('<button>')
        .addClass(['btn', 'btn-info', 'active'])
        .html('Todas')
        .click(() => filterByCity(null)); // Mostrar todas as cidades

    btns.push(btnAll);

    // Agrupar os botões em um botão de grupo
    const btnGroup = $('<div>')
        .addClass(['btn-group'])
        .append(btns); // Adiciona os botões ao grupo

    $(this).html(btnGroup); // Insere o grupo de botões no elemento alvo

    return this;
};

// Inicialização quando o conteúdo HTML for carregado
onLoadHtmlSucess(function () {
    $('[wm-city-buttons]').cityButtons(); // Aplica o método aos botões de cidade
});
