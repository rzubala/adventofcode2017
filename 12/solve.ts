import { FileReader } from '../common'

interface Program {
    id: number;
    children: number[];
}

class FindProgram extends FileReader {
    private programs: Program[];
    private result: Set<number> = new Set();

    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            this.parse(fdata);
            
            let search: number = 0;
            let it: number = 1;
            do {
                const group: number[] = Array.from(this.result.values());
                this.result = new Set();
                const toCheck: Program[] = this.programs
                    .map(p => p.id)
                    .filter(p => !group.includes(p))
                    .map(p => this.getProgram(p));
                if (toCheck.length === 0) {
                    break;
                }    
                if (it > 1) {
                    search = toCheck[0].id;
                }
                toCheck.forEach(p => {                
                        const parents: number[] = [p.id];
                        this.searchProgram(p, search, parents);
                });
                this.programs = [...toCheck];
                console.log('size for program', search, this.result.size, it++);
            } while (true);
        })
        .catch(e => console.log('error: ', e));
    }

    parse = (fdata: string) => {
        this.programs = fdata.split('\n').map(line => {
            const ins: string[] = line.split(' <-> ');            
            return {id: +ins[0], children: ins[1].split(', ').map(e => +e)};
        });
    }

    searchProgram = (program: Program, search: number, parents: number[]): boolean => {
        const ch: number[] = program.children;
        if (program.id === search || this.result.has(program.id) ||  ch.includes(search)) {
            parents.forEach(p => this.result.add(p));
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
                this.searchProgram(childProgram, search, chparents);
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