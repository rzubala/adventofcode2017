import { Interpreter } from './interpreter';

export class Sync extends Interpreter {

    private static TIMEOUT: number = 2 * 1000 / Interpreter.INTERVAL;

    private sync: Sync;

    private end: boolean = false;

    private queue: Array<number> = new Array();

    private second: boolean = false;

    private sendCnt: number = 0;

    constructor(p: number) {
        super();
        this.set('p', p);
        if (p === 1) {
            this.second = true;
        }
    }

    public setSync = (sync: Sync) => {
        this.sync = sync;
    }

    public getFromSync = (sync: Sync): number => {
        return sync.getFromQueue();
    }

    getResult = () => {        
        console.log('Result', this.second, this.sendCnt);
    }

    isEnd = (): boolean => {
        return this.end;
    }

    play = (value: any) => {
        if (isNaN(+value)) {        
            value = this.get(value);
        }
        this.queue.push(+value);
        this.sendCnt++;
    }

    public getFromQueue = (): number => {
        if (this.queue.length === 0) {
            return undefined;
        }
        return +this.queue.shift();
    }

    recover = (register: string) => {
        let intervals: number = 0;
        this.waiting = true;
        const intervalHandler = setInterval(() => {
            const value: number = this.getFromSync(this.sync);
            if (value !== undefined) {
                this.set(register, +value);
                this.waiting = false;
                clearInterval(intervalHandler);
                return;
            }
            intervals++;
            if (intervals > Sync.TIMEOUT) {
                console.log('rcv', this.second, 'timeout');
                this.waiting = false;
                this.end = true;
                clearInterval(intervalHandler);
                return;
            }
        }, Interpreter.INTERVAL);
    }
}