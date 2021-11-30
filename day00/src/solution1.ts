import { Solver } from "./solver"

const solution:any = (input:string) => { 
    return input.split(",")
} 

new Solver(solution,'input1.txt',1).print()
 