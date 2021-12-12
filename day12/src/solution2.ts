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
    public isSmall() { return !this.isBig() && !['start', 'end'].includes(this.name) }
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
    const paths = new Set<string>()

    const smallVertexes = Array.from(vertexes.values()).filter(v => v.isSmall())
    smallVertexes.forEach(v => traverse([start], end, paths, v))
    // console.table(paths) 
    return paths.size
}

function traverse(path: Vertex[], end: Vertex, paths: Set<string>, singleVertex: Vertex) {
    const lastVertex = path[path.length - 1];
    if (lastVertex === end) {
        if (!paths.has(pathId(path))) {
            paths.add(pathId(path))
        }
        return true
    }
    lastVertex.neigbours.forEach(n => {
        if (!path.filter(p => !p.isBig()).includes(n)) {
            traverse([...path, n], end, paths, singleVertex)
        } else if (n == singleVertex) {
            const occurences = path.reduce((count, v) => v.name == n.name ? ++count : count, 0)
            if (occurences < 2) {
                traverse([...path, n], end, paths, singleVertex)
            }
        }
    })
    return false
}

function pathId(path: Vertex[]): string {
    return path.map(p => p.name).join(',')
}

new Solver(solution, 'input1.txt', 2).print()
