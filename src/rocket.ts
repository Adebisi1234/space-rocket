import { Stack } from "./utils/stack.js";
import { Pos } from "./utils/types.js";

export class Rocket {
  constructor() {}

  #addEventListeners() {}

  update() {}
}

function calcAngleDegrees(pos: Pos) {
  return (Math.atan2(pos.y, pos.x) * 180) / Math.PI;
}
/* 
this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
*/
