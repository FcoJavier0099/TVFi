// Dependencies

//var $ = require('jquery');
//global.jQuery = require('jquery')
//import $ from 'jquery'

const $showContainer = $('div.tv-shows')
var template=`
    <article class="tv-show">
    <div class="left img-container">
        <img src=":img:" alt=":img_alt:">
    </div>
    <div class="right info">
        <h2>:name:</h2>
        <p>:summary:</p>
    </div>
    </article>                    
`

function renderShows(shows)
{
    // Retirar el spinner una vez se carguen los datos
    $showContainer.find('.loader').hide()
    shows.forEach(show => {
        var article = template
            .replace(':name:', show.name)
            .replace(':summary:', show.summary)
            .replace(':img:', show.image ? show.image.medium : '')
            .replace(':img_alt:', show.name + ' logo')
        var $article = $(article)
        $article.hide()
        $showContainer.append($article)
        //$article.show(2000)
        //$article.fadeIn(2000)
        //$article.fadeTo(1500, 1, 'linear')
        //$article.show('fold',2000) -> al parecer necesita jQueryUI
        $article.slideDown(2000)
    });
}

/* $.ajax('http://api.tvmaze.com/shows', {
    success: function(shows, textStatus, jqXHR){
        renderShows(shows)
    }
})
 */
// Si están los datos en el localStorage
if (localStorage.shows){
    renderShows(JSON.parse(localStorage.shows))
}
else{    
    $.ajax('http://api.tvmaze.com/shows')
        .then(shows =>{     
            // Guardar los datos en el localStorage
            localStorage.shows = JSON.stringify(shows)
            renderShows(shows)
    })
}

$(function(){
    ////console.log(2, this)
    // submit search-form
    $('#app-body')
        .find('form')
        .submit(function(ev){
            ev.preventDefault()
            const busqueda = $(this).find(':text').val()
            // Limpiar shows y mostrar spinner
            $showContainer.find('.tv-show').remove()
            $showContainer.find('.loader').show()
            //http://api.tvmaze.com/search/shows?q=girls
            $.ajax('http://api.tvmaze.com/search/shows',{ 
                data: {q: busqueda},
                success: function(res, textStatus, jqXHR){
                    console.log(res)
                    var shows = res.map(function(item){return item.show})
                    renderShows(shows)
                }
            })
        })
})




  
