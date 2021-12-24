import * as _ from "lodash";
import { Solver } from "./solver"

class Cube {
    constructor(
        public xRange: number[],
        public yRange: number[],
        public zRange: number[],
        public on: boolean = true,
    ) { }
    public isOverlapping(cube: Cube): boolean {
        return cube.xRange[0] <= this.xRange[1] && this.xRange[0] <= cube.xRange[1]
            && cube.yRange[0] <= this.yRange[1] && this.yRange[0] <= cube.yRange[1]
            && cube.zRange[0] <= this.zRange[1] && this.zRange[0] <= cube.zRange[1]
    }
    public split(cube: Cube): Cube[] {
        const cubeList = new Array<Cube>()
        if (cube.xRange[0] > this.xRange[0]) {
            cubeList.push(new Cube([this.xRange[0], cube.xRange[0] - 1], this.yRange, this.zRange))
        }
        if (cube.xRange[1] < this.xRange[1]) {
            cubeList.push(new Cube([cube.xRange[1] + 1, this.xRange[1]], this.yRange, this.zRange))
        }

        const middleXRange = [Math.max(this.xRange[0], cube.xRange[0]), Math.min(this.xRange[1], cube.xRange[1])];
        if (cube.yRange[0] > this.yRange[0]) {
            cubeList.push(new Cube(middleXRange, [this.yRange[0], cube.yRange[0] - 1], this.zRange));
        }
        if (cube.yRange[1] < this.yRange[1]) {
            cubeList.push(new Cube(middleXRange, [cube.yRange[1] + 1, this.yRange[1]], this.zRange));
        }

        const middleYRange = [Math.max(this.yRange[0], cube.yRange[0]), Math.min(this.yRange[1], cube.yRange[1])];
        if (cube.zRange[0] > this.zRange[0]) {
            cubeList.push(new Cube(middleXRange, middleYRange, [this.zRange[0], cube.zRange[0] - 1]));
        }
        if (cube.zRange[1] < this.zRange[1]) {
            cubeList.push(new Cube(middleXRange, middleYRange, [cube.zRange[1] + 1, this.zRange[1]]));
        }
        return cubeList
    }
    public volume(): number {
        return [this.xRange, this.yRange, this.zRange].reduce((prod, r) => prod * (1 + r[1] - r[0]), 1)
    }
}

const solution: any = (input: string) => {
    const steps = input.split("\n")
        .map(it => it.split(' ')).map(([instr, ranges]) => new Cube(...parseInput(ranges), instr == 'on'))
    let space = new Array<Cube>()
    steps.forEach(step => space = apply(step, space))
    return space.reduce((sum, cube) => sum + cube.volume(), 0)
}

function parseInput(rangesStr: string): [number[], number[], number[]] {
    return rangesStr.split(',').map(it => it.substring(2))
        .map(it => it.split('..').map(it => parseInt(it))) as [number[], number[], number[]]
}

function apply(step: Cube, space: Cube[]): Cube[] {
    const newSpace = new Array<Cube>()
    space.forEach(cube => {
        if (cube.isOverlapping(step)) {
            const splittedCubes = cube.split(step)
            newSpace.push(...splittedCubes)
        } else {
            newSpace.push(cube)
        }
    })
    if (step.on) {
        newSpace.push(step)
    }
    return newSpace
}


new Solver(solution, 'input.txt', 2).print() 
