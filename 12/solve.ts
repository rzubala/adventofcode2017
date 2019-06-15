import { FileReader } from '../common'

interface Program {
    id: number;
    children: number[];
}

class FindProgram extends FileReader {
    private programs: Program[];

    constructor() {
        super();
        this.readData('test.data')
        .then(fdata => {
            this.parse(fdata);
            this.log();
        })
        .catch(e => console.log('error: ', e));
    }

    parse = (fdata: string) => {
        this.programs = fdata.split('\n').map(line => {
            const ins: string[] = line.split(' <-> ');            
            return {id: +ins[0], children: ins[1].split(', ').map(e => +e)};
        });
    }

    log = () => {
        this.programs.forEach(e => console.log(e.id + ' <-> ' + e.children.join(', ')));
    }
}
new FindProgram();