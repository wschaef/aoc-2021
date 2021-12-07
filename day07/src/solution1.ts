import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const entries = input.split(",").map(it => parseInt(it))
    const result = _.range(Math.min(...entries), Math.max(...entries))
        .map(p => entries.map(e => distance(p, e))).map(d => _.sum(d))
    return Math.min(...result)
}

function distance(a: number, b: number): number {
    return Math.abs(a - b)
}

new Solver(solution, 'input1.txt', 1).print()
