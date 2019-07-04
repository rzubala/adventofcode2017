import { FileReader } from '../common'

class Solve extends FileReader {

    private tape: Map<number, boolean> = new Map();
    private step: number = 0;
    private limit: number = 12919244;
    private state:string = '';
    private cursor: number = 0;

    private states = {
        'A': (cursor: number) => { this.stateA(cursor) },
        'B': (cursor: number) => { this.stateB(cursor) },
        'C': (cursor: number) => { this.stateC(cursor) },
        'D': (cursor: number) => { this.stateD(cursor) },
        'E': (cursor: number) => { this.stateE(cursor) },
        'F': (cursor: number) => { this.stateF(cursor) },
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
            this.nextState('C', cursor - 1);
        }
    }

    private stateB = (cursor: number) => {
        if (!this.get(cursor)) {
            this.set(cursor, true);
            this.nextState('A', cursor - 1);
        } else {
            this.set(cursor, true);
            this.nextState('D', cursor + 1);
        }
    }

    private stateC = (cursor: number) => {
        if (!this.get(cursor)) {
            this.set(cursor, true);
            this.nextState('A', cursor + 1);
        } else {
            this.set(cursor, false);
            this.nextState('E', cursor - 1);
        }
    }    

    private stateD = (cursor: number) => {
        if (!this.get(cursor)) {
            this.set(cursor, true);
            this.nextState('A', cursor + 1);
        } else {
            this.set(cursor, false);
            this.nextState('B', cursor + 1);
        }
    }    

    private stateE = (cursor: number) => {
        if (!this.get(cursor)) {
            this.set(cursor, true);
            this.nextState('F', cursor - 1);
        } else {
            this.set(cursor, true);
            this.nextState('C', cursor - 1);
        }
    } 
    
    private stateF = (cursor: number) => {
        if (!this.get(cursor)) {
            this.set(cursor, true);
            this.nextState('D', cursor + 1);
        } else {
            this.set(cursor, true);
            this.nextState('A', cursor + 1);
        }
    } 

    private nextState = (state: string, cursor: number) => {
        this.state = state;
        this.cursor = cursor;
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
