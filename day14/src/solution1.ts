import * as _ from "lodash";
import { Solver } from "./solver"

class Node {
    constructor(public data: string, public prev?: Node, public next?: Node) {
        this.prev = prev
        this.next = next
    }
}

const solution: any = (input: string) => {
    const [templateInput, pairsInput] = input.split("\n\n")
    let template = templateInput.split('').map(it => new Node(it))
    template.forEach((t, i) => {
        if (i > 0) { t.prev = template[i - 1] }
        if (i < template.length - 1) { t.next = template[i + 1] }
    })
    const pairsList = pairsInput.split('\n').map(it => it.split(' -> '))
    const pairs = pairsList.reduce((map, p) => map.set(p[0], p[1]), new Map())

    let newTemplate = template
    for (let i = 0; i < 10; i++) {
        newTemplate = step(newTemplate, pairs);
    }

    // console.log(newTemplate.map(it => it.data).join(''))

    const counts = _.map(_.countBy(newTemplate, it => it.data), (val, key) => val)
    return Math.max(...counts) - Math.min(...counts)
}

function step(template: Node[], pairs: Map<any, any>) {
    template.forEach((t: Node, i) => {
        if (i < template.length - 1) {
            const next = t.next as Node;
            const pattern = t.data + next.data;
            const newData = pairs.get(pattern);
            if (newData) {
                const newNode = new Node(newData, t, t.next);
                next.prev = newNode;
                t.next = newNode;
            }
        }
    });
    return updateTemplate(template)
}

function updateTemplate(template: Node[]) {
    let t = template[0];
    const newTemplate = [t];
    while (t.next) {
        t = t.next;
        newTemplate.push(t);
    }
    return newTemplate;
}

new Solver(solution, 'input1.txt', 1).print()

