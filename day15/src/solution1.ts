import { Solver } from "./solver"

class Node {
    public neighbours: Node[] = new Array<Node>()
    public distance: number = Number.MAX_VALUE
    public visited: boolean = false
    constructor(public value: number, public i: number, public j: number) { }
}


const solution = (input: string) => {
    const lines = input.split("\n").map(line => line.split('').map(it => parseInt(it)))
    const map = lines.map((line, i) => line.map((field, j) => new Node(field, i, j))) // used for lookup the points
    const nodes = map.flat();
    nodes.forEach(n => n.neighbours = getNeighbours(lines, n.i, n.j, map))
    // input is parsed to an array of nodes with neighbours as references

    const unvisited = new Set(nodes)
    const startNode = nodes[0]
    startNode.distance = 0
    const endNode = nodes.slice(-1)[0]


    let currentNode = startNode
    do {
        currentNode = iterate(currentNode, endNode, unvisited)
    } while (currentNode != endNode);

    console.log(currentNode.distance)

    // console.table(unvisited)
    return currentNode.distance
}

function iterate(startNode: Node, endNode: Node, unvisited: Set<Node>): Node {

    let currentNode = startNode
    // console.log('currentNode: ', currentNode.i, currentNode.j, currentNode.distance);

    currentNode.neighbours.filter(n => !n.visited)
        .forEach(n => n.distance = Math.min(n.distance, currentNode.distance + n.value))
    currentNode.visited == true
    unvisited.delete(currentNode)

    if (currentNode == endNode) {
        console.log("ende")
        return currentNode
    }

    let min = Number.MAX_VALUE
    unvisited.forEach(n => {
        if (min >= n.distance) {
            min = n.distance
            currentNode = n
        }
    })
    return currentNode
}

function getNeighbours(lines: number[][], i: number, j: number, dict: Node[][]): Node[] {
    const coordinates = [[i - 1, j], [i, j + 1], [i + 1, j], [i, j - 1]]
        // const coordinates = [[i, j + 1], [i + 1, j]]
        .filter(([I, J]) => I >= 0 && I < lines.length && J >= 0 && J < lines[0].length)
    const result = coordinates.map(([I, J]) => dict[I][J])
    return result
}

new Solver(solution, 'input1.txt', 1).print()
