import { Stack } from "./utils/stack.js";
import { Pos } from "./utils/types.js";

export class Rocket {
  private trail: Stack;
  private ctx: CanvasRenderingContext2D;
  private rocketEl: SVGSVGElement;
  constructor(ctx: CanvasRenderingContext2D) {
    this.rocketEl = document.querySelector("#rocket")! as SVGSVGElement;
    this.trail = new Stack(100);
    this.ctx = ctx;
  }
  update(angle: number, movement: Pos) {
    // this.ctx.beginPath();
    // this.ctx.lineDashOffset = 10;
    // this.ctx.fillStyle = "green";
    // this.ctx.fillRect(innerWidth / 2, innerHeight / 2, 10, 10);
    // this.ctx.stroke();
    // this.ctx.closePath();

    const newTrail = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    this.trail.push(newTrail);
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([16, 32]);
    this.ctx.strokeStyle = "green";
    for (let i = 1; i < this.trail.inputs.length; i++) {
      const prev = this.trail.inputs[i - 1];
      const curr = this.trail.inputs[i];
      curr.x -= movement.x;
      curr.y -= movement.y;
      this.ctx.moveTo(prev.x, prev.y);
      this.ctx.lineTo(curr.x, curr.y);
    }
    this.ctx.stroke();

    this.ctx.setLineDash([]);
    this.ctx.lineWidth = 1;

    this.rocketEl.style.rotate = `${radToDegree(angle) + 90}deg`; // Taking into account the direction the angle is calculated in respect to..
  }
}

function calcAngleDegrees(pos: Pos) {
  return (Math.atan2(pos.y, pos.x) * 180) / Math.PI;
}

function radToDegree(angle: number) {
  return (angle * 180) / Math.PI;
}
