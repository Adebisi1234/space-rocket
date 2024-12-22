export class Stack {
    size;
    inputs;
    constructor(size, ...inputs) {
        this.size = size;
        this.inputs = [...inputs];
    }
    push(pos) {
        if (this.inputs.length === this.size) {
            this.inputs.shift();
        }
        this.inputs.push(pos);
    }
    pop() {
        return this.inputs[this.inputs.length - 1];
    }
}
