import { FileReader } from '../common';

class HashCalc extends FileReader {
    private lengths: Array<number>;
    private data: Array<number>;
    private size: number = 256;
    private index: number = 0;
    private skipSize: number = 0;

    constructor() {
        super();
        this.data = Array.from(Array(this.size), (x, index) => index);
        this.readData('input.data')
        .then(fdata => {
            this.lengths = fdata.split(',').map(e => +e);
            this.lengths.forEach(l => {
                this.handleSubList(l);                    
            })
            console.log('check: ', this.data[0] * this.data[1]);
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
}
new HashCalc();