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
            let counter: number = 0;
            for (let i:number = 0;i<40000000;i++) {
                const valA = this.genA & 0xFFFF;
                const valB = this.genB & 0xFFFF;
                if (valA === valB) {
                    counter++;
                }
                this.nextA();
                this.nextB();
            }
            console.log('cnt: ', counter);
        })
        .catch(e => console.log('error: ', e));
    }

    nextA = () => {
        this.genA = this.next(this.genA, this.factorA, this.product);
    }

    nextB = () => {
        this.genB = this.next(this.genB, this.factorB, this.product);
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
}
new Solve();
