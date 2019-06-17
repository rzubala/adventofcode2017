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
            //this.part1();
            console.log(this.isDivisibleBy4(1352636452));
            console.log(this.isDivisibleBy4(1352636453));
            console.log(this.isDivisibleBy8(1233683848));
            console.log(this.isDivisibleBy8(1233683849));

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

    isDivisibleBy4 = (input: number) => {
        const tmpStr: string[] = input.toString().padStart(2, '0').split('');
        const tmp: number = parseInt(tmpStr.slice(tmpStr.length-2, tmpStr.length).join(''));
        return (tmp%4 === 0);
    }

    isDivisibleBy8 = (input: number) => {
        const tmpStr: string[] = input.toString().padStart(3, '0').split('');
        const tmp: number = parseInt(tmpStr.slice(tmpStr.length-3, tmpStr.length).join(''));
        return (tmp%8 === 0);
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
}
new Solve();
