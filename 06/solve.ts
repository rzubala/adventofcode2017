import * as crypto from 'crypto';
import { FileReader } from '../common'

class Debugger extends FileReader {

    private banks: Array<number> = [];

    private hist: Set<String> = new Set();

    private map: Map<string, number> = new Map();

    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            this.banks = fdata.split('\t').map(e => +e);
            this.process();    
        })
        .catch(e => console.log('error: ', e));
    }

    process = () => {
        let cnt: number = 0;
        while(true) {
            console.log(this.banks.join(' '));
            const value = Math.max(...this.banks);        
            const valueIdx: number = this.banks.indexOf(value);
            this.fill(value, valueIdx);
            cnt += 1;            
            if (this.addHistory(cnt)) {
                break;
            }
            if (cnt == 10000) {
                break;
            }
        }        
        console.log('cnt: ', cnt);
    }

    fill = (value: number, index: number) => {
        let idx = index;
        let cnt: number = 0;
        this.banks[index] = 0;
        while(value > cnt) {
            idx = this.next(idx);
            this.banks[idx] += 1; 
            cnt +=1 ;
        }        
    }

    next = (index: number): number => {
        const len: number = this.banks.length;
        index += 1;
        if (index >= len) {
            index = 0;
        }
        return index;
    }

    addHistory = (cnt: number) => {
        if (this.hist.has(this.checksum())) {
            const prev: number = this.map.get(this.checksum());
            console.log('loop: ', cnt - prev);
            return true;
        }
        this.hist.add(this.checksum());
        this.map.set(this.checksum(), cnt);
        return false;
    }

    checksum = (): string => {
        return this.banks.join(',');
    }
}
new Debugger();