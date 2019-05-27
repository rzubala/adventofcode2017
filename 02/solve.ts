import * as file from 'fs';

class Checksum {

    data: Array<Array<number>> = new Array();

    constructor() {
        this.readData()
        .then((data) => {
            this.parseData(data);
            this.log();
            this.calcSum();
        })
        .catch(err => console.log('error:', err));
    }

    readData = ():Promise<any> => {
        return new Promise((resolve, reject) => {
            file.readFile('input.data', 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
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