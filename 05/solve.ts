import { FileReader } from '../common';

class CPUJumps extends FileReader {
    private data: Array<number>;

    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            this.data = fdata.split('\n').map(e => +e);
            this.calc(false);
            this.data = fdata.split('\n').map(e => +e);
            this.calc(true);
        });
    }

    log = () => {
        console.log(this.data.join(','));
    }

    calc = (mode: boolean) => {
        const len = this.data.length;
        let p: number = 0;
        let cnt: number = 0;
        while(p>=0 && p<len) {
            const cur:number = this.data[p];
            let offset: number = 1;
            if (mode && cur >= 3) {
                offset = -1;
            }
            this.data[p] = cur + offset;
            p = p + cur; 
            cnt += 1;
        }
        console.log(cnt);    
    }
}
new CPUJumps();