class Solve {

    private steps: number = 371;

    private stop: number = 2017;

    private buffer: Array<number> = new Array();

    calculate = () => {
        let pos: number = 0;
        for (let i:number = 0;i<this.stop + 1;i++) {
            const len: number = this.buffer.length;
            if (len !== 0) {
                pos = ((pos + this.steps) % len) + 1;
            } else {
                pos++;
            }
            this.buffer.splice(pos, 0, i);
        }
        console.log(this.buffer[pos+1]);
    }
}
new Solve().calculate();
