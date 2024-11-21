//mathematical  operations

let add = function(a, b) {return a + b;};
let subtract = function(a, b) {return a - b;};
let multiple = function(a, b) {return a * b;};
let divide = function(a, b) {return a / b;};

let operators = [add, subtract, multiple, divide];

//calculation
let operate = function(operatorIndex, value1, value2) {
    let operator = operators[operatorIndex];
    return operator(value1, value2);
};

//digit responsiveness 
let zero = document.getElementById("0").value;

let one = document.getElementById("1");
let two = document.getElementById("2");
let three = document.getElementById("3");
let four = document.getElementById("4");
let five = document.getElementById("5");
let six = document.getElementById("6");
let seven = document.getElementById("7");
let eight = document.getElementById("8");
let nine = document.getElementById("9");

let digits = [zero, one, two, three, four, five, six, seven, eight, nine];

const display = document.getElementById("display");

const digitsButtons = document.getElementById("digits").addEventListener("click", function() {
    display.innerHTML = event.target.value;
});

