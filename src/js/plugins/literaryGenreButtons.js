import $ from 'jquery'
import { onLoadHtmlSucess } from '../core/includes'

const duration = 600

function filterByliteraryGenre(literaryGenre) {
    $('[wm-literaryGenre]').each(function (i, e) {
        const isTarget = $(e).attr('wm-literaryGenre') === literaryGenre || literaryGenre === null;
        const card = $(e).closest('.col-12.col-md-6.col-lg-3');
        
        if (isTarget) {
            card.removeClass('d-nome').fadeIn(duration);
        } else {
            card.fadeOut(duration, () => {
                card.addClass('d-nome');
            });
        }
    });
}


const literaryGenreButtons = $('[wm-literaryGenre-buttons]');

$.fn.literaryGenreButtons = function () {
    const cities = new Set();

    $('[wm-literaryGenre]').each(function (i, e) {
        cities.add($(e).attr('wm-literaryGenre'));
    });

    // Criação dos botões de cidade
    const btns = Array.from(cities).map(literaryGenre => {
        const btn = $('<button>')
            .addClass(['btn', 'btn-info'])
            .html(literaryGenre)
            .click(() => filterByliteraryGenre(literaryGenre)); // Callback to filter by literaryGenre
        return btn;
    });

    // Botão "Todas" que filtra todas as cidades
    const btnAll = $('<button>')
        .addClass(['btn', 'btn-info', 'active'])
        .html('Todas')
        .click(() => filterByliteraryGenre(null)); 

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
    $('[wm-literaryGenre-buttons]').literaryGenreButtons();
});
