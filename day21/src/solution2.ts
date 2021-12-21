import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const positions = input.split("\n").map(line => parseInt(line.split(' ')[4]))
    const dict = new Map<string, number[]>()
    const startUniverse = [positions, [0, 0]]
    const result = iterate(startUniverse, 0, dict)
    return result[0]
}

function iterate(universe: number[][], player: number, dict: Map<string, number[]>): number[] {
    let result = [0, 0]
    const [positions, scores] = universe
    if (scores[1 - player] >= 21) { // check if before player won
        result[1 - player] = 1
    } else { //iterate for all children
        for (const [diceValue, freq] of sumFrequency) {
            const dictKey = [positions, scores, player, diceValue].toString()
            const res = dict.get(dictKey)
            if (res != undefined) { //cache hit
                result = res
            } else { // no chache hit
                const newUniverse = (turn(_.cloneDeep(universe), player, diceValue))
                const resultFromSubtree = iterate(newUniverse, 1 - player, dict).map(v => v * freq)
                result = [result[0] + resultFromSubtree[0], result[1] + resultFromSubtree[1]]
            }
            dict.set(dictKey, result)
        }
    }
    return result
}

function turn(universe: number[][], player: number, diceValue: number) {
    const [positions, scores] = universe
    positions[player] = (positions[player] + diceValue - 1) % 10 + 1
    scores[player] += positions[player]
    return [positions, scores]
}

const sumFrequency = new Map([
    [3, 1], [4, 3], [5, 6], [6, 7], [7, 6], [8, 3], [9, 1]
])

new Solver(solution, 'input.txt', 2).print()
