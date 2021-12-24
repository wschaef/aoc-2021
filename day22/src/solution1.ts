import * as _ from "lodash";
import { Solver } from "./solver"

class Step {
    instr: number
    public xRange: number[]
    public yRange: number[]
    public zRange: number[]
    constructor(
        instrStr: string,
        rangesStr: string
    ) {
        this.instr = (instrStr === 'on') ? 1 : 0
        const ranges = rangesStr.split(',').map(it => it.substring(2))
            .map(it => it.split('..').map(it => parseInt(it)))
        this.xRange = ranges[0]
        this.yRange = ranges[1]
        this.zRange = ranges[2]
    }
}

const solution: any = (input: string) => {
    const steps = input.split("\n")
        .map(it => it.split(' ')).map(([instr, ranges]) => new Step(instr, ranges))
    const space = new Set<string>() // [x,y,z].toString()
    steps.forEach(step => apply(step, space))
    return space.size
}

function apply(step: Step, space: Set<string>) {
    const minLimit = -50
    const maxLimit = 50
    const xMin = Math.max(step.xRange[0], minLimit)
    const xMax = Math.min(step.xRange[1], maxLimit)
    const yMin = Math.max(step.yRange[0], minLimit)
    const yMax = Math.min(step.yRange[1], maxLimit)
    const zMin = Math.max(step.zRange[0], minLimit)
    const zMax = Math.min(step.zRange[1], maxLimit)
    if (xMin > xMax || yMin > yMax || zMin > zMax) {
        return space
    }
    _.range(xMin, xMax + 1).forEach(x => {
        _.range(yMin, yMax + 1).forEach(y => {
            _.range(zMin, zMax + 1).forEach(z => {
                if (step.instr == 1) { //
                    space.add(key(x, y, z))
                } else {
                    space.delete(key(x, y, z))
                }
            })
        })
    })
    return space
}
function key(x: number, y: number, z: number) {
    return [x, y, z].toString()
}

new Solver(solution, 'input.txt', 1).print() 
