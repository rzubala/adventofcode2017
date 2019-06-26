import { FileReader } from '../common'

class Solve extends FileReader {

    private patterns: Map<String, String> = new Map();

    constructor() {
        super();
        this.readData('test.data')
        .then(fdata => {
            this.parsePatterns(fdata);
            this.process();

            //this.test();
        })
        .catch(e => console.log('error: ', e));
    }

    private process = () => {
        const start: string = ".#./..#/###";
        let matrix: string[][] = this.parse(start);
        let size: number = matrix.length;
        
        if (size % 2 === 0) {
            matrix = this.handleSubMatrix(2, matrix, size);
        } else if (size % 3 === 0) {
            matrix = this.handleSubMatrix(3, matrix, size);
        }
    }

    private handleSubMatrix = (subSize: number, matrix: string[][], size: number): string[][] => {
        const result:string[][] = [];
        for (let i=0;i<size/subSize;i++) {
            for (let j=0;j<size/subSize;j++) {
                const subMatrix: string[][] = this.getSubMatrix(matrix, size, subSize, i, j);
                this.convert(result, subMatrix, subSize, i, j)
            }
        }
        return result;
    }

    private convert = (matrix: string[][], source: string[][], subSize: number, gi: number, gj: number) => {
        const converted: string = this.convertMatrix(source, subSize);
        if (converted === undefined) {
            console.log('ERROR')
            process.exit(-1);
        }
        const cMatrix = this.parse(converted);
        const newSize = cMatrix.length;
        //TODO
    
    }

    private convertMatrix = (matrix: string[][], subSize: number): string => {
        const size:number = matrix.length;

        console.log('source')
        this.log(matrix);

        for (let pattern in this.patterns) {
            const mPattern: string[][] = this.parse(pattern);

            console.log('pattern')
            this.log(mPattern);

            if (mPattern.length !== size) {
                continue;
            }

            if (this.compare(matrix, mPattern)) {
                return this.patterns[pattern];
            }
            if (this.compare(matrix, this.flip(mPattern, true))) {
                return this.patterns[pattern];
            }
            if (this.compare(matrix, this.flip(mPattern, false))) {
                return this.patterns[pattern];
            }         
            let rotated:string[][] = this.rotate(mPattern);
            if (this.compare(matrix, rotated)) {
                return this.patterns[pattern];
            }
            rotated = this.rotate(rotated);
            if (this.compare(matrix, rotated)) {
                return this.patterns[pattern];
            }                
            rotated = this.rotate(rotated);
            if (this.compare(matrix, rotated)) {
                return this.patterns[pattern];
            }
        }
        return undefined;
    }

    private getSubMatrix = (matrix:string[][], size: number, newSize: number, gi:number, gj: number):string[][] => {
        const result:string[][] = [];
        for (let i=0;i<newSize;i++) {
            result.push([])
            for (let j=0;j<newSize;j++) {
                result[i][j] = matrix[gi*newSize + i][gj*newSize + j];
            }
        }
        return result;
    }

    private parsePatterns = (fdata) => {
        fdata.split('\n').forEach(l => {
            const tmp: string[] = l.split(' => ');
            this.patterns[tmp[0]] = tmp[1];
        })
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

    private flat = (matrix: string[][]): string => {
        let result: string = "";
        matrix.forEach(r => {
            result += r.join('') + '/';            
        })
        return result.substring(0, result.length - 1);
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

        console.log('test flat');
        console.log(this.flat(m));

        console.log('test submatrix');
        const bigm: string[][] = this.parse('123abc/456def/789ghi/123jkl/456mno/789prq');
        this.log(bigm);

        console.log('sub', '0','0')
        this.log(this.getSubMatrix(bigm, 6, 3, 0, 0));

        console.log('sub', '0','1')
        this.log(this.getSubMatrix(bigm, 6, 3, 0, 1));

        console.log('sub', '1','0')
        this.log(this.getSubMatrix(bigm, 6, 3, 1, 0));

        console.log('sub', '1','1')
        this.log(this.getSubMatrix(bigm, 6, 3, 1, 1));
    }

    private log = (matrix: string[][]) => {
        matrix.forEach(r => {
            console.log(r.join(''));
        })
    }
}
new Solve();
