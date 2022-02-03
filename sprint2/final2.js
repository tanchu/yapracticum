// JavaScript

const readline = require('readline');

const reader = readline.createInterface({
    input: process.stdin,
});

const inputLines = [];

reader.on('line', (line) => {
    inputLines.push(line);
});

process.stdin.on('end', solve);

const ERROR = 'error';

class Stack {
    constructor() {
        this.stack = [];
    }
    pop() {
        if (this.stack.length === 0) {
            return ERROR;
        }
        return this.stack.pop();
    }
    push(item) {
        this.stack.push(item);
    }
}

const mathActionResult = (a, b, operator) => eval(`${a} ${operator} ${b}`);

function solve() {
    const numbersStack = new Stack();

    const calc = (operator) => {
        const b = numbersStack.pop();
        const a = numbersStack.pop();

        const res = Math.floor(mathActionResult(a, b, operator));

        numbersStack.push(res);
    };

    inputLines[0]
        .trim(' ')
        .split(' ')
        .forEach((item) => {
            const numberOrMayBeNot = Number(item);
            if (isNaN(numberOrMayBeNot)) {
                calc(item);
                return;
            } else {
            }
            numbersStack.push(numberOrMayBeNot);
        });

    process.stdout.write(`${numbersStack.pop()}`);
}
