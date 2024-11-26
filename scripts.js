//global variables
let clearOnNextDigit;
let operatorState = [{awaiting: null}, {active: null}, {clicked: false}];

//variables to be displayed
let variables = [{default: 0}, {value1: ''}, {operator: ''}, {value2: ''}, {result: ''}];
const displayDiv = document.getElementById("display");

function updateDisplay() { //quick action to update display
    let display = 
        `${variables[0].default}
        ${variables[1].value1}
        ${variables[2].operator}
        ${variables[3].value2}
        ${variables[4].result}`;
    displayDiv.textContent = display;
};  
updateDisplay();
 
//mathematical  operations
let add = function(a, b) {return a + b;};
let subtract = function(a, b) {return a - b;};
let multiple = function(a, b) {return a * b;};
let divide = function(a, b) {return a / b;};

let operators = [add, subtract, multiple, divide];

//calculation
let operate = function(operator, value1, value2) {
    variables[4].result = operator(value1, value2); //apply math operation & push return value as result (placeholder) 
    clearValues(); //clear operate(arguments)values
    variables[1].value1 = variables[4].result; //move return value to value1 (allows continuous calc.)
    clearResult();  //clear placeholder
    passOperator(); //display new activeOperator
    updateDisplay(); //refresh display

    //clear functions
        function clearValues() {
            variables[1].value1 = '';
            variables[3].value2 = '';

            //variables[2].operator = '';
            operatorState[1].active = null;
        };

        function clearResult() {
            variables[4].result = '';
        }

        function passOperator() {
            operatorState[1].active = operatorState[0].awaiting;
            operatorState[0].awaiting = null;

            if (operatorState[1].active === null) {
                variables[2].operator = '';
            } else if (operatorState[1].active === add) {
                variables[2].operator = '+';
            } else if (operatorState[1].active === subtract) {
                variables[2].operator = '-';
            } else if (operatorState[1].active === multiple) {
                variables[2].operator = '*';
            } else if (operatorState[1].active === divide) {
                variables[2].operator = '/';
            }
        }
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

    //button responsiveness
    const digitsButtons = document.getElementById("digits").addEventListener("click", function(event) {
        operatorState[2].clicked = false;
        digit = event.target.value;
        
        //(error prevention) don't return 'undefined' when clicking between digits
        if (!digit) return;

        //(display) switch between populating value1 & value2
        if (operatorState[1].active === null) {
            //clear dummy value a.k.a default
            variables[0].default = '';
            clearOnNextDigit = false;
            //populate
            variables[1].value1 += digit;
        } else {
            variables[3].value2 += digit;
        };

        updateDisplay();
    });

//operator responsiveness
    //functions
        // 'C' - Clear
        let clear = document.getElementById("clear").addEventListener("click", function() {
            function clearAll() {
                variables[0].default = 0;
                variables[1].value1 = '';
                variables[2].operator = '';
                variables[3].value2 = '';
                variables[4].result = '';
                operatorState[0].awaiting = null;
                operatorState[1].active = null;
                updateDisplay();
            };
            clearAll();
            clearOnNextDigit = false;
        });

        // '=' - Final Operation
        let equal = document.getElementById("equal").addEventListener("click", function() {
            operate(operatorState[1].active, Number(variables[1].value1), Number(variables[3].value2));
            clearOnNextDigit = true; 
            operatorState[2].clicked = false;
            console.log("✅ via '=': " + ', 🟢ACTIVE' + operatorState[1].active + ', 🟠AWAITING' + operatorState[0].awaiting + ', ' + operatorState[2].clicked)
        }); 

    //Operators '+', '-', '*', '/'
    const operatorsButtons = document.getElementById("operators").addEventListener("click", function(event){
        let operator = event.target.id;

        if (variables[1].value1 === '') { //if user wants to start from the default '0'... //(&& operatorState[1].active !== null)
            variables[0].default = '';
            variables[1].value1 = '0';
        }
        if (operatorState[2].clicked === true && variables[3].value2 === '') { //switch operator if one is already active
            if (operator === "add") {operatorState[1].active = operators[0]; variables[2].operator = '+';} 
            if (operator === "subtract") {operatorState[1].active = operators[1]; variables[2].operator = '-';}
            if (operator === "multiple") {operatorState[1].active = operators[2]; variables[2].operator = '*';}
            if (operator === "divide") {operatorState[1].active = operators[3]; variables[2].operator = '/';} 
            operatorState[2].clicked = true;;
        } else if (operatorState[1].active === null) { //set operator if none is set
            if (operator === "add") {operatorState[1].active = operators[0]; variables[2].operator = '+'; operatorState[2].clicked = true;} 
            if (operator === "subtract") {operatorState[1].active = operators[1]; variables[2].operator = '-'; operatorState[2].clicked = true;}
            if (operator === "multiple") {operatorState[1].active = operators[2]; variables[2].operator = '*'; operatorState[2].clicked = true;}
            if (operator === "divide") {operatorState[1].active = operators[3]; variables[2].operator = '/';} operatorState[2].clicked = true;;
        } else if (operatorState[1].active !== null) { //queue operator to be set after operation
            if (operator === "add") {operatorState[0].awaiting = operators[0]; variables[2].operator = '+'; operatorState[2].clicked = true;} 
            if (operator === "subtract") {operatorState[0].awaiting = operators[1]; variables[2].operator = '-'; operatorState[2].clicked = true;}
            if (operator === "multiple") {operatorState[0].awaiting = operators[2]; variables[2].operator = '*'; operatorState[2].clicked = true;}
            if (operator === "divide") {operatorState[0].awaiting = operators[3]; variables[2].operator = '/'; operatorState[2].clicked = true;};
        }

        updateDisplay();

        //trigger calculation when necessary values are present & save operator that triggered this for the continued calculation
            console.log("❌: " + ', 🟢ACTIVE' + operatorState[1].active + ', 🟠AWAITING' + operatorState[0].awaiting)
        if (variables[1].value1 !== '' && operatorState[1].active !== null && variables[3].value2 !== '') {
            operate(operatorState[1].active, Number(variables[1].value1), Number(variables[3].value2));
            console.log("✅ via operator : " + ', 🟢ACTIVE' + operatorState[1].active + ', 🟠AWAITING' + operatorState[0].awaiting + ', ' + operatorState[2].clicked)
        };
});