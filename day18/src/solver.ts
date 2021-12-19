import * as fs from 'fs';
export class Solver {

    private input: string

    constructor(
        public solve: (input: string) => any,
        private inputFileName: string,
        private challengeNr: number
    ) {
        this.input = fs.readFileSync(inputFileName, 'utf8');
    }

    print(): void {
        console.info(`\n######  Challenge ${this.challengeNr}  #`.padEnd(64, '#'))
        const begin = Date.now();

        const result = this.solve(this.input)

        const end = Date.now();
        console.log("RESULT :", result)
        console.log(`######  ${end - begin}ms  #`.padEnd(63, '#'))
    }
}