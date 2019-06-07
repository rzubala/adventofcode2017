import { FileReader } from '../common';

class HashCalc extends FileReader {
    private lengths: Array<number>;

    constructor() {
        super();
        this.readData('test.data')
        .then(fdata => {
            this.lengths = fdata.split(',').map(e => +e);
            console.log(this.lengths);
        })
        .catch(e => console.log('error: ', e));
    }
}
new HashCalc();