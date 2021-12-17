import * as _ from "lodash";
import { Solver } from "./solver"

class State {
    public x = 0
    public y = 0
    constructor(public xVelocity: number, public yVelocity: number) { }

    public next() {
        this.x = this.x + this.xVelocity
        this.y = this.y + this.yVelocity
        this.xVelocity = this.xVelocity > 0 ? --this.xVelocity : 0
        this.yVelocity = this.yVelocity - 1
    }

}
const solution: any = (input: string) => {
    const [xRange, yRange] = input.slice('target area: '.length).split(', ')
        .map(it => it.slice(2).split('..').map(it => parseInt(it)))

    const hits = new Set<State>()
    for (let x = 0; x <= xRange[1]; x++) {
        for (let y = yRange[0]; y <= Math.abs(yRange[0]); y++) {
            const state = new State(x, y)
            do {
                state.next()
                if (inArea(state.x, state.y, xRange, yRange)) {
                    hits.add(state)
                    break
                }
            } while (state.x <= xRange[1] && state.y >= yRange[0]);
        }
    }

    return hits.size
}

function inArea(x: number, y: number, xRange: number[], yRange: number[]): boolean {
    return (xRange[0] <= x && x <= xRange[1]) && (yRange[0] <= y && y <= yRange[1])
}

new Solver(solution, 'input.txt', 2).print()
