import { FileReader } from '../common';

class Garbage extends FileReader {
    constructor() {
        super();
        this.readData('test.data')
        .then(fdata => {
            console.log(fdata);
        })
        .catch(e => console.log('error: ', e))
        ;
    }
}
new Garbage();