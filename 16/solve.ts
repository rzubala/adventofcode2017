import { FileReader } from '../common'

interface Operation {
    op: string;
    data1?: string;
    data2?: string;
}

class Solve extends FileReader {

    private operations: Operation[];

    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            console.log(fdata);
            this.operations = fdata.split(',').map(e => {
                const tmp: string[] = e.split('');
                if (tmp[0] === 's') {
                    return {op: tmp[0], data1: tmp.slice(1)};
                } else  {
                    const data: string[] = e.substring(1).split('/');
                    return {op: tmp[0], data1: data[0], data2: data[1]};
                }
            });
            this.operations.forEach(o => console.log(o));
        })
        .catch(e => console.log('error: ', e));
    }
}
new Solve();
