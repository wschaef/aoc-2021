import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const unalignedScanners = parseInput(input)
    unalignedScanners.forEach(s => s.calcRelativeVectors())
    let alignedScanners = unalignedScanners.splice(0, 1)
    alignedScanners = alignScanner(alignedScanners, unalignedScanners)
    const distancies = getDistances(alignedScanners)
    return Math.max(...distancies)
}

class Point {
    constructor(public x: number, public y: number, public z: number) { }

    public toString() {
        return [this.x, this.y, this.z].map(it => it.toString().padStart(3)).toString()
    }

    public getVector(other: Point): Vector {
        return new Vector(other.x - this.x, other.y - this.y, other.z - this.z)
    }

    public isEqual(other: Point): boolean {
        return this.x == other.x &&
            this.y == other.y &&
            this.z == other.z
    }
}

class Vector {
    constructor(public dx: number, public dy: number, public dz: number) { }

    public distance(): number {
        return Math.abs(this.dx) + Math.abs(this.dy) + Math.abs(this.dz)
    }

    public isEqual(other: Vector): boolean {
        return this.dx == other.dx &&
            this.dy == other.dy &&
            this.dz == other.dz
    }
}

class Scanner {
    public vectors = new Array<Vector>()
    public offset = new Vector(0, 0, 0)

    constructor(public beacons: Point[]) { }

    public toString() {
        return `\n${this.beacons.map(b => `\n[${b}]`)}`
    }

    public calcRelativeVectors() {
        this.vectors = new Array<Vector>()
        for (let i = 0; i < this.beacons.length - 1; i++) {
            const b1 = this.beacons[i]
            for (let j = i + 1; j < this.beacons.length; j++) {
                this.vectors.push(b1.getVector(this.beacons[j]))
            }
        }
    }
    public getAllRotations(): Scanner[] {
        const scanners = new Array<Scanner>()
        const rotationsAroundFacingSide = [
            (b: Point) => { }, // 0
            (b: Point) => { const t = b.x; b.x = b.y; b.y = t * -1 }, // 90
            (b: Point) => { b.x = b.x * -1; b.y = b.y * -1; }, // 180
            (b: Point) => { const t = b.x; b.x = b.y * -1; b.y = t } // 270
        ]
        const changeFacingSide = [
            (b: Point) => { }, //front
            (b: Point) => { const t = b.y; b.y = b.z * - 1; b.z = t }, // top
            (b: Point) => { const t = b.x; b.x = b.z * - 1; b.z = t }, // right
            (b: Point) => { const t = b.y; b.y = b.z; b.z = t * -1 }, // bottom
            (b: Point) => { const t = b.x; b.x = b.z; b.z = t * -1 }, // left
            (b: Point) => { b.x = b.x * -1; b.z = b.z * -1 } // back
        ]
        changeFacingSide.forEach(f => {
            rotationsAroundFacingSide.forEach(r => {
                const next = _.cloneDeep(this)
                next.beacons.forEach(b => { f(b); r(b); })
                scanners.push(next)
            })
        })
        return scanners
    }
}

function getDistances(scanners: Scanner[]) {
    const distancies = new Array<number>()
    scanners.forEach(s1 => {
        const p1 = new Point(s1.offset.dx, s1.offset.dy, s1.offset.dz)
        scanners.forEach(s2 => {
            const p2 = new Point(s2.offset.dx, s2.offset.dy, s2.offset.dz)

            distancies.push(p1.getVector(p2).distance())
        })
    })
    return distancies
}

function alignScanner(alignedScanners: Scanner[], unalignedScanners: Scanner[]): Scanner[] {
    if (unalignedScanners.length == 0) {
        return alignedScanners
    }
    for (const nextScanner of unalignedScanners) {
        for (const alignedScanner of alignedScanners) {
            const rotatedScans = nextScanner.getAllRotations()
            rotatedScans.forEach(s => s.calcRelativeVectors())
            for (const candidate of rotatedScans) {
                const countIntersections = hasIntersection(alignedScanner, candidate)
                if (countIntersections >= 12) {
                    match(alignedScanner, candidate)
                    alignedScanners.push(candidate)
                    unalignedScanners = unalignedScanners.filter(it => it != nextScanner)
                    return alignScanner(alignedScanners, unalignedScanners)
                }
            }
        }
    }
    return alignedScanners
}

function hasIntersection(s1: Scanner, s2: Scanner): number {
    const intersections = _.intersectionWith(s1.vectors, s2.vectors, (v1, v2) => v1.isEqual(v2))
    return intersections.length
}

function match(s1: Scanner, s2: Scanner): void {
    const intersections = _.intersectionWith(s1.vectors, s2.vectors, (v1, v2) => v1.isEqual(v2))
    for (const intersection of intersections) {
        const s1b = findFirstIntersectedBacon(intersection, s1);
        const s2b = findFirstIntersectedBacon(intersection, s2);
        if (s1b && s2b) {
            const offset = s1b.getVector(s2b)
            s2.offset = offset
            s2.beacons.forEach(b => {
                b.x -= offset.dx
                b.y -= offset.dy
                b.z -= offset.dz
            })
            s2.calcRelativeVectors()
            return
        }
    }

    function findFirstIntersectedBacon(intersection: Vector, s: Scanner) {
        for (let i = 0; i < s.beacons.length - 1; i++) {
            const b = s.beacons[i];
            for (let j = i + 1; j < s.beacons.length; j++) {
                if (b.getVector(s.beacons[j]).isEqual(intersection)) {
                    return b;
                }
            }
        }
        return undefined
    }
}

function parseInput(input: string): Scanner[] {
    return input.split("\n\n").map(it => it.split('\n').slice(1))
        .map(it => it.map(b => b.split(',').map(v => parseInt(v))))
        .map(it => it.map(b => new Point(...b as [number, number, number])))
        .map(it => new Scanner(it));
}

new Solver(solution, 'input.txt', 2).print()