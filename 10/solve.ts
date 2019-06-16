import { FileReader } from '../common';

export class HashCalc extends FileReader {
    private data: Array<number>;
    private buffer: Array<number>;
    private size: number = 256;
    private index: number = 0;
    private skipSize: number = 0;
    private suffix: number[] = [17, 31, 73, 47, 23];
    private rounds: number = 64;

    constructor() {
        super();
        this.data = Array.from(Array(this.size), (x, index) => index);
    }

    start() {
        this.readData('input.data')
        .then(fdata => {
            //part 1
            let lengths: Array<number> = fdata.split(',').map(e => +e);
            this.buffer = [...this.data];
            lengths.forEach(l => {
                this.handleSubList(l);                    
            })
            console.log('check: ', this.buffer[0] * this.buffer[1]);

            //part 2
            console.log(this.toKnotHash(fdata));
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
        const list: Array<number> = this.buffer.slice(this.index, end);
        if (ringEnd > 0) {
            list.push(...this.buffer.slice(0, ringEnd));
        }
        list.reverse();
        this.buffer.splice(this.index, toInsert, ...list.slice(0, toInsert));
        if (ringEnd > 0) {
            this.buffer.splice(0, ringEnd, ...list.slice(toInsert));
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

    toKnotHash = (input: string): string => {
        const lengths: Array<number> = this.toASCII(input).concat(this.suffix);
        this.buffer = [...this.data];
        this.index = 0;
        this.skipSize = 0;    
        for (let r=0;r<this.rounds;r++) {
            lengths.forEach(l => {
               this.handleSubList(l);                    
            });
        }            
        return this.toHex(this.toHash(this.buffer));
    }
}

//new HashCalc().start();