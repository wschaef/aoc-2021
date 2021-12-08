import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const lines = input.split("\n").map(it => it.split('|').map(it => it.trim().split(" ")))
    const result = lines.map(line => parseInt(solve(line).map(it => it.toString()).join('')))
    return _.sum(result)
}
function solve(line: string[][]) {

    type validChannel = "a" | "b" | "c" | "d" | "e" | "f" | "g"

    const channels = "abcdefg".split('')
    const segments = { 'a': channels, 'b': channels, 'c': channels, 'd': channels, 'e': channels, 'f': channels, g: channels }
    const [input, output] = line

    // a:8 b:6 c:8 d:7 e:4 f:9 g:7 - get b, e and f by counting the occurences of it in input
    const stats = _.groupBy(channels, c => input.filter(it => it.includes(c)).length)
    segments.b = stats['6']
    segments.e = stats['4']
    segments.f = stats['9']

    // use pattern given by one, seven and four
    const one = input.find(it => it.length == 2)?.split('') as string[]
    const seven = input.find(it => it.length == 3)?.split('') as string[]
    const four = input.find(it => it.length == 4)?.split('') as string[]
    segments.a = _.difference(seven, one)
    segments.d = _.difference(four, [...one, ...segments.b])
    segments.c = _.difference(seven, [...segments.a, ...segments.f])
    segments.g = _.difference(segments.g, [...segments.a, ...segments.b, ...segments.c, ...segments.d, ...segments.e, ...segments.f])

    // create dictionar based on the segments mapping
    const dictionary = [
        "abcefg", "cf", "acdeg", "acdfg", "bcdf", "abdfg", "abdefg", "acf", "abcdefg", "abcdfg"
    ].map(word => word.split("").map(digit => segments[digit as validChannel]).sort().join(''))

    const result = output.map(it => dictionary.indexOf(it.split('').sort().join('')))
    return result
}
new Solver(solution, 'input1.txt', 2).print()
