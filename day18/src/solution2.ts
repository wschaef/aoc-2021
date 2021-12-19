import { Solver } from "./solver"


class Snail {
    public kind: string = ''
    public parent?: Snail
    public value?: number
    public children?: [Snail, Snail]
    constructor(public input: any[]) {

    }
    public toString(): string {
        if (this.kind == 'literal') {
            return `${this.value}`
        } else {
            return `[${this.children?.[0].toString()},${this.children?.[1].toString()}]`
        }
    }
}

const solution: any = (input: string) => {
    const entries = input.split("\n")
    const lines = entries.map(it => JSON.parse(it)).map(line => new Snail(line))
    const snails = lines.map(l => parse(l))
    let resultSnail = snails[0]
    // tryExplode(resultSnail)

    for (let i = 1; i < snails.length; i++) {
        const snail = snails[i]
        resultSnail = add(resultSnail, snail)
        console.log("after addition:\t", resultSnail.toString())
        let continiue = false
        do {
            continiue = tryExplode(resultSnail)
            console.log("after explode:\t", resultSnail.toString())
            continiue = trySplit(resultSnail) || continiue
            console.log("after split:\t", resultSnail.toString())
        } while (continiue);
        console.log(resultSnail.toString())
    }
    console.log(resultSnail.toString())
    return magnitude(resultSnail)
}

function parse(snail: Snail) {
    if (Number.isInteger(snail.input)) {
        snail.kind = 'literal'
        snail.value = parseInt(snail.input.toString())
    } else {
        snail.kind = 'pair'
        const [left, right] = snail.input
        snail.children = [
            parse(new Snail(left)),
            parse(new Snail(right))
        ]
        snail.children.forEach(child => child.parent = snail)
    }

    return snail
}

function tryExplode(snail: Snail, depth = 0): boolean {
    // console.log(snail.toString())
    if (snail.kind == 'literal') { return false }
    if (depth == 4) {
        tryAddTo(snail, snail.parent, snail, 0)
        tryAddTo(snail, snail.parent, snail, 1)
        snail.kind = 'literal'
        snail.children = undefined
        snail.value = 0
        return true
    } else {
        depth = depth + 1
        return (
            tryExplode(snail.children?.[0] as Snail, depth) ||
            tryExplode(snail.children?.[1] as Snail, depth)
        )
    }
}
function tryAddTo(source: Snail, to: Snail | undefined, from: Snail, dim: 0 | 1) { //0- left, 1 right
    // console.log("to: ", to?.toString(), "from: ", from.toString(), "source: ", source.toString(), "dimension: ", dim)
    if (to) {
        if (to.kind == 'literal') {

            const sourceChildren = source?.children as [Snail, Snail]
            to.value = (to.value as number) + (sourceChildren[dim].value as number)
        } else if (to) {
            const children = to.children as [Snail, Snail]
            if (children[1 - dim] == from) { //source it the child on the oposite
                tryAddTo(source, children[dim], to, dim) // go down to dim direction
            } else {
                if (children[dim] == from) { // comming from down oposite direction
                    tryAddTo(source, to.parent as Snail, to as Snail, dim) // go up to paren
                } else if (to.parent == from) { //comming from top -> then go down to oposite dim
                    const childrenOfTo = to.children
                    if (childrenOfTo !== undefined) {
                        tryAddTo(source, (childrenOfTo as [Snail, Snail])[1 - dim], to, dim)
                    }
                }
            }
        }
    }
}

function trySplit(snail: Snail): boolean {
    if (snail.kind == 'literal') {
        if (snail.value as number > 9) {
            snail.kind = 'pair'
            const left = new Snail([])
            left.kind = 'literal'
            left.value = Math.floor((snail.value as number) / 2)
            const right = new Snail([])
            right.kind = 'literal'
            right.value = Math.ceil((snail.value as number) / 2)
            snail.children = [left, right]
            snail.children.forEach(s => s.parent = snail)

            return true
        }
    } else {
        const children = snail.children
        if (children) {
            return (
                trySplit((children as [Snail, Snail])[0]) ||
                trySplit((children as [Snail, Snail])[1])
            )
        }
    }
    return false
}

function add(a: Snail, b: Snail): Snail {
    const parent = new Snail([])
    parent.kind = 'pair'
    parent.children = [a, b]
    parent.children.forEach(s => s.parent = parent)
    return parent
}

function magnitude(snail: Snail): number {
    if (snail.kind == 'literal') {
        return snail.value as number
    } else {
        const children = snail.children as [Snail, Snail]
        return (
            3 * magnitude(children[0]) + 2 * magnitude(children[1])
        )
    }
}

new Solver(solution, 'input4.txt', 2).print()
