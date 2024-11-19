import $ from 'jquery'

const duration = 600

function filterByCity(city){
    $('[wn-city').each(function(i,e) {
        const isTarget = $(this).attr('wm-city') === city|| city === null
        if(isTarget) {
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration)
        }
    })
}