import { Space } from "./space.js";
import { BodyParams, Pos } from "./utils/types.js";

export class Body {
  radius: number;
  pos: Pos;
  spacePos: Pos;
  ctx: CanvasRenderingContext2D;
  id: number;
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
  }

  #generateBody() {
    this.ctx.strokeStyle = "rgba(255,255,255,0.9)";
    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
  }

  update(updatedSpacePos: Pos, gravity: Space["gravity"][0]) {
    this.pos.x -= this.spacePos.x - updatedSpacePos.x;
    this.pos.y -= this.spacePos.y - updatedSpacePos.y;
    this.spacePos = { ...updatedSpacePos };
    if (rocketIsInBody(this.pos, this.radius)) {
      gravity.value = 20;
    } else {
      gravity.value = 0;
    }
    this.#generateBody();
  }
}

function rocketIsInBody(pos: Pos, radius: number) {
  // Rocket position is always at the middle
  const dist = Math.hypot(pos.x - innerWidth / 2, pos.y - innerHeight / 2);
  if (dist <= radius + 8) {
    //So it can be just outside the body
    return true;
  }
  return false;
}
