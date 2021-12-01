import { Solver } from "./solver"

const solution:any = (input:string) => {
    const entries = input.split('\n').map(it => parseInt(it))
    // count times when next value is bigger than previous
    var result = 0
    for (let i = 1; i < entries.length; i++) {
        if(entries[i-1] < entries[i]) result++
    }
    return result
} 

new Solver(solution,'input1.txt',1).print()
 