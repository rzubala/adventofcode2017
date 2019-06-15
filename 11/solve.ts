import { FileReader } from '../common'

interface Cube {
    x: number;
    y: number;
    z: number;
    incX(up: boolean);
    incY(up: boolean);
    incZ(up: boolean);
    log();
}

class CubeImpl implements Cube {
    x: number = 0;
    y: number = 0;
    z: number = 0;
    incX = (up: boolean) => {
        if (up) {
            this.x = this.x + 1;        
        } else {
            this.x = this.x - 1;        
        }
    }
    incY = (up: boolean) => {
        if (up) {
            this.y = this.y + 1;        
        } else {
            this.y = this.y - 1;        
        }
    }
    incZ = (up: boolean) => {
        if (up) {
            this.z = this.z + 1;        
        } else {
            this.z = this.z - 1;        
        }
    }
    log = () => {
        console.log(this.x, this.y, this.z);
    }
}

const directions = {
    'n': (cube: Cube) => {cube.incY(true);cube.incZ(false)},
    'nw': (cube: Cube) => {cube.incY(true);cube.incX(false)},
    'ne': (cube: Cube) => {cube.incX(true);cube.incZ(false)},
    'sw': (cube: Cube) => {cube.incZ(true);cube.incX(false)},
    'se': (cube: Cube) => {cube.incX(true);cube.incY(false)},
    's': (cube: Cube) => {cube.incZ(true);cube.incY(false)},
}

class HexGrid extends FileReader {
    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            const cube: Cube = new CubeImpl();
            fdata.split(',').forEach(d => {
                directions[d](cube);
            });
            console.log('dist: ', this.dist(cube));
        })
        .catch(e => console.log('error: ' + e))
        ;
    }

    dist = (cube: Cube) => {
        return Math.max(Math.abs(cube.x), Math.abs(cube.y), Math.abs(cube.z));
    }
}
new HexGrid();