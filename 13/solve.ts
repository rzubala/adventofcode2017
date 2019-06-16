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

    set = (layer: Layer) => {
        this.position = layer.position;
        this.down = layer.down;
    }

    reset = () => {
        this.position = 0;
        this.down = true;
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
    private stored: Layer[] = [];
    private size: number = 0;
    private severity: number = 0;

    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            this.parse(fdata);

            //part 1
            let time: number = 0;
            do {
                this.check(time);
                this.layers.forEach(l => l.next());
                time++;
            } while (time < this.size + 1);
            console.log('severity:',this.severity);

            //part 2
            for (let it=199999;it<20000000;it++) {
                console.log('Delay:', it);
                if (this.findDelay(it)) {                    
                    break;
                }
            }
        })
        .catch(e => console.log('error: ', e));
    }

    store = () => {
        this.stored = this.layers.map(l => {
            const layer: Layer = new Layer(l.layer, l.size);
            layer.set(l);
            return layer;
        });
    }

    findDelay = (delay: number) => {
        let it: number = 0;
        let time: number = 0;
        this.severity = 0;
        this.reset();
        if (this.stored.length !== 0) {
            this.layers = [...this.stored];
            time = delay - 1;
        }
        do {
            if (time >= delay) {
                if (time === delay) {
                    this.store();
                } 
                if (this.check(it)) {
                    return false;
                }
                it++;
            }
            this.layers.forEach(l => l.next());
            time++;
        } while (it < this.size + 1);
        return true;
    }

    reset = () => {
        this.layers.forEach(l => l.reset());
    }

    check = (time: number): boolean => {
        for (let layer of this.layers) {
            if (layer.layer === time && layer.position === 0) {
                this.severity += layer.layer * layer.size;
                return true;
            }
        }
        return false;
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
