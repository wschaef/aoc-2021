import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (inputStr: string) => {

    const [algorithmusStr, imageStr] = inputStr.split("\n\n")
    const algorithmus = algorithmusStr.split('')
    const image = imageStr.split('\n').map(line => line.split(''))

    let newImage = expandImage(image, '.')
    const numberIterations = 2
    for (let i = 0; i < numberIterations; i++) {
        newImage = iterate(newImage, algorithmus)
    }
    // print(newImage)
    return newImage.flat().reduce((sum, v) => v == '#' ? ++sum : sum, 0)
}

function iterate(image: string[][], algorithmus: string[]) {
    const newImage = expandImage(image)
    const space = newImage[0][0]
    const result = newImage.map((row, i) => newImage[i]
        .map((value, j) => nextValue(newImage, i, j, algorithmus, space))
    )
    return result
}

function expandImage(image: string[][], fillChar: string = image[0][0]) {
    const newImage = _.cloneDeep(image)
    const upBorder = image[0]
    newImage.unshift(new Array(image.length).fill(fillChar))
    newImage.push(new Array(image.length).fill(fillChar))
    newImage.map(line => line.unshift(fillChar))
    newImage.map(line => line.push(fillChar))
    return newImage
}

function nextValue(image: string[][], i: number, j: number, alg: string[], space: string): string {
    const localImage = getLocalImage(image, i, j, space).map(it => it == '#' ? 1 : 0)
    const position = parseInt(localImage.join(''), 2)
    // console.log(i, j, alg[position], position, localImage.join(''));
    return alg[position]
}
// return 3,5 or 8 neighbour points
function getLocalImage(lines: string[][], i: number, j: number, space: string): string[] {
    const coordinates = [
        [i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
        [i, j - 1], [i, j], [i, j + 1],
        [i + 1, j - 1], [i + 1, j], [i + 1, j + 1],
    ]
    const result = coordinates.map(([I, J]) =>
        (I >= 0 && I < lines.length && J >= 0 && J < lines[0].length) ? lines[I][J] : space
    )
    return result
}

function print(image: string[][]) {
    console.log(image.map(row => row.join('')).join('\n') + '\n')
}

new Solver(solution, 'input.txt', 1).print()