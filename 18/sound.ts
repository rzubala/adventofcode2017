import { Interpreter } from './interpreter';

export class Sound extends Interpreter {
    private recovered: boolean = false;

    private lastPlayed: number = 0;

    public isEnd = () => {
        return this.recovered;
    }

    public play = (register: string) => {
        const value: number = this.get(register);
        this.lastPlayed = value;
        console.log('play', this.lastPlayed);
    }

    public recover = (register: string) => {
        if (this.lastPlayed > 0) {
            console.log('recover', this.lastPlayed);
            this.recovered = true;
        }
    }
}