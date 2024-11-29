//global variables
let clearOnNextDigit;
let operatorState = [{awaiting: null}, {active: null}, {clicked: false}];
let equalClicked = false;

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
    if (value2 === 0 && operator === divide) {
        displayDiv.textContent = "Nice try! Division by zero is undefined 🤨";
        throw new Error("Division by zero attempted");
    }

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
    let decimal = document.getElementById("decimal");
    let digits = [zero, one, two, three, four, five, six, seven, eight, nine, decimal];

    //button responsiveness
    const digitsButtons = document.getElementById("digits-container").addEventListener("click", function(event) {
        operatorState[2].clicked = false;
        digit = event.target.value;
        
        //(error prevention) don't return 'undefined' when clicking between digits
        if (!digit) return;

        if (equalClicked) {
            clearAll();
            equalClicked = false;
        }

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
        
        // Limit decimals to 1 per value
        if (operatorState[1].active === null) {
            decimal.disabled = variables[1].value1.includes('.');
            console.log("decimal is disabled: " + decimal.disabled);
        } else {
            decimal.disabled = variables[3].value2 === '' ? false : variables[3].value2.includes('.');
            console.log("decimal is disabled: " + decimal.disabled);
        }

        updateDisplay();

        //console logs: selected variables
        console.log("VARIABLES -> " + "value1 (a): " + variables[1].value1 + " || operator: " + operatorState[1].active + " || value2 (b): " + variables[3].value2);

    });

//operator responsiveness
    //functions
        // 'C' - Clear
        function clearAll() {
            variables[0].default = 0;
            variables[1].value1 = '';
            variables[2].operator = '';
            variables[3].value2 = '';
            variables[4].result = '';
            operatorState[0].awaiting = null;
            operatorState[1].active = null;
            deletedCharacter = '';
            decimal.disabled = false;
            updateDisplay();
        };

        let clear = document.getElementById("clear").addEventListener("click", function() {
            clearAll();
            clearOnNextDigit = false;
            console.log("CLEARED")
        });

        // '=' - Final Operation
        let equal = document.getElementById("equal").addEventListener("click", function() {
            operate(operatorState[1].active, Number(variables[1].value1), Number(variables[3].value2));
            equalClicked = true;
            decimal.disabled = false;
            clearOnNextDigit = true; 
            operatorState[2].clicked = false;
            console.log("✅ OPERATED (via 'equal'):")
            console.log("OPERATORSTATE -> " + "last click: " + operatorState[2].clicked + " || 🟢 active operator: " + operatorState[1].active + " || 🟠 awaiting operator: " + operatorState[0].awaiting)
            
        }); 

        // '⌫` delete button
        document.getElementById("delete").addEventListener("click", function () {
            let deletedCharacter = '';

            if (variables[3].value2 !== '') { 
                variables[3].value2 = variables[3].value2.slice(0, -1);
                deletedCharacter = variables[3].value2.slice(0, -1);
            } else if (variables[3].value2 === '' && operatorState[1].active !== null) {
                return; 
            } else if (variables[1].value1 !== '' && operatorState[1].active === null) {
                variables[1].value1 = variables[1].value1.slice(0, -1);
                deletedCharacter = variables[1].value1.slice(0, -1);
            }

            //if a decimal was deleted, enable decimal button again
            if (deletedCharacter === '.') {
            decimal.disabled = false;
            console.log(decimal.disabled);
            }
            if (variables[1].value1.includes('.') && variables[3].value2 === '' || variables[3].value2.includes('.')) {
                decimal.disabled = true;
                console.log("decimal is disabled: " + decimal.disabled);
            } else {
                decimal.disabled = false;
                console.log("decimal is disabled: " + decimal.disabled);
                console.log("VARIABLES -> " + "value1 (a): " + variables[1].value1 + " || operator: " + operatorState[1].active + " || value2 (b): " + variables[3].value2);
            }

            updateDisplay();
        });

    //Operators '+', '-', '*', '/'
    const operatorsButtons = document.getElementById("operators-container").addEventListener("click", function(event){
        let operator = event.target.id;

        if (equalClicked) {
            equalClicked = false;
        }

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

        decimal.disabled = false, console.log("decimal is disabled: " + decimal.disabled);

        updateDisplay();

        //console logs:
            //selected variables
            console.log("VARIABLES -> " + "value1 (a): " + variables[1].value1 + " || operator: " + operatorState[1].active + " || value2 (b): " + variables[3].value2);
            //operators
            console.log("OPERATORSTATE -> " + "last click: " + operatorState[2].clicked + " || 🟢 active operator: " + operatorState[1].active + " || 🟠 awaiting operator: " + operatorState[0].awaiting)

        //trigger calculation when necessary values are present & save operator that triggered this for the continued calculation
        if (variables[1].value1 !== '' && operatorState[1].active !== null && variables[3].value2 !== '') {
            operate(operatorState[1].active, Number(variables[1].value1), Number(variables[3].value2));
            
            console.log("✅ OPERATED (via operator)")
            console.log("OPERATORSTATE -> " + "last click: " + operatorState[2].clicked + " || 🟢 active operator: " + operatorState[1].active + " || 🟠 awaiting operator: " + operatorState[0].awaiting)
        };
});
