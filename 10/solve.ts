import { FileReader } from '../common';

class HashCalc extends FileReader {
    private lengths: Array<number>;
    private data: Array<number>;
    private size: number = 256;
    private index: number = 0;
    private skipSize: number = 0;
    private suffix: number[] = [17, 31, 73, 47, 23];
    private rounds: number = 64;

    constructor() {
        super();
        this.data = Array.from(Array(this.size), (x, index) => index);
        this.readData('input.data')
        .then(fdata => {
            //part 1
            // this.lengths = fdata.split(',').map(e => +e);
            // this.lengths.forEach(l => {
            //     this.handleSubList(l);                    
            // })
            // console.log('check: ', this.data[0] * this.data[1]);

            //part 2
            this.lengths = this.toASCII(fdata).concat(this.suffix);
            for (let r=0;r<this.rounds;r++) {
                this.lengths.forEach(l => {
                   this.handleSubList(l);                    
                });
            }            
            console.log(this.toHex(this.toHash(this.data)));
        })
        .catch(e => console.log('error: ', e));
    }

    handleSubList = (len: number) => {
        this.index %= this.size;
        let end: number = this.index + len;
        let ringEnd: number = -1;
        let toInsert: number = len;
        if (end > this.size) {
            ringEnd = end - this.size;            
            end = this.size;
            toInsert = end - this.index;
        }
        const list: Array<number> = this.data.slice(this.index, end);
        if (ringEnd > 0) {
            list.push(...this.data.slice(0, ringEnd));
        }
        list.reverse();
        this.data.splice(this.index, toInsert, ...list.slice(0, toInsert));
        if (ringEnd > 0) {
            this.data.splice(0, ringEnd, ...list.slice(toInsert));
        }        
        this.index += len + this.skipSize;
        this.skipSize += 1; 
    }

    toHash = (data: number[]): number[] => {
        const result: number[] = [];
        for (let h=0;h<data.length/16;h++) {
            result.push(data.slice(h * 16, (h + 1) *16).reduce((acc, curr) => acc ^ curr));
        }
        return result;
    }

    toHex = (data: number[]): string => {
        return data.map(d => d.toString(16)).reduce((acc, curr) => (+acc <= 9 ? '0' : '') + acc + (+curr <= 9 ? '0' : '') + curr );
    }

    toASCII = (value: string): number[] => {
        return value.split('').map(c => c.charCodeAt(0));
    }
}
new HashCalc();