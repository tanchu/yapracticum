// JavaScript
// https://contest.yandex.ru/contest/22781/run-report/64781664/

/*
-- ПРИНЦИП РАБОТЫ --
Описан в условиях задачи.
 
-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --

Код программы является переложением алгоритма из, приведенного в описании задачи, на язык javascript.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Cложность алгоритма O(n), т.к. а решении используется проход по всему массиву, длинной n

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
т.к. в памяти мы храним весь массив входных, который занимает O(n) и стэк операндов для вычисления, который в худшем случае будет занимать O(n) памяти.
с точки зрания O нотации, общая пространственная сложность будет составлять O(n).


 */

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
            }
            numbersStack.push(numberOrMayBeNot);
        });

    process.stdout.write(`${numbersStack.pop()}`);
}
