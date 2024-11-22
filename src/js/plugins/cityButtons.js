import $ from 'jquery'
import { onLoadHtmlSucess } from '../core/includes'

const duration = 600

function filterByCity(city) {
    $('[wm-city]').each(function (i, e) {
        const isTarget = $(e).attr('wm-city') === city || city === null;
        if (isTarget) {
            $(e).parent().removeClass('d-nome');
            $(e).fadeIn(duration);
        } else {
            $(e).fadeOut(duration, () => {
                $(e).parent().addClass('d-nome');
            });
        }
    });
}

const cityButtons = $('[wm-city-buttons]');

$.fn.cityButtons = function () {
    const cities = new Set();

    $('[wm-city]').each(function (i, e) {
        cities.add($(e).attr('wm-city'));
    });

    // Criação dos botões de cidade
    const btns = Array.from(cities).map(city => {
        const btn = $('<button>')
            .addClass(['btn', 'btn-info'])
            .html(city)
            .click(() => filterByCity(city)); // Callback to filter by city
        return btn;
    });

    // Botão "Todas" que filtra todas as cidades
    const btnAll = $('<button>')
        .addClass(['btn', 'btn-info', 'active'])
        .html('Todas')
        .click(() => filterByCity(null)); 

    btns.push(btnAll);

    // Agrupar os botões em um botão de grupo
    const btnGroup = $('<div>')
        .addClass(['btn-group'])
        .append(btns); // Add the buttons to the group

    $(this).html(btnGroup); // Insert the button group into the target element

    return this;
};

// Initialization when HTML content is loaded
onLoadHtmlSucess(function () {
    $('[wm-city-buttons]').cityButtons();
});
