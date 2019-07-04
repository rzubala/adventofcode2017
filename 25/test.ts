import { FileReader } from '../common'

class Solve extends FileReader {

    private tape: Map<number, boolean> = new Map();
    private step: number = 0;
    private limit: number = 6;
    private state:string = '';
    private cursor: number = 0;

    private states = {
        'A': (cursor: number) => { this.stateA(cursor) },
        'B': (cursor: number) => { this.stateB(cursor) }
    }

    public start = () => {
        this.nextState('A', 0);            
        while (true) {
            if (this.step++ === this.limit) {
                console.log('END');
                return;
            }
            this.states[this.state](this.cursor);                
        }        
    }

    private stateA = (cursor: number) => {
        if (!this.get(cursor)) {
            this.set(cursor, true);
            this.nextState('B', cursor + 1);
        } else {
            this.set(cursor, false);
            this.nextState('B', cursor - 1);
        }
    }

    private stateB = (cursor: number) => {
        if (!this.get(cursor)) {
            this.set(cursor, true);
            this.nextState('A', cursor - 1);
        } else {
            this.set(cursor, true);
            this.nextState('A', cursor + 1);
        }
    }

    private nextState = (state: string, cursor: number) => {
        this.state = state;
        this.cursor = cursor;
        console.log(this.state, this.cursor, state, cursor);
    }

    private get = (cursor: number): boolean => {
        const value: boolean = this.tape.get(cursor);
        if (value === undefined) {
            return false;
        }
        return value;
    }

    private set = (cursor: number, value: boolean) => {
        if (value) {
            this.tape.set(cursor, true);
        } else {
            this.tape.delete(cursor);
        }
    }

    public sum = () => {
        console.log('sum: ', this.tape.size);
    }
}
const solve: Solve = new Solve();
solve.start();
solve.sum();
