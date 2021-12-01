import { Solver } from "./solver"

const solution = (input:string) => { 
    const entries = input.split('\n').map(it => parseInt(it))
    //map entries to sum of three entries as sliding window
    var slidingEntries = []
    for (let i = 0; i < entries.length - 2; i++) {
        slidingEntries.push(entries[i] + entries[i+1] + entries[i+2])
    }
    // count times when next value is bigger than previous
    var result = 0
    for (let i = 1; i < slidingEntries.length; i++) {
        if(slidingEntries[i-1] < slidingEntries[i]) result++
    }
    return result
} 

new Solver(solution,'input1.txt',2).print()
 