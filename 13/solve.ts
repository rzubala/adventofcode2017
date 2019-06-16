import { FileReader } from '../common'

class Layer {
    size: number;
    layer: number;
    position: number = 0;
    private down: boolean = true;
    
    constructor(layer: number, size: number) {
        this.size = size;
        this.layer = layer;
    }

    next = () => {
        if (this.down) {
            this.position += 1;
            if (this.position === this.size) {
                this.position -=2;
                this.down = false;
            }
        } else {
            this.position -= 1;
            if (this.position === -1) {
                this.position = 1;
                this.down = true;
            }
        }
    }
}

class Solve extends FileReader {

    private layers: Layer[] = [];
    private size: number = 0;
    private severity: number = 0;

    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            this.parse(fdata);

            let time: number = 0;
            do {
                this.check(time);
                this.layers.forEach(l => l.next());
                time++;
            } while (time < this.size + 1);
            console.log('severity:',this.severity);
        })
        .catch(e => console.log('error: ', e));
    }

    check = (time: number) => {
        for (let layer of this.layers) {
            if (layer.layer === time && layer.position === 0) {
                this.severity += layer.layer * layer.size;
                break;
            }
        }
    }

    parse = (fdata: string) => {
        fdata.split('\n').forEach(line => {
            const data: number[] = line.split(': ').map(e => +e);
            this.layers.push(new Layer(data[0], data[1]));
            if (data[0] > this.size) {
                this.size = data[0];
            }
        });
    }

    log = () => {
        this.layers.forEach(l => {
            console.log(l.layer + ': ' + l.size + ' [' + l.position + ']')
        })
    }
}
new Solve();
