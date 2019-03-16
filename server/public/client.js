console.log('js');

$(document).ready(start);

let operation;

function start() {
    console.log('jq');
    $('#addition-btn').on('click', );
}

// function to post input values to server, on response, run function getAllEquations and empty input values
function addEquation(){
    let number1 = $('#first-number').val();
    let number2 = $('#second-number').val();
    $.ajax({
        method: 'POST',
        url: '/equations',
        data: {
            number1: number1,
            number2: number2,
            operation: operation
        }
    }).then(function(response){
        getAllEquations();
        console.log('Woot! addEquation worked!');
        number1 = $('#first-number').val('');
        number2 = $('#second-number').val('');
    }).catch(function(response){
        console.log(`Whoops, this didn't work!`);
        alert((`Whoops, this didn't work!`))
    }) // end ajax post
} // end addEquation

// equation to get array of equations from server and render equations
function getAllEquations() {
    $.ajax({
        method: 'GET',
        url: '/equations',
    }).then(function(response){
        renderAllEquations(response);
        console.log(`Here's your equations: ${response}`);
    }).catch(function(response){
        console.log(`Whoops, this didn't work!`);
        alert(`Whoops, this didn't work!`);  
    }) // end ajax get
} // end getAllEquations

