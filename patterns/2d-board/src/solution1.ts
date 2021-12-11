import * as _ from "lodash";
import { Solver } from "./solver"

class Point {
    public neighbours: Point[] = new Array<Point>()
    constructor(public value: number, public i: number, public j: number) { }
}

const solution: any = (input: string) => {
    const lines = input.split("\n").map(line => line.split('').map(it => parseInt(it))) 
    const board = toBoard(lines); 
    console.table(board)
    return board
}

function toBoard(lines: number[][]) {
    const board = lines.map((line, i) => line.map((field, j) => new Point(field, i, j))); // used for lookup the points
    board.flat().forEach(p => p.neighbours = getNeighbours(lines, p.i, p.j, board));
    return board;
}

// return 3,5 or 8 neighbour points
function getNeighbours(lines: number[][], i: number, j: number, dict:Point[][]): Point[] {
    const coordinates = [[i - 1, j], [i, j + 1], [i + 1, j], [i, j - 1], [i -1 , j + 1], [i+1,j+1],[i+1,j-1],[i-1,j-1]]
            .filter(([I, J]) => I >= 0 && I < lines.length && J >= 0 && J < lines[0].length)
    const result = coordinates.map(([I, J]) => dict[I][J])
    return result
}

new Solver(solution, 'input.txt', 0).print()
