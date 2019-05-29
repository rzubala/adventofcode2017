import { FileReader } from '../common';

class Pass extends FileReader {
    data: Array<Array<string>> = [];

    constructor() {
        super();
        this.readData('input.data')
        .then(data => {
            this.parse(data);
            //this.log();
            this.check1();
            this.check2();
        })
        .catch(e => console.log('error: ', e));
    }

    parse = (fdata: string) => {
        fdata.split('\n').forEach(line => {
            this.data.push(line.split(' '));
        });
    }

    log = () => {
        console.log('log', this.data.length)
        this.data.forEach(line => {
            console.log(line.join(', '))
        })
    }

    check1 = () => {
        let valid: number = 0;
        this.data.forEach(line => {
            if (!this.hasDuplicates(line)) {
                valid += 1;
            }
        });
        console.log(valid);
    }

    check2 = () => {
        let valid: number = 0;
        this.data.forEach(line => {
            if (!this.hasDuplicates(line) && !this.containsAnagrams(line)) {
                valid += 1;
            }
        });
        console.log(valid);
    }

    hasDuplicates = (line: Array<string>): boolean => {
        return new Set(line).size !== line.length
    }

    containsAnagrams = (line: Array<string>): boolean => {
        const converted: Array<string> = line.map(el => el.split('').sort().join(''));
        for (let i=0;i<converted.length;i++) {
            for (let j=i+1;j<converted.length;j++) {                                
                if (converted[i] === converted[j]) {
                    return true;
                }
            }
        }
        return false;
    }
}

const pass: Pass = new Pass();
