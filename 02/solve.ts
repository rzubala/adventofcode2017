import * as file from 'fs';

class Checksum {

    constructor() {
        this.readData()
        .then((data) => {
            console.log(data);
        })
        .catch(err => console.log(err));
    }

    readData = ():Promise<any> => {
        return new Promise((resolve, reject) => {
            file.readFile('input.data', 'utf8', (data, err) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
}

new Checksum();