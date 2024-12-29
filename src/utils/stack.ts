import { Pos } from "./types.js";

export class Stack {
  size: number;
  inputs: Pos[];
  constructor(size: number, inputs?: Pos[]) {
    this.size = size;
    this.inputs = inputs
      ? [...inputs]
      : [{ x: innerWidth / 2, y: innerHeight / 2 }];
  }

  push(pos: Pos) {
    if (this.inputs.length === this.size) {
      this.inputs.shift();
    }
    this.inputs.push(pos);
  }

  peek() {
    return this.inputs[this.inputs.length - 1];
  }
}
