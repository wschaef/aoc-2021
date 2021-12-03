import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const entries = _.chain(input.split("\n")
        .map(it => it.split('')
            .map(it => parseInt(it))))
        .unzip() // group by column -> rotate the matrix by 90 degree
    const entryLength = entries.get(0).size().value()
    const numberOfOnes = entries.map(e => e.reduce((sum, v) => sum + v, 0))
    const gamma = numberOfOnes.map(it => it > entryLength / 2 ? 1 : 0)
    const epsylon = gamma.map(it => it == 0 ? 1 : 0)
    const result = gamma.join('').parseInt(2).value() * epsylon.join('').parseInt(2).value()
    return result
}
new Solver(solution, 'input1.txt', 1).print()
