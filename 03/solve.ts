
class Spiral {
    input: number = 277678;

    calc = () => {
        const spiral = Math.ceil(Math.sqrt(this.input));
        const center = Math.ceil((spiral - 1) / 2);
        console.log(center + Math.abs(center - this.input % spiral) - 1);
    }
}

new Spiral().calc();