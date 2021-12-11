import { Solver } from "./solver"

class Point {
    public neighbours: Point[] = new Array<Point>()
    public flashes: number = 0
    constructor(public value: number, public i: number, public j: number) { }
}

const solution: any = (input: string) => {
    const lines = input.split("\n").map(line => line.split('').map(it => parseInt(it))) 
    const map = lines.map((line, i) => line.map((field, j) => new Point(field, i, j))) // used for lookup the points
    const points = map.flat();
    points.forEach(p => p.neighbours = getNeighbours(lines, p.i, p.j, map)) 
    let i = 1
    for (i; i <= 1000; i++) {
        step(points)
        if(points.every(p => p.value == 0)) {
            break
        }
    }
    // console.table(points)
    return i
}

// return 3,5 or 8 neighbour points
function getNeighbours(lines: number[][], i: number, j: number, dict:Point[][]): Point[] {
    const coordinates = [[i - 1, j], [i, j + 1], [i + 1, j], [i, j - 1], [i -1 , j + 1], [i+1,j+1],[i+1,j-1],[i-1,j-1]]
            .filter(([I, J]) => I >= 0 && I < lines.length && J >= 0 && J < lines[0].length)
    const result = coordinates.map(([I, J]) => dict[I][J])
    return result
}

function step(points:Point[]){
    const flashedPoints:Point[] = []
    points.forEach(p => p.value +=1)
    points.forEach(p=> flash(points,p,flashedPoints))
}

function flash(points: Point[], point:Point, flashedPoints:Point[]){
    if(point.value > 9){
        point.value = 0
        flashedPoints.push(point)
        point.flashes++
        point.neighbours.forEach(p=>{
            if(!flashedPoints.includes(p)){
                p.value++
            }
            flash(points,p,flashedPoints)
        })
    }
}


new Solver(solution, 'input1.txt', 2).print()
