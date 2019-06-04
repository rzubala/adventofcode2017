import { FileReader } from '../common'

class CPU extends FileReader {

    constructor() {
        super();
        this.readData('test.data')
        .then(fdata => {
            console.log(fdata)
        })
        .catch(e => console.log('error: ', e));
    }
}