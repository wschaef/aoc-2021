import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const [fieldsInput, foldsInput] = input.split("\n\n")
    const folds = foldsInput.split('\n').map(f => f.split(' ').slice(-1)[0])
        .map(line => line.split("=")).map(([n, value]) => [n, parseInt(value)])
    let fields = fieldsInput.split('\n').map(it => it.split(',').map(it => parseInt(it)))

    folds.forEach(f => fields = fold(fields, f[0] as string, f[1] as number))
    print(fields)
    return fields.length
}
function fold(fields: number[][], dimension: string, foldValue: number) {
    const foldBy = dimension == 'x' ? 0 : 1
    fields.forEach(f => f[foldBy] > foldValue ? f[foldBy] = 2 * foldValue - f[foldBy] : f[foldBy])
    return _.uniqBy(fields, f => f.toString())
}

function print(fields: number[][]) {
    const maxX = Math.max(...fields.map(f => f[0]))
    const maxY = Math.max(...fields.map(f => f[1]))
    let output = new Array(maxY + 1).fill([]).map(l => _.clone(new Array(maxX + 1).fill(" ")))
    fields.forEach(f => {
        output[f[1]][f[0]] = '#'
    })
    console.log(output.map(it => it.join('')).join('\n'))
}
new Solver(solution, 'input1.txt', 1).print()
