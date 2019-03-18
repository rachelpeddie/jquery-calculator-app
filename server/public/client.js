console.log('js');

$(document).ready(start);

let operation;
let answer;

function start() {
    console.log('jq');
    $('.operation-btn').on('click', operationClick);
    $('#submit-btn').on('click', addEquation);
    $('#clear-btn').on('click', emptyInputs);
    $('#clearHistory').on('click', deleteAllEquations);
}

// function to determine which button was clicked and set operation property
function operationClick() {
    switch (this.id) {
        case 'addition-btn':
            operation = '+';
            console.log(`we're doing some addition!`);
            break;

        case 'subraction-btn':
            operation = '-';
            console.log(`we're doing some subtraction!`);
            break;

        case 'multiplication-btn':
            operation = '*';
            console.log(`we're doing some multiplication!`);
            break;

        case 'division-btn':
            operation = '/';
            console.log(`we're doing some division!`);
            break;
    }
}

function emptyInputs() {
    $('#first-number').val('');
    $('#second-number').val('');
} // end emptyInputs

// function to post input values to server, on response, run function getAllEquations and empty input values
function addEquation() {
    let number1 = $('#first-number').val();
    let number2 = $('#second-number').val();
    if (number1 === '' || number2 === '') {
        alert(`You need to enter two numbers`)
    }
    else {
        $.ajax({
            method: 'POST',
            url: '/equations',
            data: {
                number1: number1,
                number2: number2,
                operation: operation,
                answer: answer
            }
        }).then(function (response) {
            getAllEquations();
            console.log('Woot! addEquation worked!');
            number1 = $('#first-number').val('');
            number2 = $('#second-number').val('');
        }).catch(function (response) {
            console.log(`Whoops, this didn't work!`);
            alert((`Whoops, this didn't work!`))
        }) // end ajax post
    }
} // end addEquation

// equation to get array of equations from server and render equations
function getAllEquations() {
    $.ajax({
        method: 'GET',
        url: '/equations',
    }).then(function (response) {
        renderAllEquations(response);
        console.log(`Here's your equations:`, response);
    }).catch(function (response) {
        console.log(`Whoops, this didn't work!`);
        alert(`Whoops, this didn't work!`);
    }) // end ajax get
} // end getAllEquations

// function to render all equations to DOM
function renderAllEquations(equationArray) {
    $('#completedEquations').empty();
    $('#answer').empty();
    $('#answer').append(`<h1>${(equationArray[equationArray.length - 1]).answer}</h1>`);
    for (equation of equationArray) {
        let completedEquations = `<li>${equation.number1} ${equation.operation} ${equation.number2} = ${equation.answer}</li>`;
        $('#completedEquations').append(completedEquations);
    }
}

// function to empty array and reappend on clearHistory button
function deleteAllEquations() {
    $.ajax({
        method: 'delete',
        url: '/equations'
    }).then(function (response) {
        $('#completedEquations').empty();
        $('#answer').empty();
        console.log('array should be empty!');
    }).catch(function (response) {
        console.log(`Whoops, this didn't work!`);
        alert(`Whoops, this didn't work!`);
    })
}