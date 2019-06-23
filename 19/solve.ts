import { FileReader } from '../common'

interface Point {
    x: number;
    y: number;
}

enum MOVES {UP, DOWN, LEFT, RIGHT}

class Solve extends FileReader {
    private grid: Array<Array<string>> = new Array();
    private path: string[] = [];

    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            this.parse(fdata);
            const start: number = this.getStart();
            let point: Point = {x: start, y: 0};
            let move: MOVES = MOVES.DOWN;
            let count: number = 1;
            while (true) {
                const newPoint: Point = this.getNextMove(point, move);
                if (newPoint === undefined) {
                    break;
                }
                move = this.getMove(newPoint, point);
                point = newPoint;
                count++;
            }
            console.log('path', count, this.path.join(''));
        })
        .catch(e => console.log('error: ', e));
    }

    private getNextMove = (point: Point, move: MOVES): Point => {
        const symbol: string = this.getSymbol(point);
        let nextPoint: Point = undefined;
        let nextSymbol: string = undefined;
        if (symbol === '+') {
            nextPoint = this.findNextPoint(point, move);
        } else {
            nextPoint = this.getNextPoint(point, move);
        }
        if (nextPoint === undefined) {
            return undefined;
        }
        nextSymbol = this.getSymbol(nextPoint);
        if (nextSymbol === undefined) {
            return undefined;
        }    
        if (this.isLetter(nextSymbol)) {
            this.path.push(nextSymbol);
        }
        return nextPoint;
    }

    private getSymbol = (point: Point) => {
        if (point.y < 0 || point.y >= this.grid.length) {
            return undefined;
        }
        if (point.x < 0 || point.x >= this.grid[point.y].length) {
            return undefined;
        }
        const value: string = this.grid[point.y][point.x];
        if (value === ' ') {
            return undefined;
        }
        return value;
    }

    private findNextPoint = (point: Point, move: MOVES): Point => {
        if (move === MOVES.DOWN || move === MOVES.UP) {
            const left: Point = {x: point.x - 1, y: point.y};
            if (this.getSymbol(left) !== undefined) {
                return left;
            }
            const right: Point = {x: point.x + 1, y: point.y};
            if (this.getSymbol(right) !== undefined) {
                return right;
            }
        } else {
            const up: Point = {x: point.x, y: point.y - 1};
            if (this.getSymbol(up) !== undefined) {
                return up;
            }
            const down: Point = {x: point.x, y: point.y + 1};
            if (this.getSymbol(down) !== undefined) {
                return down;
            }
        }
    } 

    private getNextPoint = (point: Point, move: MOVES): Point => {
        if (move === MOVES.DOWN) {
            return {x: point.x, y: point.y + 1};
        } else if (move === MOVES.UP) {
            return {x: point.x, y: point.y - 1};
        } else if (move === MOVES.LEFT) {
            return {x: point.x - 1, y: point.y};
        } else if (move === MOVES.RIGHT) {
            return {x: point.x + 1, y: point.y};
        }
    }

    private getMove = (newPoint: Point, point: Point): MOVES => {
        if (newPoint.x === point.x) {
            if (newPoint.y > point.y) {
                return MOVES.DOWN;
            } else {
                return MOVES.UP;
            }
        } else {
            if (newPoint.x > point.x) {
                return MOVES.RIGHT;
            } else {
                return MOVES.LEFT;
            }
        }
    }
    
    private isLetter = (c: string) => {
        return c.toLowerCase() != c.toUpperCase();
    }

    private parse = (fdata) => {
        fdata.split('\n').forEach(line => {
            this.grid.push(line.split(''));
        });
    }

    private getStart = () => {
        return this.grid[0].indexOf('|');
    }
}
new Solve();
