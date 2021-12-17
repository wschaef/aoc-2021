import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const [xRange, yRange] = input.slice('target area: '.length).split(', ')
        .map(it => it.slice(2).split('..'))

    // the max y velocity is one above lower y range 
    const yVelocity = Math.abs(parseInt(yRange[0])) - 1
    const result = ((yVelocity + 1) / 2 * yVelocity)
    return result
}
new Solver(solution, 'input.txt', 1).print()
