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

class Dequeue {
    constructor(len) {
        this.queue = Array(len).fill(null);
        this.head = 0;
        this.tail = 0;
        this.maxLen = len;
        this.size = 0;
    }
    get isEmpty () {
        return this.size === 0;
    }
    get isFull() {
        return this.size === this.maxLen;
    }
    getNewValue(value) {
        return ((value % this.maxLen) + this.maxLen) % this.maxLen;
    }
    //pushLeft
    pushFront(value) {
        const newHead = this.getNewValue(this.head - 1);
        if (this.isFull) {
            return ERROR;
        }
        this.head = newHead;
        this.queue[this.head] = value;
        this.size += 1;
    }
    //pushRight
    pushBack(value) {
        const newTail = (this.tail + 1) % this.maxLen;
        if (this.isFull) {
            return ERROR;
        }
        this.queue[this.tail] = value;
        this.tail = newTail;
        this.size += 1;
    }
    //popLeft
    popFront() {
        if (this.isEmpty) {
            return ERROR;
        }
        const ret = this.queue[this.head];
        this.head = (this.head + 1) % this.maxLen;
        this.size -= 1;
        return ret;
    }
    popBack() {
        //popRight
        if (this.isEmpty) {
            return ERROR;
        }
        this.tail = this.getNewValue(this.tail - 1);
        this.size -= 1;
        return this.queue[this.tail];
        
    }
}

function solve() {
    const totalComandas = Number(inputLines[0].trim(' '));
    const len = Number(inputLines[1].trim(' '));
    const comands = [];

    for (let i = 2; i < totalComandas + 2; i++) {
        const line = inputLines[i].trim(' ').split(' ');
        comands.push(line);
    }
    const dequeue = new Dequeue(len);

    let result = '';

    comands.forEach((comand, i) => {
        switch (comand[0]) {
            case 'pop_front':
                const popFront = dequeue.popFront();
                result += popFront === ERROR ? `${ERROR}\n` : `${popFront}\n`;
                break;
            case 'pop_back':
                const popBack = dequeue.popBack();
                result += popBack === ERROR ? `${ERROR}\n` : `${popBack}\n`;
                break;
            case 'push_front':
                result += dequeue.pushFront(Number(comand[1])) === ERROR ? `${ERROR}\n` : '';
                break;
            case 'push_back':
                result += dequeue.pushBack(Number(comand[1])) === ERROR ? `${ERROR}\n` : '';
                break;
        }
    });
    process.stdout.write(`${result}`);
}
