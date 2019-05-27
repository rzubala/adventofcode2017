import { FileReader } from '../common';

class Checksum extends FileReader {

    data: Array<Array<number>> = new Array();

    constructor() {
        super();
        this.readData('input.data')
        .then((data) => {
            this.parseData(data);
            this.log();
            this.calcSum();
        })
        .catch(err => console.log('error:', err));
    }

    parseData = (fdata: string) => {
        fdata.split('\n').forEach(line => {
            this.data.push(line.split('\t').map(c => +c));
        });
    }

    log = () => {
        this.data.forEach(line => {
            console.log(line.join(' '));
        })
    }

    calcSum = () => {
        let sum: number = 0;
        this.data.forEach(line => {
            sum += Math.max(...line) - Math.min(...line);
        });
        console.log(sum);
    }
}

new Checksum();