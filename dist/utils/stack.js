export class Stack {
    size;
    inputs;
    constructor(size, inputs) {
        this.size = size;
        this.inputs = inputs
            ? [...inputs]
            : [{ x: innerWidth / 2, y: innerHeight / 2 }];
    }
    push(pos) {
        if (this.inputs.length === this.size) {
            this.inputs.shift();
        }
        this.inputs.push(pos);
    }
    peek() {
        return this.inputs[this.inputs.length - 1];
    }
}
