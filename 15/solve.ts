import { FileReader } from '../common'

class Solve extends FileReader {
    private genA: number;
    private genB: number;
    private factorA: number = 16807;
    private factorB: number = 48271;
    private product: number = 2147483647;

    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            this.parse(fdata);            
            this.part1();

            this.genA = undefined;
            this.genB = undefined;
            this.parse(fdata);            
            this.part2();

        })
        .catch(e => console.log('error: ', e));
    }

    nextA = () => {
        this.genA = this.next(this.genA, this.factorA, this.product);
    }

    nextA2 = () => {
        while (true) {
            this.genA = this.next(this.genA, this.factorA, this.product);
            if (this.isDivisibleBy4(this.genA)) {
                break;
            }
        }
    }

    nextB = () => {
        this.genB = this.next(this.genB, this.factorB, this.product);
    }

    nextB2 = () => {
        while (true) {
            this.genB = this.next(this.genB, this.factorB, this.product);
            if (this.isDivisibleBy8(this.genB)) {
                break;
            }
        }
    }

    next = (value1: number, value2: number, product: number): number => {
        return (value1 * value2) % this.product;
    }

    private parse = (fdata: string) => {
        fdata.split('\n').forEach(row => {
            const cols = row.split('with ');
            if (this.genA) {
                this.genB = +cols[1];
            }
            else {
                this.genA = +cols[1];
            }
        });
    }

    isDivisibleBy4 = (input: number) => {
        const tmp: number = input & 0x7;
        return (tmp === 0 || tmp === 4);
    }

    isDivisibleBy8 = (input: number) => {
        const tmp: number = input & 0xF;
        return (tmp === 0 || tmp === 8);
    }

    private part1 = () => {
        let counter: number = 0;
        for (let i: number = 0; i < 40000000; i++) {
            const valA = this.genA & 0xFFFF;
            const valB = this.genB & 0xFFFF;
            if (valA === valB) {
                counter++;
            }
            this.nextA();
            this.nextB();
        }
        console.log('cnt: ', counter);
    }

    private part2 = () => {
        let counter: number = 0;
        for (let i: number = 0; i < 5000000; i++) {
            const valA = this.genA & 0xFFFF;
            const valB = this.genB & 0xFFFF;
            if (valA === valB) {
                counter++;
            }
            this.nextA2();
            this.nextB2();
        }
        console.log('cnt: ', counter);
    }

}
new Solve();
