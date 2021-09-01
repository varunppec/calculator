let disp_value = [];
let status = 0;
let deci_status = 0;
const disp = document.querySelector('.display');
const nos = document.querySelectorAll('.nos');
function add() {
    return arguments[0] + arguments[1];
}

function subtract() {
    return arguments[0] - arguments[1];
}

function multiply() {
    return arguments[0] * arguments[1];
}

function divide() {
    return arguments[0] / arguments[1];
}

function operate() {
    const operator = arguments[0];
    if (operator == "+") return add(arguments[1], arguments[2]);
    if (operator == "-") return subtract(arguments[1], arguments[2]);
    if (operator == "*") return multiply(arguments[1], arguments[2]);
    if (operator == "/") return divide(arguments[1], arguments[2]);
}

function addNos(e) {
    let a = e.target;

    if (a.id == 'dot' && deci_status) return;
    if (status == 1)
        disp.innerText += a.innerText;

    if (status == 0) {
        disp.innerText = a.innerText;
        status = 1;
    }

    if (a.id == 'dot') {
        deci_status = 1;

    }

}

function display() {
    for (let no of nos) {
        no.addEventListener('click', addNos);
    }
    const ops = document.querySelectorAll('.ops');
    for (let op of ops) {
        op.addEventListener('click', function () {
            console.log(disp_value.length);

            disp_value.push(disp.innerText);
            disp_value.push(op.innerText);
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
            deci_status = 0;
            console.log(disp_value);
        });

    }
    const equals = document.querySelector('#equals');
    equals.addEventListener('click', function () {
        //if (disp_value.length >= 3) {
        disp_value.push(disp.innerText);
        const a = Number(disp_value.pop());
        const rator = disp_value.pop();
        const b = Number(disp_value.pop());
        let result = operate(rator, b, a);
        if (isFinite(result))
            disp.innerText = operate(rator, b, a);
        else {
            window.alert("Can't divide by 0 :(");
            disp_value = [];
            disp.innerText = 0;
        }
        status = 0;
        deci_status = 0;
        console.log(disp_value);

        //}
    })

    const clear = document.querySelector('#clear');
    clear.addEventListener('click', function () {
        disp_value = [];
        disp.innerText = 0;
        status = 0;
    })

    const delet = document.querySelector('#delete');
    delet.addEventListener('click', function () {
        let test = disp.innerText;
        if (disp.innerText.length == 1) {
            disp.innerText = 0;
            status = 0;
            return;
        }
        if (disp.innerText.endsWith(".")) {
            deci_status = 0;
        }
        disp.innerText = disp.innerText.slice(0, -1);
    });

    document.addEventListener('keydown', function (e) {
        
    });

}
display();