import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const [fieldsInput, foldsInput] = input.split("\n\n")
    const folds = foldsInput.split('\n').map(f => f.split(' ').slice(-1)[0])
        .map(line => line.split("=")).map(([n, value]) => [n, parseInt(value)])
    let fields = fieldsInput.split('\n').map(it => it.split(',').map(it => parseInt(it)))
    fields = fold(fields, folds[0][0] as string, folds[0][1] as number)
    return fields.length
}
function fold(fields: number[][], dimension: string, foldValue: number) {
    const foldBy = dimension == 'x' ? 0 : 1
    fields.forEach(f => f[foldBy] > foldValue ? f[foldBy] = 2 * foldValue - f[foldBy] : f[foldBy])
    return _.uniqBy(fields, f => f.toString())
}
new Solver(solution, 'input1.txt', 1).print()
