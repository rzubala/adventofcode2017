import * as file from 'fs';

class Captcha {
    len: number = 0;
    array: Array<string> = [];
    
    constructor() {
        this.readData()
            .then(data => {
                this.len = data.length;
                this.array = data.split('');        
    
                this.calculateSum(1);
                this.calculateSum(this.len/2);             
            })
            .catch(err => console.log(err));
    }

    readData = ():Promise<any> => {
        return new Promise((resolve, reject) => {
            file.readFile('input.data', 'utf8', function(err, data) {  
                if (err) {
                    reject(err);
                }
                resolve(data);
            })
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
