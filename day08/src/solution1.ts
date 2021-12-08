import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const entries = input.split("\n").map(it => it.split('|').map(it => it.trim().split(" ")))
    return _.sumBy(entries, it => solve(it))
}
function solve(line: string[][]) {
    const [input, output] = line
    const stats = output.filter(it => [2, 3, 4, 7].includes(it.length))
    return stats.length
}

new Solver(solution, 'input1.txt', 1).print()
