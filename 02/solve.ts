import { FileReader } from '../common';

class Checksum extends FileReader {

    data: Array<Array<number>> = new Array();

    constructor() {
        super();
        this.readData('input.data')
        .then((data) => {
            this.parseData(data);
            this.calcSum();
            this.calcSum2();
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

    calcSum2 = () => {
        let sum: number = 0;
        this.data.forEach(line => {
            const size: number = line.length;
            for (let i=0;i<size;i++) {
                for (let j=i+1;j<size;j++) {
                    const val = this.check(line[i], line[j]);
                    if (val > 0) {
                        sum += val;
                        break;
                    }
                }
            }
        });
        console.log(sum);
    }

    check = (num1: number, num2: number):number => {
        if (num1 > num2 && num1%num2 === 0) {
            return num1/num2;
        }
        if (num2 > num1 && num2%num1 === 0) {
            return num2/num1;
        }
        return 0;
    }
}

new Checksum();