//global variables
let clearOnNextDigit;
let operatorState = [{awaiting: null}, {active: null}, {clicked: false}];
let equalClicked = false;

//variables to be displayed
let variables = [
    {value1: ''},
    {operator: ''},
    {value2: ''},
    {result: ''}
];

let activeValue;
let inactiveValue;
let displayLevels = [
    {lvl1: ''},
    {lvl2: ''}
];
    const displayLevel1 = document.getElementById("display_lvl1");
    const displayLevel2 = document.getElementById("display_lvl2");
        function updateDisplay() {
            let display = `${variables[0].value1} ${variables[1].operator} ${variables[2].value2} ${variables[3].result}`;
            //update text-content of HTML divs
            displayLevel1.textContent = displayLevels[0];
            displayLevel2.textContent = displayLevels[1];
            
            if (variables[1].operator === '') {
                // if there is no operator, show value1 as level 1
                displayLevels[0] = variables[0].value1; // Level 1 shows value1
                displayLevels[1] = '' //without this, lvl2 would show [object object], figured operator was the issue and...
            } else if (variables[1].operator !== '') {
                //if there is an operator, show value1 & operator as level2 //show value2 as level1
                displayLevels[0] = variables[2].value2;
                displayLevels[1] = variables[0].value1 + " " + variables[1].operator; 
            }

            if (variables[1].operator !== '' && operatorState[0].awaiting === null && equalClicked === true) {
                //show equation in lvl2(display) & result un lvl1(display) when '=' was clicked
                displayLevels[0] = variables[3].result
                displayLevels[1] = variables[0].value1 + " " + variables[1].operator + " " + variables[2].value2
            }

            //assign text-content to displayLevels
            displayLevel1.textContent = displayLevels[0];
            displayLevel2.textContent = displayLevels[1];         
        };  
    updateDisplay();
 
//mathematical  operations
let add = function(a, b) {return a + b;};
let subtract = function(a, b) {return a - b;};
let multiple = function(a, b) {return a * b;};
let divide = function(a, b) {return a / b;};

let operators = [add, subtract, multiple, divide];

//calculation
let operate = function(operator, value1, value2, ) {
    if (value2 === 0 && operator === divide) { //if user divides by 0 (easter-egg)
        //page background
        document.body.style.backgroundColor = 'rgb(50, 50, 50)'; 

        //functions color
        let functionsColour = document.querySelectorAll('.function');
            functionsColour.forEach((functions) => { //had to keep the 's' since 'function' is reserved of course...
                functions.addEventListener('mouseover', () => { 
                    functions.style.backgroundColor = getRandomRedShade();
                    functions.style.color = 'rgb(250, 250, 250)';
                });
                functions.addEventListener('mouseout', () => {
                    functions.style.color = 'rgb(128, 128, 128)';
                    functions.style.backgroundColor = 'rgb(243, 243, 243)';
                });
            });
        //digits color
        let digitsColour = document.querySelectorAll('.digit');
            digitsColour.forEach((digit) => {
                digit.addEventListener('mouseover', () => { 
                    digit.style.backgroundColor = getRandomBlueShade();
                    digit.style.color = 'rgb(250, 250, 250)';
                });
                digit.addEventListener('mouseout', () => {
                    digit.style.color = 'rgb(128, 128, 128)';
                    digit.style.backgroundColor = 'rgb(243, 243, 243)';
                });
            });
        //equal color
        let equalColour= document.querySelectorAll('#equal');
            equalColour.forEach((equal) => {
                equal.addEventListener('mouseover', () => { 
                    equal.style.backgroundColor = getRandomGreenShade();
                    equal.style.color = 'rgb(250, 250, 250)';
                });
                equal.addEventListener('mouseout', () => {
                    equal.style.color = 'rgb(128, 128, 128)';
                    equal.style.backgroundColor = 'rgb(243, 243, 243)';
                });
        });
        //operators color
        let operatorsColour = document.querySelectorAll('.operator');
            operatorsColour.forEach((operator) => {
                operator.addEventListener('mouseover', () => { 
                    if (!equalColour[0].matches(':hover')) { //disable this effect on '=' (which is also in .operator class)
                        operator.style.backgroundColor = getRandomOrangeShade();
                        operator.style.color = 'rgb(250, 250, 250)';
                    }
                });
                operator.addEventListener('mouseout', () => {
                    operator.style.color = 'rgb(128, 128, 128)';
                    operator.style.backgroundColor = 'rgb(243, 243, 243)';
                });
        });
        //red soft-colors
        const redShades = ['#DE7C7D', '#CC2B52', '#AF1740', '#740938'];
        function getRandomRedShade() {
          const randomShade = Math.floor(Math.random() * redShades.length);
          return redShades[randomShade];
        }
        //blue soft-colors
        const blueShades = ['#003366','#336699','#6699CC','#99CCFF'];
        function getRandomBlueShade() {
            const randomShade = Math.floor(Math.random() * blueShades.length);
            return blueShades[randomShade];
        }
        //orange soft-colors
        const orangeShades = ['#C64E00','#E35A00','#F48018','#E9992F', '#F7B538'];
        function getRandomOrangeShade() {
            const randomShade = Math.floor(Math.random() * orangeShades.length);
            return orangeShades[randomShade];
        }
        //green soft-colors
        const greenShades = ['#44562f','#83934d','#b8c88d',];
        function getRandomGreenShade() {
            const randomShade = Math.floor(Math.random() * greenShades.length);
            return greenShades[randomShade];
        }


        displayLevel1.textContent = "🤨";
        
        const message = document.getElementById('message');
        message.textContent = "cheeky buggah!"
        message.style.color = 'white';


        throw new Error("Division by zero attempted");
    }
    
    variables[3].result = operator(value1, value2); //apply math operation & push return value as result (placeholder)

    if (operatorState[0].awaiting !== null) {
        //if the function was triggered via an operator
        clearValues(); //clear operate(arguments)values
        variables[0].value1 = variables[3].result; //move return value to value1 (allows continuous calc.)
        passOperator(); //display new activeOperator
        updateDisplay(); //refresh display
    } 
 
    console.log(displayLevels);
    
    //clear functions
        function clearValues() {
            variables[0].value1 = '';
            variables[2].value2 = '';

            //variables[1].operator = '';
            operatorState[1].active = null;
        };
        function clearResult() {
            variables[3].result = '';
        }
        function passOperator() {
            operatorState[1].active = operatorState[0].awaiting;
            operatorState[0].awaiting = null;

            if (operatorState[1].active === null) {
                variables[1].operator = '';
            } else if (operatorState[1].active === add) {
                variables[1].operator = '+';
            } else if (operatorState[1].active === subtract) {
                variables[1].operator = '-';
            } else if (operatorState[1].active === multiple) {
                variables[1].operator = '*';
            } else if (operatorState[1].active === divide) {
                variables[1].operator = '/';
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

//button responsiveness//
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
        clearOnNextDigit = false;
         //populate
        variables[0].value1 += digit;
    } else {
        variables[2].value2 += digit;
    }; 
    // Limit decimals to 1 per value
    if (operatorState[1].active === null) {
         decimal.disabled = variables[0].value1.includes('.');
          console.log("decimal is disabled: " + decimal.disabled);
    } else {
        decimal.disabled = variables[2].value2 === '' ? false : variables[2].value2.includes('.');
        console.log("decimal is disabled: " + decimal.disabled);
    }
    //refresh display after each click
    updateDisplay();

    //console.log("VARIABLES -> " + "value1 (a): " + variables[0].value1 + " || operator: " + operatorState[1].active + " || value2 (b): " + variables[2].value2);
    console.log("value1: " + variables[0].value1 + ", operator: " + variables[1].operator + ", value2: " + variables[2].value2);
    console.log(displayLevels)
});
    //sign-change button
    let signChange = document.getElementById("sign-change").addEventListener("click", function() {
        if (operatorState[1].active === null) {
            if (variables[0].value1 !== '') {
                variables[0].value1 = (parseFloat(variables[0].value1) * -1).toString();
            }
        } else {
            if (variables[2].value2 !== '') {
                variables[2].value2 = (parseFloat(variables[2].value2) * -1).toString();
            }
        }
        
        updateDisplay();
        console.log("Sign toggled: value1: " + variables[0].value1 + ", value2: " + variables[2].value2);
    });

//operator responsiveness//
//functions
        // 'C' - Clear
        function clearAll() {
            variables[0].value1 = '';
            variables[1].operator = '';
            variables[2].value2 = '';
            variables[3].result = '';
            operatorState[0].awaiting = null;
            operatorState[1].active = null;
            deletedCharacter = '';
            decimal.disabled = false;
            displayLevels[0] = '';
            displayLevels[1] = '';
            updateDisplay();
        };

        let clear = document.getElementById("clear").addEventListener("click", function() {
            clearAll();
            clearOnNextDigit = false;
            console.log("CLEARED")
        });

        // '=' - Final Operation
        let equal = document.getElementById("equal").addEventListener("click", function() {
            displayLevels[1] = variables[0].value1 + variables[1].operator + variables[2].value2 //push equation to lvl2 display
            operate(operatorState[1].active, Number(variables[0].value1), Number(variables[2].value2)); //operate the equation
            displayLevels[0] = variables[0].value1; //lvl1 display is the result
    
            equalClicked = true;
                console.log(equalClicked)
            decimal.disabled = false;
            clearOnNextDigit = true; 
            operatorState[2].clicked = false;
            console.log("✅ OPERATED (via 'equal'):")
            console.log("OPERATORSTATE -> " + "last click: " + operatorState[2].clicked + " || 🟢 active operator: " + operatorState[1].active + " || 🟠 awaiting operator: " + operatorState[0].awaiting)
            
        }); 

        // 'DEL` delete button
        document.getElementById("delete").addEventListener("click", function () {
            let deletedCharacter = '';

            if (variables[2].value2 !== '') { 
                variables[2].value2 = variables[2].value2.slice(0, -1);
                deletedCharacter = variables[2].value2.slice(0, -1);
            } else if (variables[2].value2 === '' && operatorState[1].active !== null) {
                return; 
            } else if (variables[0].value1 !== '' && operatorState[1].active === null) {
                variables[0].value1 = variables[0].value1.slice(0, -1);
                deletedCharacter = variables[0].value1.slice(0, -1);
            }

            //if a decimal was deleted, enable decimal button again
            if (deletedCharacter === '.') {
            decimal.disabled = false;
            console.log(decimal.disabled);
            }
            if (variables[0].value1.includes('.') && variables[2].value2 === '' || variables[2].value2.includes('.')) {
                decimal.disabled = true;
                console.log("decimal is disabled: " + decimal.disabled);
            } else {
                decimal.disabled = false;
                console.log("decimal is disabled: " + decimal.disabled);
                console.log("VARIABLES -> " + "value1 (a): " + variables[0].value1 + " || operator: " + operatorState[1].active + " || value2 (b): " + variables[2].value2);
            }

            updateDisplay();
        });

    //Operators '+', '-', '*', '/'
    const operatorsButtons = document.getElementById("operators-container").addEventListener("click", function(event){
        let operator = event.target.id;

        // (this breaks the equation from showing in display2 if '=' was clicked. I don't remember why I wrote it)
        //if (equalClicked) {
        //    equalClicked = false;
        //}

        if (variables[0].value1 === '') { //if user wants to start from the default '0'... //(&& operatorState[1].active !== null)
            variables[0].value1 = '0';
        }
        if (operatorState[2].clicked === true && variables[2].value2 === '') { //switch operator if one is already active
            if (operator === "add") {operatorState[1].active = operators[0]; variables[1].operator = '+';} 
            if (operator === "subtract") {operatorState[1].active = operators[1]; variables[1].operator = '-';}
            if (operator === "multiple") {operatorState[1].active = operators[2]; variables[1].operator = '*';}
            if (operator === "divide") {operatorState[1].active = operators[3]; variables[1].operator = '/';} 
            operatorState[2].clicked = true;;
        } else if (operatorState[1].active === null) { //set operator if none is set
            if (operator === "add") {operatorState[1].active = operators[0]; variables[1].operator = '+'; operatorState[2].clicked = true;} 
            if (operator === "subtract") {operatorState[1].active = operators[1]; variables[1].operator = '-'; operatorState[2].clicked = true;}
            if (operator === "multiple") {operatorState[1].active = operators[2]; variables[1].operator = '*'; operatorState[2].clicked = true;}
            if (operator === "divide") {operatorState[1].active = operators[3]; variables[1].operator = '/';} operatorState[2].clicked = true;;
        } else if (operatorState[1].active !== null) { //queue operator to be set after operation
            if (operator === "add") {operatorState[0].awaiting = operators[0]; variables[1].operator = '+'; operatorState[2].clicked = true;} 
            if (operator === "subtract") {operatorState[0].awaiting = operators[1]; variables[1].operator = '-'; operatorState[2].clicked = true;}
            if (operator === "multiple") {operatorState[0].awaiting = operators[2]; variables[1].operator = '*'; operatorState[2].clicked = true;}
            if (operator === "divide") {operatorState[0].awaiting = operators[3]; variables[1].operator = '/'; operatorState[2].clicked = true;};
        }

        decimal.disabled = false, console.log("decimal is disabled: " + decimal.disabled);

        updateDisplay();

        //console logs:
            //selected variables
            //console.log("VARIABLES -> " + "value1 (a): " + variables[0].value1 + " || operator: " + operatorState[1].active + " || value2 (b): " + variables[2].value2);
            //operators
            //console.log("OPERATORSTATE -> " + "last click: " + operatorState[2].clicked + " || 🟢 active operator: " + operatorState[1].active + " || 🟠 awaiting operator: " + operatorState[0].awaiting)


        //push value1 and operator to lvl2 display
        if (variables[1].value !== '' && operatorState[1].active !== null) {
            displayLevels[1] = variables[0].value1 + " " + variables[1].operator; 
            displayLevels[0] = variables[3].value2
            console.log("PUSHED TO LVL2: " + displayLevels[1]);
        }

        //trigger calculation when necessary values are present & save operator that triggered this for the continued calculation
        if (variables[0].value1 !== '' && operatorState[1].active !== null && variables[2].value2 !== '') {
            operate(operatorState[1].active, Number(variables[0].value1), Number(variables[2].value2));
            displayLevels[1] = variables[0].value1 + variables[1].operator;
            console.log("✅ OPERATED (via operator)")
            //console.log("operatorState -> " + "last click: " + operatorState[2].clicked + " || 🟢 active operator: " + operatorState[1].active + " || 🟠 awaiting operator: " + operatorState[0].awaiting)
        };
});
