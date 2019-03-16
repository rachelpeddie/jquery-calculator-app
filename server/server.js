const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('server/public'));

const PORT = 5000;
app.listen(PORT, () => {
    console.log('listening on port', PORT)
});

// INIT SETUP

let equationArray = [];
let answer;

// function to get answer
function equationExecution(number1, number2, operation) {
    switch (operation) {
        case '+':
            answer = number1 + number2;
            break;

        case '-':
            answer = number1 - number2;
            break;

        case '*':
            answer = number1 * number2;
            break;

        case '/':
            answer = number1 / number2;
            break;
    }
    console.log('answer');
    return answer.toFixed(2);
}

app.get('/equations', (req, res) => {
    console.log(`GET for equations`);
    res.send(equationArray);
})

app.post('/equations', (req, res) => {
    let newEquation = req.body;
    equationExecution(Number(newEquation.number1), Number(newEquation.number2), newEquation.operation);
    newEquation.answer = answer;
    equationArray.push(newEquation);
    console.log((`equation to add:`, newEquation));
    res.sendStatus(201);
})

app.delete('/equations', (req, res) => {
    equationArray = [];
    res.sendStatus(201);
})
