import { FileReader } from '../common'

interface NodeData {
    name: string;
    parent: string;
    size: number;
    children: string[];
}

class Tower extends FileReader {

    private nodes: Array<NodeData> = [];

    constructor() {
        super();
        this.readData('input.data')
        .then(fdata => {
            this.parse(fdata);            
            //this.log();
            console.log(this.findBottom());
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

    log = () => {
        this.nodes.forEach(n => {
            console.log(n);
        })
    }
}
new Tower();