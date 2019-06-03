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
        this.readData('test.data')
        .then(fdata => {
            this.parse(fdata);
            this.log();
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

    log = () => {
        this.nodes.forEach(n => {
            console.log(n);
        })
    }
}
new Tower();