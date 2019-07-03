import { FileReader } from '../common'

class Solve extends FileReader {

    private tape: Map<number, boolean> = new Map();

    private step: number = 0;

    private limit: number = 6;

    private states = {
        'A': (cursor: number) => { this.stateA(cursor) },
        'B': (cursor: number) => { this.stateB(cursor) }
    }

    public start = () => {
        this.nextState('A', 0);
    }

    private stateA = (cursor: number) => {
        const value: boolean = this.get(cursor);
        console.log('A:', value, cursor)
        if (!value) {
            this.tape.set(cursor, true);
            this.nextState('B', cursor + 1);
        } else {
            this.tape.set(cursor, false);
            this.nextState('B', cursor - 1);
        }
    }

    private stateB = (cursor: number) => {
        const value: boolean = this.get(cursor);
        console.log('B:', value, cursor)
        if (!value) {
            this.tape.set(cursor, true);
            this.nextState('A', cursor - 1);
        } else {
            this.tape.set(cursor, true);
            this.nextState('A', cursor + 1);
        }
    }

    private nextState = (state: string, cursor: number) => {
        if (this.step++ === this.limit) {
            console.log('END');
            return;
        }
        console.log('next:', state, cursor);
        this.states[state](cursor);
    }

    private get = (cursor: number): boolean => {
        const value: boolean = this.tape.get(cursor);
        if (value === undefined) {
            return false;
        }
        return value;
    }

    public sum = () => {
        let result:number = 0;
        this.tape.forEach((value: boolean, key: number) => {
            console.log(key, value);
            if (value) {
                result++;
            }
        });
        console.log('sum: ', result)
    }
}
const solve: Solve = new Solve();
solve.start();
solve.sum();
