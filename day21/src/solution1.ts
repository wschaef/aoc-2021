import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const positions = input.split("\n").map(line => parseInt(line.split(' ')[4]))
    const scores = positions.map(p => 0)
    let globalDice = 0
    let rolledTimes = 0
    do {
        for (let i = 0; i < 2; i++) {
            for (let n = 0; n < 3; n++) {
                positions[i] += ++globalDice
                positions[i] = (positions[i] - 1) % 10 + 1
                ++rolledTimes
            }
            scores[i] += positions[i]
            if (scores[i] > 999) {
                break
            }
        }
    } while (scores.every(p => p < 1000));


    console.log(scores, rolledTimes)

    return Math.min(...scores) * rolledTimes
}


//new Solver(solution, 'input.txt', 1).print()
