import { Space } from "./space.js";
import { BodyParams, Pos } from "./utils/types.js";

export class Body {
  radius: number;
  pos: Pos;
  spacePos: Pos;
  ctx: CanvasRenderingContext2D;
  id: number;
  dist: number;
  gravity: number = 0;
  discovered: boolean = false;
  constructor(
    pos: Pos,
    radius: number,
    ctx: CanvasRenderingContext2D,
    spacePos: Pos,
    id: number
  ) {
    this.radius = radius;
    this.pos = pos;
    this.ctx = ctx;
    this.id = id;
    this.spacePos = spacePos;
    this.#generateBody();
    this.dist = 0;
  }

  #generateBody() {
    this.ctx.strokeStyle = "rgba(255,255,255,0.9)";
    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
  }

  update(updatedSpacePos: Pos) {
    this.pos.x -= this.spacePos.x - updatedSpacePos.x;
    this.pos.y -= this.spacePos.y - updatedSpacePos.y;
    this.spacePos = { ...updatedSpacePos };
    if (this.rocketIsInBody(this.pos, this.radius)) {
      this.gravity = 20;
    } else {
      this.gravity = 0;
    }
    this.#generateBody();
  }
  rocketIsInBody(pos: Pos, radius: number) {
    // Rocket position is always at the middle
    const dist = Math.hypot(pos.x - innerWidth / 2, pos.y - innerHeight / 2);
    if (dist <= radius + 8) {
      //So it can be just outside the body
      this.dist = dist;
      return true;
    }
    return false;
  }

  canEscape(movement: Pos) {
    const pos = {
      x: this.pos.x - movement.x,
      y: this.pos.y - movement.y,
    };
    const dist = Math.hypot(pos.x - innerWidth / 2, pos.y - innerHeight / 2);
    if (this.dist && this.dist > dist) {
      this.discovered = true;
      return false;
    }
    return true;
  }
}
