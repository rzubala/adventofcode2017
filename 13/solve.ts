import { FileReader } from '../common'

class Solve extends FileReader {
    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            console.log(fdata);
        })
        .catch(e => console.log('error: ', e));
    }
}
new Solve();
