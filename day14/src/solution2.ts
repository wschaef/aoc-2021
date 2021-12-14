import { Solver } from "./solver"

const solution: any = (input: string) => {
    const [templateInput, pairsInput] = input.split("\n\n")
    let template = templateInput.split('')
    const pairsList = pairsInput.split('\n').map(it => it.split(' -> '))
    const rules = pairsList.reduce((map, p) => map.set(p[0], p[1]), new Map())

    //init pairs with the template input
    let pairs = new Map<string, number>()
    for (let i = 0; i < template.length - 1; i++) {
        const elem = template[i]
        const next = template[i + 1]
        let count = pairs.get(elem + next)
        pairs.set(elem + next, count ? ++count : 1)
    }

    //iterate n times
    for (let i = 0; i < 40; i++) {
        pairs = applyRules(pairs, rules);

    }
    const counts = Array.from(countElems(pairs, templateInput).values())

    return Math.max(...counts) - Math.min(...counts)
}
function countElems(pairs: Map<string, number>, initialTemplate: string) {
    const counts = new Map<string, number>();

    for (let [pair, count] of pairs) {
        const [l, r] = pair.split('');
        let countL = counts.get(l) || 0;
        counts.set(l, countL + count);
        let countR = counts.get(r) || 0;
        counts.set(r, countR + count);
    }
    //elements were counted twice except the corners
    const first = initialTemplate.substr(0, 1)
    const last = initialTemplate.substr(-1)
    counts.set(first, counts.get(first) as number + 1)
    counts.set(last, counts.get(last) as number + 1)
    for (const [elem, count] of counts) {
        counts.set(elem, count / 2)
    }
    return counts;
}

function applyRules(pairs: Map<string, number>, rules: Map<any, any>) {
    let newPairs = new Map<string, number>()
    for (let [pair, count] of pairs) {
        const [l, r] = pair.split('');
        const elem = rules.get(pair);
        const pair1 = l + elem;
        const pair2 = elem + r;
        let count1 = newPairs.get(pair1) || 0;
        let count2 = newPairs.get(pair2) || 0;
        newPairs.set(pair1, count1 + count);
        newPairs.set(pair2, count2 + count);
    }
    return newPairs
}

new Solver(solution, 'input1.txt', 2).print()
