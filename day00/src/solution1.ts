import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const entries = _.chain(input.split("\n"))
    return entries.value()
}
new Solver(solution, 'input.txt', 1).print()
