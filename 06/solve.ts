import { FileReader } from '../common'

class Debugger extends FileReader {

    constructor() {
        super();
        this.readData('test.data')
        .then(fdata => {
            console.log(fdata.split('\t'));
        })
        .catch(e => console.log('error: ', e));
    }
}
new Debugger();