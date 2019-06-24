import { FileReader } from '../common'

interface Data {
    x: number;
    y: number;
    z: number;
}

class Solve extends FileReader {

    private p: Data[] = [];
    private v: Data[] = [];
    private a: Data[] = [];

    private static LIMIT: number = 10000000;

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
        let cnt: number = 0;
        let min: number = Number.MAX_VALUE;
        let index: number = 0;
        this.p.forEach(d => {
            const dist:number = this.processData(cnt);
            if (dist < min) {
                min = dist;
                index = cnt;
            }
            cnt++;
        })        
        console.log('min for ', index);
    }

    private processData = (cnt: number): number => {
        let min: number = Number.MAX_VALUE;
        const p:Data = this.p[cnt];
        const a:Data = this.a[cnt];
        const v:Data = this.v[cnt];

        let iter: number = 0;
        while (true) { 
            this.add(v, a);
            this.add(p, v);            
            const dist: number = this.dist(p);
            if (dist < min) {
                min = dist;
            }
            if (iter++ > Solve.LIMIT) {
                break;
            }
        }

        return min;
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
        return {x: +tmp[0],y: +tmp[1], z: +tmp[2]};
    }
}
new Solve();
