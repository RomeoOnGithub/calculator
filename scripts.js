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