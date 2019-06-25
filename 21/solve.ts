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

    private flip = (matrix: string[][], horizontal: boolean): string[][] => {
        const result: string[][] = [];
        matrix.forEach(r => {
            result.push([]);
        });
        const size: number = matrix.length;
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

    private rotate = (matrix: string[][]): string[][] => {
        const result: string[][] = [];
        matrix.forEach(r => {
            result.push([]);
        });
        const size: number = matrix.length;
        for (let i=0;i<size;i++) {
            for (let j=0;j<size;j++) {
                result[size-1-i][j] = matrix[j][i];
            }
        }
        return result;
    }

    private compare = (matrix1: string[][], matrix2: string[][]):boolean => {
        const size1:number = matrix1.length;
        const size2:number = matrix2.length;
        if (size1 !== size2) {
            return false;
        }
        for (let i=0;i<size1;i++) {
            for (let j=0;j<size1;j++) {
                if (matrix1[i][j] !== matrix2[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    private parse = (input:string): string[][] => {
        const matrix: string[][] = []
        input.split('/').forEach(row => {
            matrix.push(row.split(''))
        });
        return matrix;
    }

    private test = () => {
        const matrix: string[][] = [];
        const size: number = 3;
        let iter: number = 0;
        for (let i=0;i<size;i++) {
            matrix.push([]);
            for (let j=0;j<size;j++) {
                matrix[i][j] = "" + iter++;
            }
        }
        this.log(matrix);
        
        const flipH: string[][] = this.flip(matrix, true);
        console.log('flip H')
        this.log(flipH);

        const flipV: string[][] = this.flip(matrix, false);
        console.log('flip V')
        this.log(flipV);

        const rotate: string[][] = this.rotate(matrix);
        console.log('rotate')
        this.log(rotate);        

        console.log('compare true ->', this.compare(matrix, matrix));
        console.log('compare false ->', this.compare(matrix, rotate));

        console.log('test parse');
        const m: string[][] = this.parse('123/456/789');
        this.log(m);
    }

    private log = (matrix: string[][]) => {
        matrix.forEach(r => {
            console.log(r.join(''));
        })
    }
}
new Solve();
