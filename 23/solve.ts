import { FileReader } from '../common'
import { Command } from '../18/interpreter';

class Solve extends FileReader {
    commands: Command[];
    private registers: Map<string, number> = new Map();
    private pos: number = 0;
    private mulCnt: number = 0;

    private operations = {
        'set': (c: Command) => { this.set(c.data1, c.data2) },
        'sub': (c: Command) => { this.sub(c.data1, c.data2) },
        'mul': (c: Command) => { this.mul(c.data1, c.data2) },
        'jnz': (c: Command) => { this.jnz(c.data1, c.data2) },
    }

    public start = () => {
        this.readData('input.data')
            .then(fdata => {
                console.log(fdata);
                this.parse(fdata);
                this.process();

                //part2
                this.part2();                
            })
            .catch(e => console.log('error: ', e));
    }

    private process = () => {
        while (true) {
            const c: Command = this.commands[this.pos];
            this.processCommand(c);
            this.pos++;
            if ((this.pos === this.commands.length)) {
                break;
            }
        }
        //part1
        console.log('muls:', this.mulCnt);
    }

    private part2 = () => {
        const input:number = 65 * 100 + 100000;
        let noPrimes:number = 0;
        for (let i = input; i <= input + 17000; i += 17) {
            let tmp:number = 2;
            while (i % tmp !== 0) {
                tmp++;
            }
            if (i !== tmp) {
                noPrimes++;
            } 
        }        
        console.log('part2', noPrimes);
    }

    private processCommand = (c: Command) => {
        this.operations[c.cmd](c);
    }

    set = (register: string, value: any) => {
        if (isNaN(+value)) {
            this.registers[register] = this.get(value);
        } else {
            this.registers[register] = value;
        }
    }

    get = (register: string): number => {
        const val: number = this.registers[register]
        if (val !== undefined) {
            return +val;
        }
        this.registers[register] = 0;
        return 0;
    }

    sub = (register: string, value: string) => {
        const val: number = this.get(register);
        let tmp: number = +value;
        if (isNaN(tmp)) {
            tmp = this.get(value);
        }
        this.set(register, val - tmp);
    }

    mul = (register: string, value: string) => {
        const val: number = this.get(register);
        let tmp: number = +value;
        if (isNaN(tmp)) {
            tmp = this.get(value);
        }
        this.mulCnt++;
        this.set(register, val * tmp);
    }

    jnz = (testValue: any, value: string) => {
        let valX: number = +testValue;
        if (isNaN(valX)) {
            valX = this.get(testValue);
        }
        if (valX !== 0) {
            let valY: number = +value;
            if (isNaN(valY)) {
                valY = this.get(value);
            }
            this.pos += valY - 1;
        }
    }

    private parse = (fdata) => {
        this.registers.clear();
        this.pos = 0;
        this.commands = fdata.split('\n').map(l => {
            const data: string[] = l.split(' ');
            return {cmd: data[0], data1: data[1], data2: data[2]};
        });
    }
}
const solve:Solve = new Solve();
solve.start();
