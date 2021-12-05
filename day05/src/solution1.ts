import * as _ from "lodash";
import { replace } from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const lines = input.split("\n").map(line => line.split(' -> ').map(it => it.split(',').map(it => parseInt(it))))
    const width = Math.max(...lines.flat().flat()) + 1
    const board = new Array(width).fill(0).map(() => new Array(width).fill(0)) as number[][]
    lines.forEach(line => draw(line, board))
    return board.flat().flat().filter(it => it > 1).length
}

function draw(line: number[][], board: number[][]) {
    const [y1, x1, y2, x2] = line.flat()
    let points
    if (x1 == x2) {
        points = _.range(y1, y2)
        points.push(y2)
        points.forEach((y) => board[x1][y] += 1)
    } else if (y1 == y2) {
        points = _.range(x1, x2)
        points.push(x2)
        points.forEach((x) => board[x][y1] += 1)
    }
}
new Solver(solution, 'input1.txt', 1).print()
