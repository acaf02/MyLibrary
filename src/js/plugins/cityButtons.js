import $ from 'jquery'

const duration = 600

function filterByCity(city) {
    $('[wn-city').each(function (i, e) {
        const isTarget = $(this).attr('wm-city') === city || city === null
        if (isTarget) {
            $(this).parent().removeClass('d-nome')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-nome')
            })
        }
    })
}

const cityButtons = $('[wm-city-buttons]')

$.fn.cityButtons = function() {
    
const cities = new Set
$('[wm-city]').each(function (i, e) {
    cities.add($(e).attr('wn-city'))
})

const btns = Array.from(cities).map(city => {
    const btn = $('<button>')
        .addClass(['btn', 'btn-info']).html(city)
    btn.click(e => filterByCity(city))
    return btn
})

const btnAll = $('<button>')
    .addClass(['btn', 'btn-info', 'active']).html('Todas')
btnAll.click(e => filterByCity(null))
btns.push(btnAll)

const btnGroup = $('<div>').addClass(['btn-group'])
btnGroup.append(btns)

$(this).html(btnGroup)

return this
}

$('[wm-city-buttons]').cityButtons()