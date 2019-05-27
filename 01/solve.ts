import { FileReader } from '../common';

class Captcha extends FileReader {
    len: number = 0;
    array: Array<string> = [];
    
    constructor() {
        super();
        this.readData('input.data')
            .then(data => {
                this.len = data.length;
                this.array = data.split('');        
    
                this.calculateSum(1);
                this.calculateSum(this.len/2);             
            })
            .catch(err => console.log(err));
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
