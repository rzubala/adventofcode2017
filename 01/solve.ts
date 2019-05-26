import * as file from 'fs';

class Captcha {
    len: number = 0;
    array: Array<string> = [];
    
    constructor() {
        this.readData(this);
    }

    readData = (captcha: Captcha) => {
        file.readFile('input.data', 'utf8', function(err, data) {  
            if (err) {
                throw err;
            }    
            captcha.len = data.length;
            captcha.array = data.split('');        

            captcha.calculateSum(1);
            captcha.calculateSum(captcha.len/2);
        });
    }

    calculateSum = (inc: number) => {
        let sum: number = 0;
        for (let i=0;i<this.len;i++) {
            const current: string = this.array[i];
            let nextIndex: number = (i + inc) % this.len;
            const next: string = this.array[nextIndex];
            if (current===next) {
                sum += +current;
            }
        }
        console.log('sum:', sum);
    }
}
new Captcha();
