import { FileReader } from '../common'

interface Operation {
    op: string;
    data1?: string;
    data2?: string;
}

class Solve extends FileReader {

    private operations: Operation[];

    private programs: string[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p'];

    private results: Array<string> = new Array();

    private part2: number = 1000000000;

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
            let i: number = 0;
            while(true) {
                this.operations.forEach(p => this.functions[p.op](p));
                const result: string = this.programs.join('');
                if (i === 0) {
                    console.log('part1: ', result);
                }
                if (this.results.includes(result)) {
                    break;
                }
                this.results.push(result);
                i++;
            }
            const position: number = this.part2 - Math.floor(this.part2 / i) * i;
            console.log('part2: ', this.results[position-1]);
        })
        .catch(e => console.log('error: ', e));
    }

    private parse = (fdata: any) => {
        this.operations = fdata.split(',').map(e => {
            const tmp: string[] = e.split('');
            if (tmp[0] === 's') {
                return {op: tmp[0], data1: tmp.slice(1).join('')};
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
        const tmp: string = this.programs[+o.data1];
        this.programs[+o.data1] = this.programs[+o.data2]; 
        this.programs[+o.data2] = tmp;
    }

    private partner = (o: Operation) => {
        this.exchange({op: 'p', data1: this.getIndex(o.data1), data2: this.getIndex(o.data2)});
    }

    private getIndex = (p: string): string => {
        const index: number = this.programs.indexOf(p);
        return this.programs.indexOf(p).toString();
    }
}
new Solve();
