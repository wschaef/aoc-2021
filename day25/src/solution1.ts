import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    let sea = new Sea(input)
    let prev: Sea
    let step = 0
    do {
        step++
        prev = sea
        sea = sea.move('>').move('v')
    } while (!sea.isEqual(prev));
    return step
}

class Sea {

    private fields: string[][]
    constructor(input: string) {
        this.fields = input.split('\n').map(it => it.split(''))
    }
    public get(x: number, y: number): string {
        return this.fields[y % this.fields.length][x % this.fields[0].length]
    }
    public set(x: number, y: number, v: string): void {
        this.fields[y % this.fields.length][x % this.fields[0].length] = v
    }
    public toString() {
        return `\n${this.fields.map(it => it.join('')).join('\n')}`
    }
    public move(dir: ">" | "v"): Sea {
        const copy = _.cloneDeep(this)
        if (dir == ">") {
            copy.doForAll((x: number, y: number, v: string) => {
                if (this.get(x, y) == '>' && this.get(x + 1, y) == '.') {
                    copy.set(x, y, '.')
                    copy.set(x + 1, y, '>')
                }
            })
        } else {
            copy.doForAll((x: number, y: number, v: string) => {
                if (this.get(x, y) == 'v' && this.get(x, y + 1) == '.') {
                    copy.set(x, y, '.')
                    copy.set(x, y + 1, 'v')
                }
            })
        }
        return copy
    }
    public isEqual(other: Sea) {
        return this.toString() == other.toString()
    }
    private doForAll(fn: (x: number, y: number, v: string) => void): void {
        this.fields.forEach((line, j) => line.forEach((value, i) => fn(i, j, value)))
    }
}
new Solver(solution, 'input.txt', 1).print()
