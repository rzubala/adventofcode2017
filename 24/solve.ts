import { FileReader } from '../common'

interface Port {
    id:number;
    port1:number;
    port2:number;
}

class Solve extends FileReader {

    private ports: Array<Port> = new Array();

    constructor() {
        super();
        this.readData('test.data')
        .then(fdata => {
            console.log(fdata);
            this.parse(fdata);
            this.log();
        })
        .catch(e => console.log('error: ', e));
    }

    private parse = (fdata) => {
        this.ports = fdata.split('\n').map((line, index) => {
            const data:string[] = line.split('/');
            return {id:index, port1:+data[0], port2:+data[1]};
        })
    }

    private log = () => {
        this.ports.forEach(p => console.log(p.id, p.port1, p.port2));
    }
}
new Solve();
