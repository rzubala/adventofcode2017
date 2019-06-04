import { FileReader } from '../common'

interface Instruction {
    register: string;
    operation: string;
    offset: number;
    reference: string;
    condition: string;
    conditionValue: number;
}

class CPU extends FileReader {

    private instructions: Array<Instruction> = [];

    constructor() {
        super();
        this.readData('test.data')
        .then(fdata => {
            this.parse(fdata)
            console.log(this.instructions);
        })
        .catch(e => console.log('error: ', e));
    }

    parse = (fdata: string) => {
        this.instructions = fdata.split('\n').map(line => {
            console.log(line);            
            const regex: RegExp = /(\w+)\s(inc|dec)\s(-?\d+)\sif\s(\w+)\s((=|<|>|!)+)\s(\d+)/;;
            const match: RegExpExecArray = regex.exec(line);
            if (match != null) {
                const reg: string = match[1];
                const op: string = match[2];
                const offset: number = +match[3];
                const ref: string = match[4];
                const cond: string = match[5];
                const condValue: number = +match[7];
                return {register: reg, operation: op, offset: offset, reference: ref, condition: cond, conditionValue: condValue};
            }    
        });
    }
}
new CPU();