import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const lines = input.split("\n").map(line => line.split('').map(it => parseInt(it)))
    const result = lines.map((line, i) => line.filter((field, j) => Math.min(...getAdjacentFields(lines, i, j)) > field)).flat()
    return _.sum(result.map(it => it + 1))
}
function getAdjacentFields(lines: number[][], i: number, j: number): number[] {
    const result = [
        lines[i - 1]?.at(j),
        lines[i][j + 1],
        lines[i + 1]?.at(j),
        lines[i][j - 1],
    ].filter(it => it !== undefined)
    return result as number[]
}
new Solver(solution, 'input1.txt', 1).print()
