const urlParams = new URL(document.location).searchParams
var search = urlParams.get('name')
var spritecont
function pokename(search) {
    var endpointURL = `https://pokeapi.co/api/v2/pokemon/${search}`
   $.ajax({
       url: endpointURL,
       method:"GET"
   }).then(function(apiResponce){
       console.log(apiResponce)
       console.log(apiResponce.sprites.other['official-artwork'].front_default)
       spritecont = apiResponce.sprites.other['official-artwork'].front_default
       var sprite = $('#buildImg')
       sprite.attr("src",apiResponce.sprites.other['official-artwork'].front_default)
       for (let i = 0; i < apiResponce.moves.length; i++) {
           var moveName = $('<div>').text(apiResponce.moves[i].move.name).addClass("dropdown-item")
           $('#dropList').append(moveName)
           console.log(moveName)
    }
   })
}
$('#dropList').click(function(event){
    $('#moveName').html('')
    $('#moveAcc').html('')
    $('#movePP').html('')
    $('#movePower').html('')
    $('#moveFlavor').html('')
    $('.dropdown').toggleClass('is-active')   
    var element = event.target
    // $('#moveName').append('move: ' + element.textContent)
    var moveSel = element.textContent
    movestats(moveSel)
    function movestats(moveSel) {
        var urlAPI = `https://pokeapi.co/api/v2/move/${moveSel}/`
        $.ajax({
            url:urlAPI,
            method:"GET"
        })
        .then(function(response){
            console.log(response)
            var moveName = response.name
            var moveAcc = response.accuracy
            var movePP = response.pp
            var movePower = response.power
            moveFlavor = response['flavor_text_entries'][1].flavor_text
            $('#moveName').append('Name: ' + moveName)
            $('#moveAcc').append('Accuracy: ' + moveAcc)
            $('#movePP').append('PP: ' + movePP)
            $('#movePower').append('Power: ' + movePower)
            $('#moveFlavor').append(moveFlavor)
            console.log(moveAcc)
        }     
       )
    }
});

var moveFlavor

var fullmove1 = [] 
$('#setmove1').on('click',function(){
    $('#move1').html('')
    var setName = $('<h4>').text($('#moveName').text())
    var setAcc = $('<p>').text($('#moveAcc').text())
    var setPP = $('<p>').text($('#movePP').text())
    var setPower = $('<p>').text($('#movePower').text())
    $('#move1').append(setName)
    $('#move1').append(setAcc)
    $('#move1').append(setPP)
    $('#move1').append(setPower)
    console.log($('#moveName').text())
    fullmove1 = [setName.text(),setAcc.text(),setPP.text(),setPower.text(), moveFlavor]
})
var fullmove2 = []
$('#setmove2').on('click',function(){
    $('#move2').html('')
    var setName = $('<h4>').text($('#moveName').text())
    var setAcc = $('<p>').text($('#moveAcc').text())
    var setPP = $('<p>').text($('#movePP').text())
    var setPower = $('<p>').text($('#movePower').text())
    $('#move2').append(setName)
    $('#move2').append(setAcc)
    $('#move2').append(setPP)
    $('#move2').append(setPower)
    console.log($('#moveName').text())
    fullmove2 = [setName.text(),setAcc.text(),setPP.text(),setPower.text()]
})
var fullmove3 = []
$('#setmove3').on('click',function(){
    $('#move3').html('')
    var setName = $('<h4>').text($('#moveName').text())
    var setAcc = $('<p>').text($('#moveAcc').text())
    var setPP = $('<p>').text($('#movePP').text())
    var setPower = $('<p>').text($('#movePower').text())
    $('#move3').append(setName)
    $('#move3').append(setAcc)
    $('#move3').append(setPP)
    $('#move3').append(setPower)
    console.log($('#moveName').text())
    fullmove3 = [setName.text(),setAcc.text(),setPP.text(),setPower.text()]
})
var fullmove4 = []
$('#setmove4').on('click',function(){
    $('#move4').html('')
    var setName = $('<h4>').text($('#moveName').text())
    var setAcc = $('<p>').text($('#moveAcc').text())
    var setPP = $('<p>').text($('#movePP').text())
    var setPower = $('<p>').text($('#movePower').text())
    $('#move4').append(setName)
    $('#move4').append(setAcc)
    $('#move4').append(setPP)
    $('#move4').append(setPower)
    console.log($('#moveName').text())
    fullmove4 = [setName.text(),setAcc.text(),setPP.text(),setPower.text()]
    console.log(fullmove4)
})
function nickval() {
    var nickname = document.querySelector("#nickname").value;
    givename(nickname);
    console.log(nickname);
    document.querySelector("#nickname").value = "";
}
document.querySelector("#searchbtn2").addEventListener("click",nickval)
function givename(nickname) {
    var profanityURL = `https://www.purgomalum.com/service/containsprofanity?text=${nickname}`
   $.ajax({
       url: profanityURL,
       method:"GET"
   }).then(function(response){
       console.log(typeof(response))
       console.log(response)
       if(response == "false"){
           console.log("hello")
           $('#pokenick').text("")
           $('#pokenick').append(nickname)
        }
        else {
           console.log("no no word")
        //    alert("Watch yo profanity")
           $('.modal').addClass('is-active')
        }
   })
}
pokename(search)
var closeModal = document.getElementById('closeBtn')
closeModal.addEventListener('click', () => {
    $('.modal').removeClass('is-active')
})
document.querySelector("#finalbtn").addEventListener("click",logName)
var pokemonSpecies;
function logName() {
            pokemonSpecies = search;
            pokemonName = document.querySelector('#pokenick').textContent
            var existingEntries = JSON.parse(localStorage.getItem('pokemons'));
            if(existingEntries == null) existingEntries = []
            var pokemon99 = {name:pokemonSpecies,nick:pokemonName,picture:spritecont,ability1:fullmove1,ability2:fullmove2,ability3:fullmove3,ability4:fullmove4}
            console.log(pokemon99)
            localStorage.setItem('currentpoke',JSON.stringify(pokemon99))
            existingEntries.push(pokemon99)
            localStorage.setItem('pokemons',JSON.stringify(existingEntries))  
            console.log(localStorage.getItem('pokemons'))     
            var parsed = JSON.parse(localStorage.getItem('pokemons'))
            console.log(parsed)
}
$('#dropBtn').on('click', function() {
    $('.dropdown').toggleClass('is-active')    
})