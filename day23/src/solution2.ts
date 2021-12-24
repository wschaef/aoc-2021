import * as _ from "lodash";
import { Solver } from "./solver"

class Pod {
    public energy: number = 0
    public cost: Number
    constructor(public type: string) {
        this.cost = costs.get(type)!
    }
}

class Burrow {
    public hallway = new Array<Pod | undefined>(11).fill(undefined)
    public energy = 0
    constructor(public rooms: (Pod | undefined)[][]) { }

    public toString(): string {
        const result = `
        #############
        #${this.hallway.map(h => this.getString(h)).join('')}#
        ###${this.getString(this.rooms[0][0])}#${this.getString(this.rooms[1][0])}#${this.getString(this.rooms[2][0])}#${this.getString(this.rooms[3][0])}###
          #${this.getString(this.rooms[0][1])}#${this.getString(this.rooms[1][1])}#${this.getString(this.rooms[2][1])}#${this.getString(this.rooms[3][1])}#
          #########
        `.replaceAll('        ', '')
        return result
    }

    public getMoves(hallway: (Pod | undefined), pos: number) {
        const moves = []
        switch (pos) {
            case 0:
                if (!this.hallway[1]) return [0, 1]
                break;
            case 1:
                if (!this.hallway[0]) return [0, 1]
                break;
            default:
                break;
        }
    }

    private getString(input: Pod | undefined) {
        return input ? input.type : '.'
    }
}

const solution: any = (input: string) => {
    const roomsList = input.split("\n").slice(2, 4).map(it => it.replaceAll('###', '#').split('#').slice(1, 5))
    const rooms = _.unzip(roomsList).map(rooms => rooms.map(it => new Pod(it)))
    const burrow = new Burrow(rooms)

    console.log(_.sum([8, 30, 7000, 8000, 2, 50, 600, 30, 700, 3, 6, 60]))
    return burrow.toString()
}



const costs = new Map([['A', 1], ['B', 10], ['C', 100], ['D', 1000]])

new Solver(solution, 'input1.txt', 2).print()
