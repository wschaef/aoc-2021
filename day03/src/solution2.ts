import * as _ from "lodash";
import { Solver } from "./solver"

const solution: any = (input: string) => {
    const entries = _.chain(input.split("\n").map(it => it.split('').map(it => parseInt(it))))

    //oxygen generator rating
    let oRatings = entries
    let bitNumber = 0
    do {
        oRatings = filterByBit(oRatings, bitNumber++, 1)
    } while (oRatings.size().value() > 1);
    const oRating = oRatings.first().value()

    //CO2 scrubber rating
    let cRatings = entries
    bitNumber = 0
    do {
        cRatings = filterByBit(cRatings, bitNumber++, 0)
    } while (cRatings.size().value() > 1);
    const cRating = cRatings.first().value()

    return ratingValue(oRating) * ratingValue(cRating)
}

function filterByBit(numbers: _.CollectionChain<number[]>, bitNumber: number, mode: number): _.CollectionChain<number[]> {
    const counts = numbers.countBy(it => (it[bitNumber] == 1) ? 1 : 0)
    const numberOfOne = counts.get('1').value()
    const numberOfZerro = counts.get('0').value()
    let filterValue = 1
    if (mode == 1) {
        filterValue = numberOfOne >= numberOfZerro ? 1 : 0
    } else { //mode = 0
        filterValue = numberOfZerro <= numberOfOne ? 0 : 1
    }
    return numbers.filter(it => it[bitNumber] == filterValue)
}

function ratingValue(digits: number[]) { return parseInt(digits.join(''), 2) }

new Solver(solution, 'input1.txt', 2).print()
