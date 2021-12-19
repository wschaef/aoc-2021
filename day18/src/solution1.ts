import { assert } from "console";
import * as _ from "lodash";
import { has } from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const entries = input.split("\n")
    const fishes = entries.map(it => JSON.parse(it)) as number[]
    test()
    next(fishes)

    return fishes
}

// new Solver(solution, 'input1.txt', 1).print()
function next(fishes: number[]) {
    return fishes
}
function explode(input: any[], depth: number = 4): any[] {
    let [left, right] = input
    let resultLeft: any = Array.isArray(left) ? explode(left, --depth) : left
    let resultRight: any = Array.isArray(right) ? explode(right, --depth) : right
    if (depth == 0) {
        if (isArrayOfTwoNumbers(resultLeft) && Number.isInteger(resultRight)) {
            console.log(depth)
            const [l, r] = resultLeft
            resultRight = resultRight + r
            resultLeft = 0
        } else if (Number.isInteger(resultLeft) && isArrayOfTwoNumbers(resultRight)) {
            const [l, r] = resultRight
            resultLeft = resultLeft + l
            resultRight = 0
        }
    }
    return [resultLeft, resultRight]
}
function explode2(input: any[], depth = 4) {
    const l = input.flat().flat().flat()
    console.log(JSON.stringify(l))
    for (let i = 0; i < l.length; i++) {
        const e = l[i];
        if (isArrayOfTwoNumbers(e)) {
            if (i > 0) {
                l[i - 1] = l[i - 1] + e[0]
            }
            if (i < l.length - 1) {

                l[i + 1] = l[i + 1] + e[1]
            }
            l[i] = 0
            break;
        }
    }


    return l
}

function isArrayOfTwoNumbers(input: any[]): boolean {
    return Array.isArray(input) && input.every(elem => Number.isInteger(elem))
}
function sum(input: any) {
    let [left, right] = input
    const resultLeft: any = Array.isArray(left) ? sum(left) : left
    const resultRight: any = Array.isArray(right) ? sum(right) : right
    if (Number.isInteger(resultLeft) && Number.isInteger(resultRight)) {
        return resultLeft + resultRight
    } else {
        console.log("should never happen")
    }
}

function test() {
    assert(sum([[[[[9, 8], 1], 2], 3], 4]) == 27, "sum")
    // assertEqual(explode([[[[[9, 8], 1], 2], 3], 4]), [[[[0, 9], 2], 3], 4])
    // assertEqual(explode([7, [6, [5, [4, [3, 2]]]]]), [7, [6, [5, [7, 0]]]])
    // assertEqual(explode([[6, [5, [4, [3, 2]]]], 1]), [[6, [5, [7, 0]]], 3])
    assertEqual(explode2([[6, [5, [4, [3, 2]]]], 1]), [[6, [5, [7, 0]]], 3])
    // assertEqual(explode([[3, [2, [1, [7, 3]]]], [6, [5, [4, [3, 2]]]]]), [[3, [2, [8, 0]]], [9, [5, [4, [3, 2]]]]])
    // assertEqual(explode([[3, [2, [8, 0]]], [9, [5, [4, [3, 2]]]]]), [[3, [2, [8, 0]]], [9, [5, [7, 0]]]])
    // console.log([[[6, [5, [7, 0]]], 3]].flat().flat())
    // console.log([[6, [5, [4, [3, 2]]]], 1].flat())
    // console.log([[6, [5, [4, [3, 2]]]], 1].flat().flat())
    // console.log([[6, [5, [4, [3, 2]]]], 1].flat().flat().flat())
    // console.log(JSON.stringify([[3, [2, [1, [7, 3]]]], [6, [5, [4, [3, 2]]]]]))
    // console.log(JSON.stringify([[3, [2, [1, [7, 3]]]], [6, [5, [4, [3, 2]]]]].flat()))
    // console.log(JSON.stringify([[3, [2, [1, [7, 3]]]], [6, [5, [4, [3, 2]]]]].flat().flat()))
    // console.log(JSON.stringify([[3, [2, [1, [7, 3]]]], [6, [5, [4, [3, 2]]]]].flat().flat().flat()))

    //assertEqual(explode2([[3, [2, [1, [7, 3]]]], [6, [5, [4, [3, 2]]]]]), [[3, [2, [8, 0]]], [9, [5, [4, [3, 2]]]]])
}
function assertEqual(a: any, b: any) {
    a = JSON.stringify(a);
    b = JSON.stringify(b);
    if (a !== b) {
        console.table([a, b])
    }
    return a == b
}

