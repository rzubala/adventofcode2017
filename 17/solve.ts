class Solve {

    private steps: number = 371;

    private buffer: Array<number> = new Array();

    calculate = (stop: number) => {
        let pos: number = 0;
        for (let i:number = 0;i<stop + 1;i++) {
            const len: number = this.buffer.length;
            if (len !== 0) {
                pos = ((pos + this.steps) % len) + 1;
            } else {
                pos++;
            }
            this.buffer.splice(pos, 0, i);
        }
        console.log('part1: ', this.buffer[pos+1]);
    }

    calculate2 = (stop: number) => {
        let pos: number = 0;
        let result: number = 0;
        for (let i:number = 1;i<stop + 1;i++) {
            pos = ((pos + this.steps) % i) + 1;
            if (pos === 1) {
                result = i;
            }
        }
        console.log('part2: ', result);
    }

}
new Solve().calculate(2017);
new Solve().calculate2(50000000);
