import * as _ from "lodash";
import { Solver } from "./solver"

class Vertex {
    public neigbours = new Array<Vertex>()
    constructor(public name: string) { }
    public addNeigbour(v: Vertex) {
        if (!this.neigbours.includes(v)) {
            this.neigbours.push(v)
        }
    }
    public isBig() { return this.name === this.name.toUpperCase() }
}

const solution: any = (input: string) => {
    const lines = input.split("\n").map(line => line.split('-'));
    const vertexes = new Map(_.uniq(lines.flat()).map(v => [v, new Vertex(v)]))
    // parse edges
    lines.forEach(([v1, v2]) => {
        vertexes.get(v1)?.addNeigbour(vertexes.get(v2) as Vertex)
        vertexes.get(v2)?.addNeigbour(vertexes.get(v1) as Vertex)
    })

    const start = vertexes.get('start') as Vertex
    const end = vertexes.get('end') as Vertex
    const paths: Vertex[][] = []

    traverse([start], end, paths)
    return paths.length
}

function traverse(path: Vertex[], end: Vertex, paths: Vertex[][]) {
    const lastVertex = path[path.length - 1];
    if (lastVertex === end) {
        paths.push(path)
        return true
    }
    lastVertex.neigbours.forEach(n => {
        if (!path.filter(p => !p.isBig()).includes(n)) {
            traverse([...path, n], end, paths)
        }
    })
    return false
}



new Solver(solution, 'input1.txt', 1).print()
