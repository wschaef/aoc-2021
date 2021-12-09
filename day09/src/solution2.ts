import * as _ from "lodash";
import { Solver } from "./solver"

class Point {
    public neighbours: Point[] = new Array<Point>()
    constructor(public value: number, public i: number, public j: number) { }
}

const solution: any = (input: string) => {
    const lines = input.split("\n").map(line => line.split('').map(it => parseInt(it)))
    const dict = lines.map((line, i) => line.map((field, j) => new Point(field, i, j))) // used for lookup the points
    const points = dict.flat()
    points.forEach(p => p.neighbours = getAdjacentFields(lines, p.i, p.j))
    const lowPoints = points.filter(p => p.value < Math.min(...p.neighbours.map(n => n.value)))
    const basins = lowPoints.map(p => getBasin(p, dict))
    const result = basins.sort((a, b) => (a.length - b.length)).map(b => b.length).slice(-3).reduce((prod, elem) => prod * elem, 1)
    return result
}

// return 2,3 or 4 neighbour points, These points are new and have to be mapped to points in dict
function getAdjacentFields(lines: number[][], i: number, j: number): Point[] {
    const coordinates = [[i - 1, j], [i, j + 1], [i + 1, j], [i, j - 1]].filter(([I, J]) => I >= 0 && I < lines.length && J >= 0 && J < lines[0].length)
    const result = coordinates.map(([I, J]) => new Point(lines[I][J], I, J))
    return result
}

//extend basin by adding neighbours to it
function extendBasin(points: Point[], dict: Point[][]): Point[] {
    const result = points.map(p => [p, ...p.neighbours]).flat()
        .filter(p => p.value < 9)
        .map(p => dict[p.i][p.j])
    return _.uniq(result)
}

// get the whole basin for a low point
function getBasin(point: Point, dict: Point[][]): Point[] {
    let prev = [point]
    let next = prev
    do {
        prev = next
        next = extendBasin(prev, dict)
    } while (next.length > prev.length);
    return next
}
new Solver(solution, 'input1.txt', 2).print()
