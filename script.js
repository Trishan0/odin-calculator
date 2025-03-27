document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  const acBtn = document.getElementById("ac-btn");
  const delBtn = document.getElementById("del-btn");
  const resultBtn = document.getElementById("show-result");
  const buttons = Array.from(document.querySelectorAll(".btn.number"));
  const operators = Array.from(document.querySelectorAll(".btn.operator"));

  let value1 = null,
    value2 = null,
    operator = null,
    result = null;
  let currentInput = "";

  function add(value1, value2) {
    return value1 + value2;
  }
  function sub(value1, value2) {
    return value1 - value2;
  }
  function multiply(value1, value2) {
    return value1 * value2;
  }
  function divide(value1, value2) {
    return value1 / value2;
  }

  function handleNumberInput(num) {
    if (num === "." && currentInput.includes(".")) {
      return;
    }
    if (operator === null) {
      currentInput += num;
      value1 = parseFloat(currentInput);
    } else {
      if (value2 === null) {
        currentInput = "";
      }
      currentInput += num;
      value2 = parseFloat(currentInput);
    }
    display.innerText = currentInput;
  }

  function handleOperatorInput(op) {
    if (value1 === null) {
      value1 = parseFloat(currentInput);
    } else {
      value2 = parseFloat(currentInput);
    }
    operator = op;
    currentInput = "";
    display.innerText = operator;
  }

  function calculateResult() {
    if (value2 === 0 && operator === "/") {
      display.innerText = "Error";
      return;
    }
    if (value1 === null || value2 === null || operator === null) {
      display.innerText = "Invalid Input";
      return;
    }

    switch (operator) {
      case "+":
        result = add(value1, value2);
        break;
      case "-":
        result = sub(value1, value2);
        break;
      case "*":
        result = multiply(value1, value2);
        break;
      case "/":
        result = divide(value1, value2);
        break;
      default:
        return null;
    }

    display.innerText = result;
    value1 = 0;
    value2 = 0;
    operator = null;
    currentInput = "";
  }
  function clearInput() {
    value1 = null;
    value2 = null;
    operator = null;
    currentInput = "";
    display.innerText = "0";
  }

  function deleteLast() {
    if (currentInput.length > 0) {
      currentInput = currentInput.slice(0, -1);
      display.innerText = currentInput.length > 0 ? currentInput : "0";
    }
    if (operator === null) {
      value1 = currentInput.length > 0 ? parseFloat(currentInput) : null;
    } else {
      value2 = currentInput.length > 0 ? parseFloat(currentInput) : null;
    }
  }

  delBtn.addEventListener("click", deleteLast);

  acBtn.addEventListener("click", clearInput);

  buttons.forEach((button) => {
    button.addEventListener("click", () =>
      handleNumberInput(button.textContent)
    );
  });

  operators.forEach((btnOperator) => {
    btnOperator.addEventListener("click", () =>
      handleOperatorInput(btnOperator.textContent)
    );
  });

  resultBtn.addEventListener("click", calculateResult);

  document.addEventListener("keydown", (event) => {
    const key = event.key;
    if ((key >= "0" && key <= "9") || key === ".") {
      handleNumberInput(key);
    }
    if (["+", "-", "*", "/"].includes(key)) {
      handleOperatorInput(key);
    }

    // Enter or = for result
    if (key === "Enter" || key === "=") {
      event.preventDefault(); // Prevent default Enter key behavior
      calculateResult();
    }

    // Backspace for deletion
    if (key === "Backspace") {
      deleteLast();
    }

    // Escape or Delete for all clear
    if (key === "Escape" || key === "Delete") {
      clearInput();
    }
  });
});
