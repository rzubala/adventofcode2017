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

    constructor() {
        super();
        this.readData('test.data')
        .then(fdata => {
            this.parse(fdata);
            this.process();
        })
        .catch(e => console.log('error: ', e));
    }

    private process = () => {
        
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
