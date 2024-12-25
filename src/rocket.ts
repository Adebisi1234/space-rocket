import { Stack } from "./utils/stack.js";
import { Pos } from "./utils/types.js";

export class Rocket {
  // private trail: Stack
  private rocketEl: SVGSVGElement;
  constructor() {
    this.rocketEl = document.querySelector("#rocket")! as SVGSVGElement;
  }

  #addEventListeners() {}

  update(angle: number) {
    this.rocketEl.style.rotate = `${radToDegree(angle) + 90}deg`; // Taking into account the direction the angle is calculated in respect to..
  }
}

function calcAngleDegrees(pos: Pos) {
  return (Math.atan2(pos.y, pos.x) * 180) / Math.PI;
}

function radToDegree(angle: number) {
  return (angle * 180) / Math.PI;
}
