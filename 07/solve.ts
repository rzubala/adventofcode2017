import { FileReader } from '../common'

interface NodeData {
    name: string;
    parent: string;
    size: number;
    children: string[];
}

interface Tower {
    name: string;
    weight: number;
    children: Array<Tower>;
    sum: number;
}

class TowerBuilder extends FileReader {

    private nodes: Array<NodeData> = [];

    private skip: boolean = false;

    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            this.parse(fdata);            
            const parentName: string = this.findBottom();
            console.log('parent: ', parentName);
            const tower: Tower = this.buildTower(parentName);
            this.printTower(tower, 0);
            this.getBalance(tower);
            
        })
        .catch(e => console.log('error: ', e));
    }

    parse = (fdata: any) => {
        fdata.split('\n').forEach(element => {
            this.parseNode(element);
        });
    }

    parseNode = (line: string) => {
        const regex: RegExp = /(\w+)\s\((\d+)\)( -> (.+))?/;
        const match: RegExpExecArray = regex.exec(line);
        if (match != null) {
            const name: string = match[1];
            const nodeSize: number = +match[2];
            
            const childrenStr: string = match[4];
            let children: Array<string> = [];
            if (childrenStr) {
                children = childrenStr.split(', ');
            }            
            this.nodes.push({name: name, parent:'', size: nodeSize, children: children});
        }
    }

    findBottom = () => {
        const parents: Array<NodeData> = this.nodes.filter(n => n.children.length > 0);
        for (let i=0;i<parents.length;i++) {
            let found: boolean = false;
            const node: string = parents[i].name;
            for (let j=0;j<parents.length;j++) {
                if (i === j) {
                    continue;
                }
                const children: Array<string> = parents[j].children;
                if (children.includes(node)) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                return node;
            }
        }
        return '';
    }

    getNode = (name: string): NodeData => {
        const filtered: NodeData[] = this.nodes.filter(n => n.name === name);
        if (filtered) {
            return filtered[0];
        }
        return null;
    }

    buildTower = (node: string): Tower => {
        const data: NodeData = this.getNode(node);
        const children: string[] = data.children;
        const current: Tower = {name: data.name, weight: data.size, children: [], sum: data.size}        
        children.forEach(c => {
            const childTower: Tower = this.buildTower(c);
            current.children.push(childTower);
        })
        return current;
    }

    getBalance = (tower: Tower): number | undefined => {
        if (this.skip) {
            return;
        }
        const children: Array<Tower> = tower.children;
        let sum: number = tower.weight;
        if (children.length > 0) {
            const weights: Array<number> = children.map(t => this.getBalance(t));
            sum += weights.reduce((acc, value) => acc + value);
            tower.sum = sum;
            console.log(tower.name, tower.weight, weights)
            if (!this.checkBalance(weights)) {
                console.log('not balanced: ', tower.name, tower.children.map(c => c.name));
                this.handleBalance(tower);
                this.skip = true;
            }
        }
        return sum;
    }

    handleBalance = (tower: Tower) => {
        let value: number = null;
        const check: Set<number> = new Set();
        for (let c of tower.children) {
            const weight: number = c.sum;
            if (check.has(weight)) {
                value = weight;
                break;
            }
            check.add(weight);
        }
        if (!value) {
            return;
        }        
        for (let c of tower.children) {
            const weight: number = c.sum;
            if (weight !== value) {
                console.log('balance: ', c.weight - weight + value);
                return;
            }
        }
    }

    checkBalance = (weights: number[]): boolean => {
        let last: number = null;
        for (let w of weights) {
            if (last > 0 && last !== w) {
                return false;
            }
            last = w
        }
        return true;
    }

    printTower = (tower: Tower, lvl: number) => {
        console.log('\t'.repeat(lvl), tower.name, tower.weight);
        tower.children.forEach(c => {
            this.printTower(c, lvl+1);
        })        
    }

    log = () => {
        this.nodes.forEach(n => {
            console.log(n);
        })
    }
}
new TowerBuilder();