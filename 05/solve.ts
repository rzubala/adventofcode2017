import { FileReader } from '../common';

class CPUJumps extends FileReader {
    private data: Array<string>;

    constructor() {
        super();
        this.readData('test.data')
        .then(fdata => {
            this.data = fdata.split('\n');
            this.log();
        });
    }

    log = () => {
        console.log(this.data.join(','));
    }
}
new CPUJumps();