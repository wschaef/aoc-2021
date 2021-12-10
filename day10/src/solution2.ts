import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const lines = input.split("\n").map(it => it.split(''))
    const pairs = new Map([['(', ')'], ['[', ']'], ['{', '}'], ['<', '>']])
    const incompleteLines = lines.map(line => check(line, pairs)).filter(it => it.length > 1)
    const completions = incompleteLines.map(line => line.map(c => pairs.get(c) as string))
    const scores = completions.map(line => getScore(line))
    const result = scores.sort((a, b) => a - b)[Math.trunc(completions.length / 2)]
    return result
}

function getScore(line: string[]) {
    const scoreTable = new Map([[')', 1], [']', 2], ['}', 3], ['>', 4]])
    return line.reverse().map(c => scoreTable.get(c) as number).reduce((total, c) => total * 5 + c, 0)
}

function check(line: string[], pairs: Map<string, string>) {
    let stack = []
    for (let i = 0; i < line.length; i++) {
        const last = stack[stack.length - 1];
        const c = line[i]
        if (last === undefined) { //empty array
            stack.push(c)
        } else {
            if (pairs.get(last) === c) { // match opening closing chars
                stack.pop()
            } else {
                if (pairs.get(c) !== undefined) { // it is a opening char
                    stack.push(c)
                } else { // incorrect line because adding closing char
                    stack = [c]
                    break;
                }
            }
        }
    }
    return stack
}

new Solver(solution, 'input1.txt', 1).print()
