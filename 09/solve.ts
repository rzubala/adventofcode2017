import { FileReader } from '../common';

class Garbage extends FileReader {
    private data: Array<string>;
    private score: number = 0;

    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            this.data = fdata.split('');
            
            this.calculateScore();
            console.log('score: ', this.score);
        })
        .catch(e => console.log('error: ', e))
        ;
    }

    calculateScore = () => {
        let level: number = 0;
        let skipNext: boolean = false;
        let garbage: boolean = false;
        this.data.forEach(el => {
            if (skipNext) {
                skipNext = false;
                return;
            }
            if (el === '!') {
                skipNext = true;
            } else if (!garbage && el === '{') {
                level += 1;
            } else if (!garbage && el === '}') {
                this.updateScore(level);
                level -= 1;         
            } else if (el === '<') {       
                garbage = true;
            } else if (el === '>') {       
                garbage = false;
            }
        });
    }

    updateScore = (value: number) => {
        this.score += value;
    }
}
new Garbage();