import $ from 'jquery';

const loadHtmlSucessCallBack = [];

// Function to add the callback to the list, if it is not already present
export function onLoadHtmlSucess(callback) {
    if (!loadHtmlSucessCallBack.includes(callback)) {
        loadHtmlSucessCallBack.push(callback);
    }
}

// Function to load includes
function loadIncludes(parent = 'body') {
    // Find elements with the wm-include attribute
    $(parent).find('[wm-include]').each(function (i, e) {
        const url = $(e).attr('wm-include'); // Get the value of the wm-include attribute

        // Fazer a requisição AJAX
        $.ajax({
            url,
            success(data) {
                $(e).html(data);
                $(e).removeAttr('wm-include');


                // Call registered callbacks
                loadHtmlSucessCallBack.forEach(callback => callback(data));

                // Recursively call children, if any
                loadIncludes(e);
            }
        });
    });
}

// Call the initial function to load the includes
loadIncludes();
