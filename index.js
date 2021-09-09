let disp_value = []; //stack
let status = 0; //make sure it shows 0
let dot_status = 0; //keep track of whether . has been pressed
let operators = ['+', '-', '*', '/', 'x'];
const disp = document.querySelector('.display');
const nos = document.querySelectorAll('.nos');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const backspace = document.querySelector('#delete');

function add() {
    return arguments[0] + arguments[1];
};

function subtract() {
    return arguments[0] - arguments[1];
};

function multiply() {
    return arguments[0] * arguments[1];
};

function divide() {
    return arguments[0] / arguments[1];
};

function operate() {
    const operator = arguments[0];
    if (operator == "+") return add(arguments[1], arguments[2]);
    if (operator == "-") return subtract(arguments[1], arguments[2]);
    if (operator == "*") return multiply(arguments[1], arguments[2]);
    if (operator == "/") return divide(arguments[1], arguments[2]);
};

function addNos(a) {
    console.log(a);
    if (a == '.' && dot_status) return;
    if (status == 1)
        disp.innerText += a;

    if (status == 0) {
        disp.innerText = a;
        status = 1;
    }

    if (a == '.') {
        dot_status = 1;

    }

};

function returnOperator(op) {
    if (op == 'x') return '*';
    if (op == '*') return '*';
    if (op == '÷') return '/';
    if (op == '/') return '/';
    if (op == '+') return '+';
    if (op == '-') return '-';
};

function addOps(op) {
    console.log(op);
    disp_value.push(disp.innerText);
    disp_value.push(returnOperator(op));
    disp.innerText = 0;
    status = 0;
    console.log(disp_value);
    if (disp_value.length >= 3) {
        const temp = disp_value.pop();
        const a = Number(disp_value.pop());
        const rator = disp_value.pop();
        const b = Number(disp_value.pop());
        disp_value.push(operate(rator, b, a));
        disp_value.push(temp);
    }
    dot_status = 0;
    console.log(disp_value);
};

function onEquals() {
    disp_value.push(disp.innerText);
    console.log(disp_value);
    const a = Number(disp_value.pop());
    if (!a && disp_value.length <= 2) {
        window.alert("Invalid operation");
        return;
    }
    const rator = disp_value.pop();
    const b = Number(disp_value.pop());
    let result = operate(rator, b, a);
    console.log(result);
    if (isFinite(result))
        disp.innerText = Math.round(result * 10000)/10000;
    else {
        window.alert("Can't divide by 0 :(");
        disp_value = [];
        disp.innerText = 0;
    }
    status = 0;
    dot_status = 0;
    console.log(disp_value);
};

function onDelete() {
    let test = disp.innerText;
    if (disp.innerText.length == 1) {
        disp.innerText = 0;
        status = 0;
        return;
    }
    if (disp.innerText.endsWith(".")) {
        dot_status = 0;
    }
    disp.innerText = disp.innerText.slice(0, -1);
};

function onClear() {
    disp_value = [];
    disp.innerText = 0;
    status = 0;
    dot_status = 0;
};

function onKeyPress() {
    document.addEventListener('keydown', function (e) {
        e.preventDefault();
        console.log(e.key);
        if ((e.key >= 0 && e.key <= 9) || e.key == '.') addNos(e.key);
        if (operators.includes(e.key)) addOps(e.key);
        if (e.key == 'Enter' || e.key == '=') onEquals();
        if (e.key == 'Backspace') onDelete();
        if (e.key == 'Escape') onClear();
    });
};

function display() {
    
    for (let no of nos) {
        no.addEventListener('click', function () { addNos(no.innerText) });
    }
    const ops = document.querySelectorAll('.ops');
    for (let op of ops) {
        op.addEventListener('click', function () {
            addOps(op.innerText);
        });

    }
    
    

    equals.addEventListener('click', function () {
        onEquals();
    });

    clear.addEventListener('click', function() {
        onClear();
    })
   
    backspace.addEventListener('click', function () {
        onDelete();
    });
    
    
    onKeyPress();
}
display();