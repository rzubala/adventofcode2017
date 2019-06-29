import { FileReader } from '../common'

interface Point {
    x: number;
    y: number;
}

class Solve extends FileReader {

    private map: Map<string, string> = new Map<string, string>();
    private size: number = 0;
    private steps: number = 10000;

    private directions: string[] = ['up', 'right', 'down', 'left'];
    private moves = {
        'up': (point:Point):Point => {return {x:point.x,y:point.y-1}},
        'down': (point:Point):Point => {return {x:point.x,y:point.y+1}},
        'left': (point:Point):Point => {return {x:point.x-1,y:point.y}},
        'right': (point:Point):Point => {return {x:point.x+1,y:point.y}},
    }

    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            this.parse(fdata);
            this.process();
        })
        .catch(e => console.log('error', e))
        ;
    }

    private process = () => {
        const start:number = Math.floor(this.size/2);
        let point:Point = {x:start,y:start};
        let direction:number = 0;   //up
        let infections: number = 0;
        for (let i=0;i<this.steps;i++) {
            let cell:string = this.map.get(this.toStr(point));
            if (cell === '#') {
                direction = this.turnRight(direction);
                this.map.set(this.toStr(point), '.')
            } else {
                direction = this.turnLeft(direction);
                this.map.set(this.toStr(point), '#')
                infections++;
            }
            point = this.move(point, direction);
        }
        console.log('infections:', infections)
    }

    private turnLeft = (direction: number) => {
        return (direction + 3) % 4;
    }

    private turnRight = (direction: number) => {
        return (direction + 1) % 4;
    }

    private move = (point: Point, direction: number): Point => {
        const dir:string = this.directions[direction];
        return this.moves[dir](point);
    }

    private parse = (fdata) => {
        this.size = 0;
        fdata.split('\n').forEach((line,y) => {
            this.size++;
            line.split('').forEach((col, x) => {
                const point: Point = {x:x,y:y};
                this.map.set(this.toStr(point), col);
            })
        });
    }

    private toStr = (point: Point) => {
        return point.x+'.'+point.y;
    }

    private log = () => {
        this.map.forEach((item, i) => console.log('log', i, item));
    }
}
new Solve();