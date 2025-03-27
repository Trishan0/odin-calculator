document.addEventListener('DOMContentLoaded', function () {

    const display = document.getElementById('display');
    const acBtn = document.getElementById('ac-btn');
    const delBtn = document.getElementById('del-btn');
    const resultBtn = document.getElementById('show-result');
    const buttons = Array.from(document.querySelectorAll('.btn.number'));
    const operators = Array.from(document.querySelectorAll('.btn.operator'));
    
    let value1 = null, value2 = null,operator = null,result = null;
    let currentInput = ''; 
    


    function add(value1, value2){
        return value1 + value2  
    }
    function sub(value1, value2){
        return value1 - value2  
    }
    function multiply(value1, value2){
        return value1 * value2  
    }
    function divide(value1, value2){
        return value1 / value2  
    }


    acBtn.addEventListener('click',()=>{
         value1 = null;  
         value2 = null;  
         operator = null;
         currentInput = '';  // Reset current input
         display.innerText = "0"; // Reset display to "0"

    })

function deleteLast(){
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0,-1)
            display.innerText = currentInput.length > 0 ? currentInput : "0";
        }
        if (operator===null){
            value1 = currentInput.length > 0 ? parseFloat(currentInput) : null;
        }
        else {
            value2 = currentInput.length > 0 ? parseFloat(currentInput) : null;

        }
}

    delBtn.addEventListener('click',deleteLast )

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if (operator === null) {
                currentInput += button.textContent; // Append number to current input
                value1 = parseFloat(currentInput); // Store the first value
            } else {
                if (value2 === null){
                    currentInput = '';
                }
                currentInput += button.textContent;
                value2 = parseFloat(currentInput)
            }
            display.innerText = currentInput;  // Update display

        });
    });
    document.addEventListener('keydown', function(event) {
        if (event.key === "Backspace") {
            deleteLast();
        }
    });
    operators.forEach((btnOperator) => {
        btnOperator.addEventListener('click', () => {
            if (display) {
                if (value1 === null) {
                    value1 = parseFloat(currentInput); 
                } else {
                    value2 = parseFloat(currentInput); 
                }
                operator = btnOperator.textContent; 
                currentInput = '';
                display.innerText = operator; 
            }
        });
    });


    resultBtn.addEventListener('click', () => {
        if (operator==="+"){
            result = add(value1, value2);  
        }
        else if (operator==="-"){
            result = sub(value1, value2); 
        }
        else if (operator==="*"){
            result = multiply(value1, value2);
        }
        else if (operator==="/"){
            result = divide(value1, value2);
        }
        else {
            return null;
        }

        display.innerText = result;
        value1 = 0
        value2 = 0
        operator = null
        currentInput = ''
    });

    document.addEventListener('keydown', function(event){
        if (event.key ==="Enter"){
            event.preventDefault();
            resultBtn.click();
        }
        else if (event.key==="+"){
            result = add(value1, value2);  
        }
        else if (event.key==="-"){
            result = sub(value1, value2); 
        }
        else if (event.key==="*"){
            result = multiply(value1, value2);
        }
        else if (event.key==="/"){
            result = divide(value1, value2);
        }
        else {
            return null;
        }
    })

})