


$(document).ready(function(){ 
    console.log('Loaded from jQuery 1')    
})

// El document es tan común que lo dejaron opcional
$().ready(function(){
    console.log('Loaded from jQuery 2')    
})

// La misma aún más simplificada, Sin "().ready"
$(function(){
    console.log('Loaded from jQuery 3')    
})

// Antes se ejecutaba más lento, en mi prueba lo hizo primero
// Versión original en JavaScript
window.onload = function(){
    console.log('Loaded')
}
