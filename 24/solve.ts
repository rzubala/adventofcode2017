import { FileReader } from '../common'

interface Port {
    id:number;
    port1:number;
    port2:number;
    sum:number;
}

class Solve extends FileReader {

    private max:number = 0;

    private longest:number = 0;

    private longestRes:number = 0;

    private ports: Array<Port> = new Array();

    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            this.parse(fdata);
            this.process();
        })
        .catch(e => console.log('error: ', e));
    }

    private process = () => {
        this.findPortsByValue(0).forEach(id => {
            const port: Port = this.getPort(id);
            const usedId:number[] = [];
            usedId.push(id);
            const nextPin:number = port.port1 === 0 ? port.port2 : port.port1;
            this.findBridge(usedId, nextPin, 0);
        });
        console.log('max', this.max, this.longest, this.longestRes);
    }

    private findBridge = (usedId: number[], nextPin: number, lvl: number) => {
        const matched:number[] = this.findPorts(nextPin).filter(id => {
            return !usedId.includes(id);
        })
        if (matched.length === 0) {
            this.calculate(usedId);
        }

        matched.forEach(id => {
            const localUsed: number[] = [...usedId];
            localUsed.push(id);
            const nextPort: Port = this.getPort(id); 
            const nextValue: number = (nextPort.port1 === nextPin ? nextPort.port2 : nextPort.port1);
            this.findBridge(localUsed, nextValue, lvl + 1);
        });
    }

    private calculate = (ports: number[]):number => {
        const result:number = ports.reduce((acc, id) => { return acc + this.getPort(id).sum}, 0);
        if (result > this.max) {
            this.max = result;
        }
        if (ports.length === this.longest) {
            if (result > this.longestRes) {
                this.longestRes = result;
            }
        }
        if (ports.length > this.longest) {
            this.longest = ports.length;
            this.longestRes = result;
        }
        return result;
    }

    private parse = (fdata) => {
        this.ports = fdata.split('\n').map((line, index) => {
            const data:string[] = line.split('/');
            return {id:index, port1:+data[0], port2:+data[1], sum: +data[0] + +data[1]};
        })
    }

    private findPorts = (nextPin:number):number[] => {
        return this.findPortsByValue(nextPin)
    }

    private findPortsByValue = (value: number):number[] => {
        const result:number[] = [];
        this.ports.forEach(p => {            
            if (p.port1 === value || p.port2 === value) {
                result.push(p.id);
            }
        })
        return result;
    }

    private getPort = (id: number): Port => {
        return this.ports[id];
    }
}
new Solve();
