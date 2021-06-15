document.querySelector("#searchbtn").addEventListener("click", nextPage)

function inputval() {
    var searchpoke = document.querySelector("#pokeSearch").value;
    var search = searchpoke.toLowerCase()
    pokename(search);
    console.log(search);
    document.querySelector("#pokeSearch").value = "";

}

document.querySelector("#choosebtn").addEventListener("click",inputval)
function pokename(search) {
 var endpointURL = `https://pokeapi.co/api/v2/pokemon/${search}`
$.ajax({
    url: endpointURL,
    method:"GET"
}).then(function(apiResponce){
    console.log(apiResponce)
    var pokename = apiResponce.name
    $('#pokename').text("");
    $('#pokename').append(pokename)
    console.log(pokename)
    console.log(apiResponce.sprites.other['official-artwork'].front_default)
    var sprite = $('#pokeImg')
    sprite.attr("src",apiResponce.sprites.other['official-artwork'].front_default)
})
}


function nextPage() {
    var chosen = document.getElementById('pokename')
    location.href = './build.html?name=' + chosen.textContent
}




var pokeList=[];
var availableTags=[];

var endpointURL = `https://pokeapi.co/api/v2/pokemon/?&limit=898`
$.ajax({
    url: endpointURL,
    method: "GET"
}).done(function (apiResponce) {


    
    for (let i = 0; i < 898; i++) {

        pokeList[i] = apiResponce.results[i].name;
      //console.log(pokeList[i]);
    }
   
 


    $( function() {
         var availableTags = pokeList;
         console.log(availableTags[100]);
         
       
        
         
         $( "#pokeSearch" ).autocomplete({
           source: availableTags
         });
       } );


});