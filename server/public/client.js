console.log('js');

$(document).ready(start);

function start() {
    console.log('jq');
    // $('#addition-btn').on('click', );
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
            number2: number2
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
