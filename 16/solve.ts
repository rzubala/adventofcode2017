import { FileReader } from '../common'

interface Operation {
    op: string;
    data1?: string;
    data2?: string;
}


class Solve extends FileReader {

    private operations: Operation[];

    private programs: string[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p'];

    private functions = {
        's': (p: Operation) => {this.spin(p)},
        'x': (p: Operation) => {this.exchange(p)},
        'p': (p: Operation) => {this.partner(p)},
    }
    
    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            this.parse(fdata);
            //this.operations.forEach(p => this.functions[p.op](p));
            this.spin({op: 's', data1: '18'});
            console.log(this.programs);
        })
        .catch(e => console.log('error: ', e));
    }

    private parse = (fdata: any) => {
        this.operations = fdata.split(',').map(e => {
            const tmp: string[] = e.split('');
            if (tmp[0] === 's') {
                return {op: tmp[0], data1: tmp.slice(1)};
            } else  {
                const data: string[] = e.substring(1).split('/');
                return {op: tmp[0], data1: data[0], data2: data[1]};
            }
        });
    }

    private spin = (o: Operation) => {
        const shift: number = +o.data1;
        const size: number = this.programs.length;
        const result: string[] = new Array(size);
        let i: number = 0;
        this.programs.forEach(p => {
            result[(i + shift) % size] = p;
            i++;
        });
        this.programs = result;
    }

    private exchange = (o: Operation) => {

    }

    private partner = (o: Operation) => {

    }
}
new Solve();
