// Remova a importação errada do file-loader
import $ from 'jquery';

const loadHtmlSucessCallBack = [];

// Função para adicionar o callback na lista, se não estiver já presente
export function onLoadHtmlSucess(callback) {
    if (!loadHtmlSucessCallBack.includes(callback)) {
        loadHtmlSucessCallBack.push(callback);
    }
}

// Função para carregar os includes
function loadIncludes(parent = 'body') {
    // Encontrar elementos com o atributo wm-include
    $(parent).find('[wm-include]').each(function (i, e) {
        const url = $(e).attr('wm-include'); // Pega o valor do atributo wm-include
        
        // Fazer a requisição AJAX
        $.ajax({
            url,
            success(data) {
                $(e).html(data); // Insere o conteúdo no elemento
                $(e).removeAttr('wm-include'); // Remove o atributo wm-include após a inclusão

                // Chama os callbacks registrados
                loadHtmlSucessCallBack.forEach(callback => callback(data));

                // Chama recursivamente para os filhos, se houver
                loadIncludes(e);
            }
        });
    });
}

// Chama a função inicial para carregar os includes
loadIncludes();
