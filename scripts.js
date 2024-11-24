const variables = [];
const display = document.getElementById("display");
let clearOnNextDigit;
let activeOperator = null;

//mathematical  operations
let add = function(a, b) {return a + b;};
let subtract = function(a, b) {return a - b;};
let multiple = function(a, b) {return a * b;};
let divide = function(a, b) {return a / b;};

let operators = [add, subtract, multiple, divide];

//calculation
let operate = function(operator, value1, value2) {
    display.innerHTML = operator(value1, value2); //update display with result 
    variables.splice(0,variables.length); //clear variables array
    variables.push(Number(display.innerHTML)); //push result to variables as variables[0]
    activeOperator = null;
};

//digit responsiveness
    //assigning array
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

    //display interaction
    const digitsButtons = document.getElementById("digits").addEventListener("click", function(event) {
        //for first use - clears dummy values on display
        if (clearOnNextDigit || display.innerHTML.trim() === "0000") {
            display.innerHTML = "";
            clearOnNextDigit = false;
        }  

        digit = event.target.value;
        display.innerHTML += digit;
    });

//operator responsiveness
    //functions
        //Clear 'C'
        let clear = document.getElementById("clear").addEventListener("click", function() {
            display.innerHTML = "0000";
            variables.splice(0,variables.length);
            clearOnNextDigit = false;
        });

        //Final Operation '='
        let equal = document.getElementById("equal").addEventListener("click", function() {
            variables.push(Number(display.innerHTML));
            clearOnNextDigit = true;
            operate(activeOperator, variables[0], variables[1]);
        });

    //Operators '+', '-', '*', '/'
    const operatorsButtons = document.getElementById("operators").addEventListener("click", function(event){
        //push values on display (prior to selecting operator) into `variables` array & set-up for next action
        variables.push(Number(display.innerHTML));
        clearOnNextDigit = true;
        
        //select operator as argument & trigger calculation
        if (activeOperator !== null && variables.length === 2) {
            operate(activeOperator, variables[0], variables[1]);
        }

        let operator = event.target.id;
        if (operator === "add") {activeOperator = operators[0];} 
        else if (operator === "subtract") {activeOperator = operators[1];}
        else if (operator === "multiple") {activeOperator = operators[2];}
        else if (operator === "divide") {activeOperator = operators[3];};
        console.log("active operator:", activeOperator);
});