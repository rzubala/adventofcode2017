import { FileReader } from '../common';

class Pass extends FileReader {
    data: Array<Array<string>> = [];

    constructor() {
        super();
        this.readData('input.data')
        .then(data => {
            this.parse(data);
            //this.log();
            this.check();
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

    check = () => {
        let valid: number = 0;
        this.data.forEach(line => {
            if (!this.hasDuplicates(line)) {
                valid += 1;
            }
        });
        console.log(valid);
    }

    hasDuplicates = (line: Array<string>): boolean => {
        return new Set(line).size !== line.length
    }
}

const pass: Pass = new Pass();
