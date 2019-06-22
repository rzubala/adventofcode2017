import { FileReader } from '../common'

export interface Command {
    cmd: string;
    data1: string;
    data2?: string;
}

export class Interpreter extends FileReader {
    commands: Command[];
    private registers: Map<string, number> = new Map();
    private pos: number = 0;
    waiting: boolean = false;    
    public static INTERVAL: number = 1;

    private operations = {
        'snd': (c: Command) => {this.play(c.data1)},
        'set': (c: Command) => {this.set(c.data1, c.data2)},
        'add': (c: Command) => {this.add(c.data1, c.data2)},
        'mul': (c: Command) => {this.multiply(c.data1, c.data2)},
        'mod': (c: Command) => {this.modulo(c.data1, c.data2)},
        'rcv': (c: Command) => {this.recover(c.data1)},
        'jgz': (c: Command) => {this.jump(c.data1, c.data2)}
    }

    public start = () => {
        this.readData('input.data')
        .then(fdata => {
            this.parse(fdata);
            this.process();
        })
        .catch(e => console.log('error: ', e));
    }

    private process = () => {
        const processInterval = setInterval(() => {
            if (this.isEnd()) {
                clearInterval(processInterval);
                console.log('***END***');
                this.getResult();
                return;
            }
            if (!this.waiting) {
                const c: Command = this.commands[this.pos];
                this.processCommand(c);
                this.pos++;    
                if ((this.pos === this.commands.length)) {
                    clearInterval(processInterval);
                    console.log('***FINISH***');
                    this.getResult();
                    return;
                }
            }
        }, Interpreter.INTERVAL);
    }

    getResult = () => {        
    }

    isEnd = ():boolean => {
        return true;
    }

    play = (register: string) => {
    }

    recover = (register: string) => {
    }

    private jump = (register: string, value: string) => {
        const valX: number = this.get(register);
        if (valX > 0) {
            let valY: number = +value;
            if (isNaN(valY)) {
                valY = this.get(value);
            }
            this.pos += valY - 1;
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

    set = (register: string, value: any) => {
        if (isNaN(+value)) {
            this.registers[register] = this.get(value);
        } else {
            this.registers[register] = value;
        }
    }

    private add = (register: string, value: string) => {
        const val: number = this.get(register);
        let tmp: number = +value;
        if (isNaN(tmp)) {
            tmp = this.get(value);
        }
        this.set(register, val + tmp);
    }

    private multiply = (register: string, value: string) => {
        const val: number = this.get(register);
        let tmp: number = +value;
        if (isNaN(tmp)) {
            tmp = this.get(value);
        }
        this.set(register, val * tmp);
    }

    private modulo = (register: string, value: string) => {
        const val: number = this.get(register);
        let tmp: number = +value;
        if (isNaN(tmp)) {
            tmp = this.get(value);
        }
        this.set(register, val % tmp);
    }

    private processCommand = (c: Command) => {
        this.operations[c.cmd](c);
    }

    private parse = (fdata) => {
        this.commands = fdata.split('\n').map(l => {
            const data: string[] = l.split(' ');
            if (data.length === 3) {
                return {cmd: data[0], data1: data[1], data2: data[2]};
            } else {
                return {cmd: data[0], data1: data[1]};
            }
        });
    }
}
