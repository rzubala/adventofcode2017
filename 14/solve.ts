import { FileReader } from '../common'
import { HashCalc } from '../10/hash';

class Solve extends FileReader {
    private calc: HashCalc = new HashCalc();
    private rows: number = 128;

    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            console.log(fdata);
            let sum: number = 0;
            for (let r: number=0;r<this.rows;r++) {
                const input: string = fdata + '-' + r;
                const hash: string = this.calc.toKnotHash(input);
                const output: string = this.toBinaryStr(hash);
                sum += output.split('').filter(e => e === '1').length;                
            }
            console.log('sum:', sum);
        })
        .catch(e => console.log('error: ', e));
    }

    toBinaryStr = (hash: string): string => {
        return hash.split('').map(e => parseInt(e, 16).toString(2).padStart(4, '0')).join('');
    }
}
new Solve();
