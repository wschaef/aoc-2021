import { Solver } from "./solver"

const solution: any = (input: string) => {
    let entries = input.split(",").map(it => parseInt(it))
    for (let i = 0; i < 80; i++) {
        entries = transform(entries)
    }
    return entries.length
}

function transform(state: number[]): number[] {
    let newS: number[] = []
    state = state.map(s => {
        if (s == 0) {
            s = 6
            newS.push(8)
        } else {
            --s
        }
        return s
    })
    return [...state, ...newS]
}
new Solver(solution, 'input1.txt', 1).print()
