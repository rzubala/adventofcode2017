import { FileReader } from '../common'

interface Instruction {
    register: string;
    operation: string;
    offset: number;
    reference: string;
    condition: string;
    conditionValue: number;
}

const Conditions = {
    '==': (value: number, condition: number):boolean => value === condition,  
    '!=': (value: number, condition: number):boolean => value !== condition,
    '>': (value: number, condition: number):boolean => value > condition,
    '<': (value: number, condition: number):boolean => value < condition,
    '<=': (value: number, condition: number):boolean => value <= condition,
    '>=': (value: number, condition: number):boolean => value >= condition,
}

const Operations = {
    'inc': (value: number, offset: number): number => value + offset,
    'dec': (value: number, offset: number): number => value - offset,
}

class CPU extends FileReader {

    private instructions: Array<Instruction> = [];

    private registers: Map<string, number> = new Map();
    
    private max: number = 0;

    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            this.parse(fdata);   
            this.process();
            console.log('final', this.getMax(), this.max);
        })
        .catch(e => console.log('error: ', e));
    }

    getMax = (): number => {
        return Math.max(...Array.from(this.registers.values()))
    }

    handleMax = () => {
        const currentMax: number = this.getMax();
        if (currentMax > this.max) {
            this.max = currentMax;
        }
    }

    parse = (fdata: string) => {
        this.instructions = fdata.split('\n').map(line => {     
            const regex: RegExp = /(\w+)\s(inc|dec)\s(-?\d+)\sif\s(\w+)\s((=|<|>|!)+)\s(-?\d+)/;;
            const match: RegExpExecArray = regex.exec(line);
            if (match != null) {
                const reg: string = match[1];
                const op: string = match[2];
                const offset: number = +match[3];
                const ref: string = match[4];
                const cond: string = match[5];
                const condValue: number = +match[7];                
                const instruction: Instruction = {register: reg, operation: op, offset: offset, reference: ref, condition: cond, conditionValue: condValue};
                return instruction;
            }    
        });
    }

    process = () => {
        this.instructions.forEach(i => {
            let value: number = this.registers.get(i.register);
            if (!value) {
                value = 0;                
            }
            let referenceValue: number = this.registers.get(i.reference);
            if (!referenceValue) {
                referenceValue = 0;
            }
            if (this.checkCondition(referenceValue, i.condition, i.conditionValue)) {
                value = Operations[i.operation](value, i.offset);
            }
            this.registers.set(i.register, value);
            this.handleMax();
        })
    }

    checkCondition = (value: number, operation: string, condition: number): boolean => {
        return Conditions[operation](value, condition);
    }
}
new CPU();