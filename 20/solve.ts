import { FileReader } from '../common'

interface Data {
    x: number;
    y: number;
    z: number;
    active?:boolean;
}

class Solve extends FileReader {

    private p: Data[] = [];
    private v: Data[] = [];
    private a: Data[] = [];

    private static LIMIT: number = 1000;

    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            this.parse(fdata);
            this.process();
        })
        .catch(e => console.log('error: ', e));
    }

    private process = () => {
        let iter: number = 0;
        const dist:number[] = new Array(this.p.length);        
        while (true) {
            this.p.forEach((d, index) => {
                if (d.active) {
                    dist[index] = this.processData(index);
                }           
            })
            
            //part 2
            this.handleCollisions();

            if (iter++ > Solve.LIMIT) {
                break;
            }
        }
        //part 1
        const min: number = Math.min(...dist);
        console.log('min for ', min, dist.indexOf(min));

        //part 2
        const actives:number = this.p.filter(p => p.active).length;
        console.log('size ', actives);
    }

    private handleCollisions = () => {
        for (let i=0;i<this.p.length-1;i++) {
            const pi: Data = this.p[i];
            if (!pi.active) {
                continue;
            }
            for (let j=i+1;j<this.p.length;j++) {
                const pj: Data = this.p[j];
                if (!pj.active) {
                    continue;
                }
                if (pi.x === pj.x && pi.y === pj.y && pi.z === pj.z) {
                    pi.active = false;
                    pj.active = false;
                }
            }
        }
    }

    private processData = (cnt: number): number => {
        let min: number = Number.MAX_VALUE;
        const p:Data = this.p[cnt];
        const a:Data = this.a[cnt];
        const v:Data = this.v[cnt];
        this.add(v, a);
        this.add(p, v);
        this.p[cnt] = p;
        this.v[cnt] = v;
        return this.dist(p);
    }

    private dist = (d:Data): number => {
        return Math.abs(d.x) + Math.abs(d.y) + Math.abs(d.z);
    }


    private add = (x: Data, y: Data) => {
        x.x = x.x + y.x;
        x.y = x.y + y.y;
        x.z = x.z + y.z;
    }

    private parse = (fdata) => {
        fdata.split('\n').forEach(line => {
            const tmp: string[] = line.split(', ');
            this.p.push(this.parseData(tmp[0]));
            this.v.push(this.parseData(tmp[1]));
            this.a.push(this.parseData(tmp[2]));
        });
    }

    private parseData = (data: string): Data => {
        data = data.replace('p=<', '');
        data = data.replace('v=<', '');
        data = data.replace('a=<', '');
        data = data.replace('>', '');
        const tmp: string[] = data.split(',');
        return {x: +tmp[0],y: +tmp[1], z: +tmp[2], active: true};
    }
}
new Solve();