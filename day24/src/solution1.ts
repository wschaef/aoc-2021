import * as _ from "lodash";
import { Solver } from "./solver"

type Instruction = (m: Memory, input?: number) => boolean
type Memory = Map<string, number> //{'x':number,'y':number,'z':number,'w':number}

const solution: any = (input: string) => {
    const lines = input.split("\n")
    const memory: Memory = new Map([['x', 0], ['y', 0], ['z', 0], ['w', 0]])
    const instructions = lines.map(l => parseInstr(l)) as Instruction[]
    const functions = _.chunk(instructions, 18)
    // test(99999999199895, functions)
    const result = solveBruteForceWithDict(functions)
    //const minMax = getMinMax(9, [232004, 378236], [0, 25])
    return result
}

function solveBruteForceWithDict(functions: Instruction[][]): number[] {
    const minMax = calcRestrictions()
    const dict = new Map<string, number>()
    const key = (m: Memory, i: number) => { return [m, i].toString() }
    const aDict = new Map<number, number>()
    const results = []
    const stats = [0, 0]
    let input = 99999999999999
    do {
        if (!input.toString().split('').includes('0')) {
            // const m: Memory = new Map([['x', 0], ['y', 0], ['z', 0], ['w', 0]])
            // const result = execute(m, functions, input, instrDict)
            const result = executeCompiled(input, minMax)
            // const result = executeCompiled(input)
            // stats[result] += 1
            if (result == 0) {
                console.log(input)
                break
            }
            // results.push([result, input])
        }
        input--
    } while (input > 99999111111111);
    // console.table(dict)
    // dict.entries()[0]
    // console.log(_.groupBy(Array.from(dict), it => it[1]))
    // console.log(_.groupBy(results, it => it[0]))
    return stats
}


function execute(memory: Memory, functions: Instruction[][], input: number, instrDict: Map<string, Memory>): number {
    const digits = input.toString().split('').map(it => parseInt(it))
    const key = (m: Memory, i: number, w: number) => [i, w, m.get('w'), m.get('z')].toString()
    digits.forEach((digit, i) => {
        const hit = instrDict.get(key(memory, i, digit))
        if (!hit) {
            functions[i].forEach(instr => instr(memory, digit))
            instrDict.set(key(memory, i, digit), memory)
        } else {
            memory = hit
        }
    })
    return memory.get('z') == 0 ? 0 : 1
}

function executeCompiled(input: number, minMax: number[][][]) {
    const digits = input.toString().split('').map(it => parseInt(it))
    const A = [1, 1, 1, 26, 1, 26, 1, 1, 1, 26, 26, 26, 26, 26]
    const B = [12, 10, 10, -6, 11, -12, 11, 12, 12, -2, -5, -4, -4, -12]
    const C = [6, 2, 13, 8, 13, 8, 3, 11, 10, 8, 14, 6, 8, 2]
    let z = 0
    for (const [i, digit] of digits.entries()) {
        let [range1, range2] = minMax[i]
        const w = digit
        const x = (z % 26) + B[i] != w ? 1 : 0
        const y = x * (w + C[i])
        z = Math.floor(z / A[i]) * (x * 25 + 1) + y
        let minZ, maxZ
        if (x == 0) {
            minZ = range1[0]
            maxZ = range1[1]
        } else {
            minZ = range2[0]
            maxZ = range2[1]
        }
        if (minZ <= z && z <= maxZ) {
            return -1
        }
    }
    return z
}

function executeCompiled2(input: number, dict: Map<string, number>) {
    const digits = input.toString().split('').map(it => parseInt(it))
    const key = (i: number, w: number, z: number) => [i, w, z].toString()
    const A = [1, 1, 1, 26, 1, 26, 1, 1, 1, 26, 26, 26, 26, 26]
    const B = [12, 10, 10, -6, 11, -12, 11, 12, 12, -2, -5, -4, -4, -12]
    const C = [6, 2, 13, 8, 13, 8, 3, 11, 10, 8, 14, 6, 8, 2]
    let z = 0
    digits.forEach((digit, i) => {
        const hit = dict.get(key(i, digit, z))
        if (!hit) {
            const oldZ = z
            const w = digit
            const x = (z % 26) + B[i] != w ? 1 : 0
            const y = x * (w + C[i])
            z = Math.floor(z / A[i]) * (x * 25 + 1) + y
            dict.set(key(i, digit, oldZ), z)
        } else {
            z = hit
        }

    })
    return z
}

function calcRestrictions(): number[][][] {
    const minMax = new Array<number[][]>(14)
    let [range1, range2] = [[0, 0], [0, 0]]
    for (let i = 13; i >= 0; i--) {
        minMax[i] = [range1, range2];
        [range1, range2] = getMinMax(i, range1, range2)
    }
    return minMax
}

function getMinMax(i: number, range1: number[], range2: number[]): number[][] {
    const A = [1, 1, 1, 26, 1, 26, 1, 1, 1, 26, 26, 26, 26, 26]
    const B = [12, 10, 10, -6, 11, -12, 11, 12, 12, -2, -5, -4, -4, -12]
    const C = [6, 2, 13, 8, 13, 8, 3, 11, 10, 8, 14, 6, 8, 2]
    let oldZ = 0
    const wRange = _.range(1, 10)
    const zRange = _.range(0, 10000000)
    // if a range is empty copy the other to it
    if (range1[0] == Number.MAX_VALUE) {
        range1 = range2
    } else if (range2[0] == Number.MAX_VALUE) {
        range2 = range1
    }
    if (i == 12) {
        console.log(range1, range2)
    }

    const results = [[Number.MAX_VALUE, 0], [Number.MAX_VALUE, 0]]
    zRange.forEach(z => {
        oldZ = z
        wRange.forEach(w => {
            z = oldZ
            const x = ((z % 26) + B[i] === w) ? 0 : 1
            const y = x * (w + C[i])
            z = Math.floor(z / A[i]) * (x * 25 + 1) + y
            let result
            let minZ, maxZ
            if (x == 0) {
                result = results[0]
                minZ = range1[0]
                maxZ = range1[1]
            } else {
                result = results[1]
                minZ = range2[0]
                maxZ = range2[1]
            }
            if (minZ <= z && z <= maxZ) {
                result[0] = Math.min(result[0], oldZ)
                result[1] = Math.max(result[1], oldZ)
            }
        })
    })
    return results
}

function parseInstr(instr: string) {
    let [cmd, l, r] = instr.split(' ')
    const dict = new Map<string, Instruction>([
        ['add', (m: Memory) => {
            let right = parseInt(r)
            right = isNaN(right) ? m.get(r)! : right
            m.set(l, m.get(l)! + right)
            return false
        }],
        ['mul', (m: Memory) => {
            let right = parseInt(r)
            right = isNaN(right) ? m.get(r)! : right
            m.set(l, m.get(l)! * right)
            return false
        }],
        ['mod', (m: Memory) => {
            let right = parseInt(r)
            right = isNaN(right) ? m.get(r)! : right
            m.set(l, m.get(l)! % right)
            return false
        }],
        ['div', (m: Memory) => {
            let right = parseInt(r)
            right = isNaN(right) ? m.get(r)! : right
            m.set(l, Math.floor(m.get(l)! / right))
            return false
        }],
        ['eql', (m: Memory) => {
            let right = parseInt(r)
            right = isNaN(right) ? m.get(r)! : right
            m.set(l, m.get(l)! === right! ? 1 : 0)
            return false
        }],
        ['inp', (m: Memory, input: number | undefined) => {
            m.set(l, input!); return true
        }],
    ])
    return dict.get(cmd)
}

function test(input: number, functions: Instruction[][]) {
    const result = execute(new Map([['x', 0], ['y', 0], ['z', 0], ['w', 0]]), functions, input, new Map<string, Memory>())
    // const result2 = executeCompiled(input)
    // console.log(result, result2)
}
new Solver(solution, 'input.txt', 1).print()
