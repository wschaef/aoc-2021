import * as _ from "lodash";
import path from "path/posix";
import { Solver } from "./solver"

class Point {
    public neighbours: Point[] = new Array<Point>()
    constructor(public risk: number, public i: number, public j: number) { }
}

class Path {
    public risk = 0
    public points: Set<Point>
    public last: Point
    constructor(private start: Point) {
        this.points = new Set([start])
        this.risk = start.risk
        this.last = start
    }
    public add(point: Point): Path {
        this.points.add(point)
        this.risk += point.risk
        this.last = point
        return this
    }
    public copy(): Path {
        const newPath = new Path(this.start)
        newPath.risk = this.risk
        newPath.points = new Set(this.points)
        newPath.last = this.last
        return newPath
    }
    public hasPoint(point: Point): boolean {
        return this.points.has(point)
    }
    public toString() {
        const points = Array.from(this.points.values()).map(p => p.risk)
        return `${this.risk} -- ${this.id()}`
    }
    public id(): string {
        return Array.from(this.points.values()).map(p => p.risk).join(',')
    }
}

class State {
    constructor(public minRisk: number) { }
    public update(risk: number) {
        this.minRisk = Math.min(this.minRisk, risk)
    }
}

const solution: any = (input: string) => {
    const lines = input.split("\n").map(line => line.split('').map(it => parseInt(it)))
    const map = lines.map((line, i) => line.map((field, j) => new Point(field, i, j))) // used for lookup the points
    const points = map.flat();
    points.forEach(p => p.neighbours = getNeighbours(lines, p.i, p.j, map))

    const start = points[0];
    const path = new Path(start);

    let paths = new Map([[path.id(), path]])
    const state = new State(Number.MAX_VALUE)
    step(path, paths, points.slice(-1)[0], state)
    print(paths);
    console.log(state)
    return state.minRisk - start.risk
}

function print(paths: Map<string, Path>) {
    console.table(Array.from(paths.values()).map(it => it.toString()));
}

// return 3,5 or 8 neighbour points
function getNeighbours(lines: number[][], i: number, j: number, dict: Point[][]): Point[] {
    const coordinates = [[i - 1, j], [i, j + 1], [i + 1, j], [i, j - 1]]
        // const coordinates = [[i, j + 1], [i + 1, j]]
        .filter(([I, J]) => I >= 0 && I < lines.length && J >= 0 && J < lines[0].length)
    const result = coordinates.map(([I, J]) => dict[I][J])
    return result
}

function step(path: Path, paths: Map<string, Path>, end: Point, state: State) {
    if (path.points.size > 1000) {
        return
    }
    let deadlock = true // if all neigbours are part of path
    path.last.neighbours.forEach(p => {
        if (!path.hasPoint(p)) {
            deadlock = false
            // console.log(p.risk, path.toString())
            paths.delete(path.id())
            const newPath = path.copy().add(p)
            if (newPath.risk < state.minRisk) {
                paths.set(newPath.id(), newPath)
            }
            //print(paths) 
            if (p !== end) {
                if (newPath.risk < state.minRisk) {
                    step(newPath, paths, end, state)
                }
            } else {
                state.update(newPath.risk)
                //cleanUp(paths, state)
                console.log(paths.size, state)
            }
        }
    })
    if (deadlock) {
        paths.delete(path.id())
    }
    // console.log(state, paths.size)
}

function cleanUp(paths: Map<string, Path>, state: State) {
    for (const path of paths.entries()) {
        if (path[1].risk > state.minRisk) {
            paths.delete(path[0])
        }
    }
}

new Solver(solution, 'input.txt', 1).print()
