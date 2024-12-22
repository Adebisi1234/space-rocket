import { BodyParams, Pos } from "./utils/types.js";

class Body {
  rings: number = 0;
  gravity: number = 0;
  size: number = 0;
  pos: Pos = { x: 0, y: 0 };
  ringSize: number[] = [];
  type: string = "";

  constructor({ size, pos, gravity, type }: BodyParams) {
    this.size = size;
    this.pos = pos;
    this.gravity = gravity;
    this.rings = 5;
    this.type = type;
    for (let i = 1; i <= this.rings; i++) {
      this.ringSize[i] = (200 / i) * this.size; //maximum ring size is *2 of the body size
    }
  }
}
