import { FileReader } from '../common'

interface Program {
    id: number;
    children: number[];
}

class FindProgram extends FileReader {
    private programs: Program[];
    private search: number = 0;
    private result: Set<number> = new Set();

    constructor() {
        super();
        this.readData('test.data')
        .then(fdata => {
            this.parse(fdata);
            this.programs.forEach(p => {
                const parents: number[] = [p.id];
                this.searchProgram(p, parents);
            });
            console.log(this.result);
        })
        .catch(e => console.log('error: ', e));
    }

    parse = (fdata: string) => {
        this.programs = fdata.split('\n').map(line => {
            const ins: string[] = line.split(' <-> ');            
            return {id: +ins[0], children: ins[1].split(', ').map(e => +e)};
        });
    }

    searchProgram = (program: Program, parents: number[]): boolean => {
        const ch: number[] = program.children;
        if (ch.includes(this.search)) {
            this.result.add(program.id);
            return;
        }
        for (const childId of ch) {
            if (parents.includes(childId)) {
                continue;
            }
            const childProgram: Program = this.getProgram(childId);
            if (childProgram) {
                const chparents: number[] = [...parents];
                chparents.push(childId);    
                this.searchProgram(childProgram, chparents);
            }
        }
    }

    getProgram = (id: number) => {
        for (const program of this.programs) {
            if (program.id === id) {
                return program;
            }
        }
        return undefined;
    }

    log = () => {
        this.programs.forEach(e => console.log(e.id + ' <-> ' + e.children.join(', ')));
    }
}
new FindProgram();