import { Solver } from "./solver"

const solution:any = (input:string) => { 
    const entries = input.split(",")
    return entries
} 

new Solver(solution,'input1.txt',1).print()
 