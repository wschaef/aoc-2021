import { Solver } from "./solver"

class Instruction {
    constructor(public direction: string, public distance: number) { }
}

const solution: any = (input: string) => {
    const entries: Array<Instruction> = input.split("\n").map(it => it.split(' '))
        .map(it => new Instruction(it[0], parseInt(it[1])))
    const c = [
        entries.reduce((prev: number, instr: Instruction) => instr.direction == 'down' ? prev + instr.distance : prev, 0),
        entries.reduce((prev: number, instr: Instruction) => instr.direction == 'up' ? prev - instr.distance : prev, 0),
        entries.reduce((prev: number, instr: Instruction) => instr.direction == 'forward' ? prev + instr.distance : prev, 0)
    ]
    return (c[0] + c[1]) * c[2]
}

new Solver(solution, 'input1.txt', 1).print()
