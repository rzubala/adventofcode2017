import { FileReader } from '../common'

class Solve extends FileReader {
    constructor() {
        super();
        this.readData('test.data')
        .then(fdata => {
            //console.log(fdata);

            this.test();
        })
        .catch(e => console.log('error: ', e));
    }

    private flip = (matrix: number[][], horizontal: boolean): number[][] => {
        const result: number[][] = [];
        const size: number = matrix.length;
        for (let i=0;i<size;i++) {
            result.push([]);
        }
        for (let i=0;i<size;i++) {
            for (let j=0;j<size;j++) {
                if (horizontal) {
                    result[i][j] = matrix[i][size-1-j];
                } else {
                    result[size-1-i][j] = matrix[i][j];
                }
            }
        }
        return result;
    }

    private test = () => {
        const matrix: number [][] = [];
        const size: number = 3;
        let iter: number = 0;
        for (let i=0;i<size;i++) {
            matrix.push([]);
            for (let j=0;j<size;j++) {
                matrix[i][j] = iter++;
            }
        }
        this.log(matrix);
        
        const flipH: number[][] = this.flip(matrix, true);
        console.log('flip H')
        this.log(flipH);

        const flipV: number[][] = this.flip(matrix, false);
        console.log('flip V')
        this.log(flipV);
    }

    private log = (matrix: number[][]) => {
        const size: number = matrix.length;
        matrix.forEach(r => {
            console.log(r.join(''));
        })
    }
}
new Solve();
