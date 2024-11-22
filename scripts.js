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
let zero = document.getElementById("0");
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

const variables = [];

let clearOnNextDigit = false;
let clear = document.getElementById("clear").addEventListener("click", function() {
    display.innerHTML = "0000";
    variables.splice(0,variables.length);
    clearOnNextDigit = false;
});

const digitsButtons = document.getElementById("digits").addEventListener("click", function() {
    digit = event.target.value;

    if (clearOnNextDigit || display.innerHTML.trim() === "0000") {
        display.innerHTML = "";
        clearOnNextDigit = false;
    }  

    display.innerHTML += digit;
});

const operatorsButtons = document.getElementById("operators").addEventListener("click", function(){
    //const operator = event.target.value;

    variables.push(Number(display.innerHTML));
    clearOnNextDigit = true;
});