import { Solver } from "./solver"

const solution = (input:string) => { 
    return input.split(",")
} 

new Solver(solution,'input1.txt',2).print()
 