var num1, num2;
var currentOperation = null;
var reset2;

const lastOperation = document.getElementById("history");
const resultScreen = document.getElementById("result");

const numberBtn = document.querySelectorAll('[data-number]');
const operatorBtn = document.querySelectorAll('[data-operator]');
const deleteBtn = document.getElementById('backspace');
const clearBtn = document.getElementById('clear');
const pointBtn = document.getElementById('point');
const equalsBtn = document.getElementById('equals');

const lightTheme = "styles/light.css";
const darkTheme = "styles/dark.css";

const sunIcon = "assets/SunIcon.svg";
const moonIcon = "assets/MoonIcon.svg";
const themeIcon = document.getElementById("theme-icon");


// swaps the stylesheet to achieve dark mode.
function changeTheme() {
    const theme = document.getElementById("theme");

    if (theme.getAttribute("href") === lightTheme) {
        theme.setAttribute("href", darkTheme);
        themeIcon.setAttribute("src", sunIcon);
    } else {
        theme.setAttribute("href", lightTheme);
        themeIcon.setAttribute("src", moonIcon);
    }
}

themeIcon.addEventListener('click', () => {
    changeTheme();
})


// displays number on the screen
function displayNum(number) {
    if (resultScreen.value == "0" || reset2)
        reset();
    resultScreen.value += number;
}

function reset() {
    resultScreen.value = "";
    reset2 = false;
}


function operation(operator) {
    if (currentOperation != null)
        calculate();
    num1 = resultScreen.value;
    currentOperation = operator;
    lastOperation.value = `${num1} ${currentOperation}`;
    reset2 = true;
}

function calculate() {
    if (currentOperation == null || reset2)
        return;
    if (currentOperation == "/" && resultScreen.value == "0") {
        resultScreen.value = "You can't divide by 0!";
        return;
    }
    num2 = resultScreen.value;
    resultScreen.value = operate(currentOperation, num1, num2);
    lastOperation.value = `${num1} ${currentOperation} ${num2}`;
    currentOperation = null;
}

// function to append point
function addPoint() {
    // if (reset2) reset()
    if (resultScreen.value == "")
        resultScreen.value = "0"
    if (resultScreen.value.includes("."))
        return;
    resultScreen.value += ".";
}

// function to clear screen and reset everything
function clearAll() {
    // window.location.reload()
    lastOperation.value = "";
    resultScreen.value = "";
}

// function to delete 
function backSpace() {
    resultScreen.value = resultScreen.value.toString().slice(0, -1);
}

numberBtn.forEach((button) => {
    button.addEventListener('click', () => displayNum(button.value))
})

operatorBtn.forEach((button) => {
    button.addEventListener("click", () => operation(button.value))
}
)

clearBtn.addEventListener('click', () => {
    clearAll();
})

deleteBtn.addEventListener('click', () => {
    backSpace();
})

pointBtn.addEventListener("click", () => {
    addPoint();
})

equalsBtn.addEventListener('click', () => {
    calculate();
})


function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case "^":
            return a ** b;
        case "÷":
            if (b == 0)
                return null
            else
                return a / b;
        case "*":
            return a * b;
        case "-":
            return a - b;
        case "+":
            return a + b;
    }
}

//adding event handler on the document to handle keyboard inputs
document.addEventListener("keydown", keyboardInputHandler);

//function to handle keyboard inputs
function keyboardInputHandler(e) {
    // to fix the default behavior of browser,
    e.preventDefault();

    //numbers
    if (e.key >= "0" && e.key <= 9)
        displayNum(e.key);

    // operators
    if (e.key == "^" || e.key == "/" || e.key == "*" || e.key == "-" || e.key == "+")
        operation(e.key)

    if (e.key == "=" || e.key == "Enter")
        calculate();

    if (e.key == ".")
        addPoint();

    if (e.key == "Backspace")
        backSpace();

    if (e.key == "Esc" || e.key == "Escape")
        clearAll();

}
