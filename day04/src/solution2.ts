import * as _ from "lodash";
import { Solver } from "./solver"

class Field {
    constructor(public value: number, public marked: boolean = false) { }
    public toString = (): string => {
        return `${this.marked ? "[" : " "}${this.value.toString().padStart(2)}${this.marked ? "]" : " "}`;
    }
}

class Board {
    private won: boolean = false
    public lastWonNumber = -1

    constructor(public rows: Field[][]) { }

    public mark(num: number) {
        this.rows.forEach(row => row.forEach(field => {
            if (field.value == num) {
                field.marked = true
                if (this.hasWon()) {
                    if (!this.won) {
                        this.lastWonNumber = num
                    }
                    this.won = true
                }
            }
        }))
    }
    public hasWon() {
        const columnWon = _.chain(this.rows).unzip().some(column => column.every(f => f.marked)).value()
        const rowWon = this.rows.some(row => row.every(f => f.marked));
        return this.won || columnWon || rowWon
    }
    public toString = (): string => {
        return `${"\n" + this.rows.map(row => "\n" + row.toString())}`;
    }
    public calculateScore() {
        return this.rows.flat().filter(f => !f.marked).reduce((sum, field) => field.value + sum, 0)
    }
}

const solution: any = (input: string) => {
    const entries = input.split("\n\n")
    const inputValues = (entries.shift() as string).split(',').map(it => parseInt(it))
    const boards = entries.map(it => it.split('\n')
        .map(it => it.replaceAll('  ', ' ').trim().split(' ').map(it => new Field(parseInt(it))))
    ).map(it => new Board(it))

    let lastNumber = 0
    do {
        lastNumber = inputValues.shift() as number
        if (lastNumber != undefined) { boards.forEach(b => b.mark(lastNumber)) }
    } while (!boards.every(b => b.hasWon()));

    const winBoard = boards.find(b => b.lastWonNumber == lastNumber) as Board

    console.log("" + winBoard, lastNumber)
    return winBoard?.calculateScore() * lastNumber
}

new Solver(solution, 'input1.txt', 2).print()
