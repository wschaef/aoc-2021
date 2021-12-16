import * as _ from "lodash";
import { Solver } from "./solver"

class Packet {
    public literal: number = -1
    public subPackets = new Array<Packet>()
    constructor(public version: number, public type: number) { }
}
const solution: any = (input: string) => {
    let binaryInput = parseInput(input)

    const missingLeadingZeros = 4 - (binaryInput.length % 4)
    if (missingLeadingZeros < 4) {
        binaryInput = [...new Array(missingLeadingZeros).fill('0'), ...binaryInput]
    }

    const packet = parsePacket(binaryInput)

    const count = countVersions(packet)
    return count
}
function parseInput(input: string) {
    const binStrings = input.split('').map(s => parseInt(s, 16).toString(2).padStart(4, '0'))
    return binStrings.join('').split('')
}

function parsePacket(binaryInput: string[], parent?: Packet) {

    const version = getNext(binaryInput, 3);
    const type = getNext(binaryInput, 3);
    const packet = new Packet(version, type)

    if (type == 4) {
        packet.literal = parseLiteral(binaryInput);
    } else {
        parseContent(binaryInput, packet);
    }

    parent?.subPackets?.push(packet)
    return packet
}

function parseContent(binaryInput: string[], parent: Packet) {
    const lengthTypeId = getNext(binaryInput, 1);
    if (lengthTypeId == 0) {
        const totalLength = getNext(binaryInput, 15);
        const subPackets = binaryInput.splice(0, totalLength);
        do {
            parsePacket(subPackets, parent)
        } while (subPackets.includes('1'))
    } else if (lengthTypeId == 1) {
        const numberSubPackets = getNext(binaryInput, 11)
        for (let i = 0; i < numberSubPackets; i++) {
            parsePacket(binaryInput, parent)
        }
    }

}

function getNext(binaryInput: string[], numberOfDigits: number) {
    return parseInt(binaryInput.splice(0, numberOfDigits).join(''), 2);
}

function parseLiteral(binaryInput: string[]): number {
    const chunks = _.chunk(binaryInput, 5)
    let value: string[] = []
    let count = 0
    for (const chunk of chunks) {
        value = [...value, ...chunk.slice(1, 5)]
        count = count + 5
        if (chunk[0] == '0') {
            break
        }
    }
    binaryInput.splice(0, count)
    const litValue = parseInt(value.join(''), 2)
    return litValue
}

function countVersions(packet: Packet): number {
    return packet.version + packet.subPackets.reduce((sum, p) => sum + countVersions(p), 0)
}


//new Solver(solution, 'input.txt', 1).print()

