// JavaScript
// https://contest.yandex.ru/contest/22781/run-report/64667792/

/*
-- ПРИНЦИП РАБОТЫ --
Я реализовал двунаправленную очередь на кольцевом массиве queue, указатели начала очереди head, ее концае tail и ее длины size


-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
инвариант класса: 
1) в переменной size хранится  количество элементов в очереди;
2) head указывает на первый элемент очереди
3) tail указывается на элемент идущий за последним элемент очереди
4) maxLen максимально возсожная длинна очереди

Докажем, что этот инвариант выполнен всегда. Доказательство проведем по индукции.

База индукции: очевидно, что после исполенения конструктора инвариант выполнен.

Индуктивный переход. Предположим, что инвариант выполнен. 
Теперь докажем, что после выполнении операций pushFront, pushBack, popFront, popBack инвариант будет выполнен.
Операция pushFront
Первые 4 строчика проверяют: можно ли добавить новый элемент, если его добавить нелья, 
возвращается сообщение об ошибк и наш объект остается неизменным. 
Раз он остается неизменным, то инвариант по-прежнему выполняется.
В противном случае - если добавить можно, происходит следующее:
head передвигается в следующую позицию, при этом инвариат нарушается, т.к. head указывает на элемент не принадлежащий очереди, 
нарушается второе положение инварианта, но затем в эту новую позицию помещается значение, которое мы добавляем, 
тем самым восстанавлиявается второе положение инварианта, но нарушается первое.
В следующей строке мы увеличиваем значение size на единицу, тем самым восстанавливая первое положение инварианта.
Значит все три положения выполнены, выполнен ивариант, тем самым мы провели индуктивный переход. 

Операция popFront является обратной операции pushFront, и доказательство корректности будет идентичным

Операция pushBack
Первые 4 строчика проверяют: можно ли добавить новый элемент, если его добавить нелья, 
возвращается сообщение об ошибке и наш объект остается неизменным. 
Раз он остается неизменным, то инвариант по-прежнему выполняется.
В противном случае - если добавить можно, происходит следующее:
tail передвигается в следующую позицию, при этом инвариат нарушается, т.к. tail указывает на элемент не принадлежащий очереди, 
нарушается второе положение инварианта, но затем в эту новую позицию помещается значение, которое мы добавляем, 
тем самым восстанавлиявается второе положение инварианта, но нарушается первое.
В следующей строке мы увеличиваем значение size на единицу, тем самым восстанавливая первое положение инварианта.
Значит все три положения выполнены, выполнен ивариант, тем самым мы провели индуктивный переход. 

Операция popBack является обратной операции pushBack, и доказательство корректности будет идентичным


Отстаток от деления гарантирует что индекс массива будет всегда лежать от нуля до максиальной длинный -1, тем самым избавляет нас от необходимости описывать дополнительно случаи перехода head и tail через крайние элементы массива;


-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Все операции стоят O(1) потому, что во всех функциях количество операция не зависит от количества элементов в очереди


-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
О(n) т.к. размер очереди не превосходит maxLen в силу четвертого положения инварианта класса. 

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

class Dequeue {
    constructor(len) {
        this.queue = Array(len).fill(null);
        this.head = 0;
        this.tail = 0;
        this.maxLen = len;
        this.size = 0;
    }
    get isEmpty() {
        return this.size === 0;
    }
    get isFull() {
        return this.size === this.maxLen;
    }
    getNewValue(value) {
        return ((value % this.maxLen) + this.maxLen) % this.maxLen;
    }
    pushFront(value) {
        const newHead = this.getNewValue(this.head - 1);
        if (this.isFull) {
            return ERROR;
        }
        this.head = newHead;
        this.queue[this.head] = value;
        this.size += 1;
    }
    pushBack(value) {
        const newTail = (this.tail + 1) % this.maxLen;
        if (this.isFull) {
            return ERROR;
        }
        this.queue[this.tail] = value;
        this.tail = newTail;
        this.size += 1;
    }
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
