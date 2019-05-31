import { FileReader } from '../common';

class CPUJumps extends FileReader {
    private data: Array<number>;

    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            this.data = fdata.split('\n').map(e => +e);
            this.log();
            this.calc();
        });
    }

    log = () => {
        console.log(this.data.join(','));
    }

    calc = () => {
        const len = this.data.length;
        let p: number = 0;
        let cnt: number = 0;
        while(p>=0 && p<len) {
            const cur:number = this.data[p];
            this.data[p] = cur + 1;
            p = p + cur; 
            //console.log(cnt, p)           
            cnt += 1;
        }
        console.log(cnt);    
    }
}
new CPUJumps();