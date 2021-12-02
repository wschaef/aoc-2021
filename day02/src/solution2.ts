import { Solver } from "./solver"

class Instruction {
    constructor(public direction: string, public distance: number) { }
}

class State {
    constructor(
        public x: number = 0,
        public y: number = 0,
        public aim: number = 0
    ) { }

    public execute(instr: Instruction): State {
        switch (instr.direction) {
            case 'down':
                this.aim += instr.distance
                break;
            case 'up':
                this.aim -= instr.distance
                break;
            case 'forward':
                this.x += instr.distance
                this.y += this.aim * instr.distance
        }
        return this
    }
}

const solution: any = (input: string) => {
    const entries: Array<Instruction> = input.split("\n").map(it => it.split(' '))
        .map(it => new Instruction(it[0], parseInt(it[1])))
    const state = entries.reduce((prev: State, instr: Instruction) => prev.execute(instr), new State())
    return state.x * state.y
}

new Solver(solution, 'input1.txt', 2).print()
