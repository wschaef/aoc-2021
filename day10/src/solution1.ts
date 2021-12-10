import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const lines = input.split("\n").map(it => it.split(''))
    const scoreTable = new Map([[')', 3], [']', 57], ['}', 1197], ['>', 25137]])
    const result = lines.map(line => check(line)).filter(it => it.length == 1).flat()
        .map(it => scoreTable.get(it) as number).reduce((sum, e) => sum + e, 0)
    return result
}
function check(line: string[]) {
    let stack = []
    const pairs = new Map([['(', ')'], ['[', ']'], ['{', '}'], ['<', '>']])
    for (let i = 0; i < line.length; i++) {
        const last = stack[stack.length - 1];
        const c = line[i]
        if (last === undefined) {
            stack.push(c)
        } else {
            if (pairs.get(last) === c) {
                stack.pop()
            } else {
                if (pairs.get(c) !== undefined) {
                    stack.push(c)
                } else {
                    stack = [c]
                    break;
                }
            }
        }
    }
    return stack
}

new Solver(solution, 'input1.txt', 1).print()
