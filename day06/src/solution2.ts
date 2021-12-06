import { range, chain, sum } from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const entries = input.split(",").map(it => parseInt(it))
    const counts = chain(entries).groupBy().mapValues(v => v.length).value()
    let state = range(9).map(i => counts[i] || 0)
    for (let i = 0; i < 256; i++) {
        state = transform(state)
    }
    return sum(state)
}

function transform(state: number[]): number[] {
    const newState = new Array(9).fill(0)
    state.forEach((s, i) => {
        switch (i) {
            case 0:
                newState[8] = s
                newState[6] = s
                break;
            default:
                newState[i - 1] += s
                break;
        }
    })
    return newState
}

new Solver(solution, 'input1.txt', 2).print()
