import { FileReader } from '../common'
import { HashCalc } from '../10/hash';

interface Point {
    r: number;        
    c: number;
}

const directions = {
    'u': (p: Point): Point => {return {r: p.r-1, c: p.c}},
    'd': (p: Point): Point => {return {r: p.r+1, c: p.c}},
    'l': (p: Point): Point => {return {r: p.r, c: p.c-1}},
    'r': (p: Point): Point => {return {r: p.r, c: p.c+1}},
}

class Solve extends FileReader {
    private calc: HashCalc = new HashCalc();
    private rows: number = 128;
    private grid: Array<Array<number>> = [];
    private mark: number = 1;
    
    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            console.log(fdata);
            let sum: number = 0;
            for (let r: number=0;r<this.rows;r++) {
                const input: string = fdata + '-' + r;
                const hash: string = this.calc.toKnotHash(input);
                const output: string = this.toBinaryStr(hash);
                sum += output.split('').filter(e => e === '1').length;                

                this.grid.push(output.split('').map(e => +e))
            }
            console.log('sum:', sum);

            this.markGroups();
        })
        .catch(e => console.log('error: ', e));
    }

    markGroups = () => {
        let group: number = 2;
        let r: number = 0;
        let c: number = 0;
        for (let row of this.grid) {
            c = 0;
            for (let col of row) {
                if (col === this.mark) {
                    this.grid[r][c] = group;
                    this.searchGroup(r, c, group);
                    group++;                    
                }
                c++;
            }
            r++;
        }
        console.log('groups: ', group - 2);
    }

    searchGroup = (row: number, col: number, group: number) => {
        const dirs: string[] = Object.keys(directions);
        const point: Point = {r: row, c: col};
        for (let dir of dirs) {
            const npoint: Point = directions[dir](point);
            if (npoint.c < 0 || npoint.c === this.rows || npoint.r < 0 || npoint.r === this.rows) {
                continue;
            }
            if (this.grid[npoint.r][npoint.c] === this.mark) {
                this.grid[npoint.r][npoint.c] = group;
                this.searchGroup(npoint.r, npoint.c, group);
            }
        }
    }

    toBinaryStr = (hash: string): string => {
        return hash.split('').map(e => parseInt(e, 16).toString(2).padStart(4, '0')).join('');
    }
}
new Solve();
