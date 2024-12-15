import { Pos } from "./types";

export class Stack {
  size: number;
  inputs: Pos[];
  constructor(size: number, ...inputs: Pos[]) {
    this.size = size;
    this.inputs = [...inputs];
  }

  push(pos: Pos) {
    if (this.inputs.length === this.size) {
      this.inputs.shift();
    }
    this.inputs.push(pos);
  }

  pop() {
    return this.inputs[this.inputs.length - 1];
  }
}
