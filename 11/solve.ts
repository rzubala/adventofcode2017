import { FileReader } from '../common'

class HexGrid extends FileReader {
    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            console.log(fdata.split(','));
        })
        .catch(e => console.log('error: ' + e))
        ;
    }
}
new HexGrid();