import { Stack } from "./utils/stack.js";
import { Pos } from "./utils/types.js";

export class Rocket {
  pos: Pos = { x: 0, y: 0 };
  startPos: Pos = { x: 0, y: 0 }; // For calculating speed
  dir: Pos = { x: 0, y: 0 };
  thrust: number = 0;
  acceleration: number = 0;
  rotation: number = 0;
  angle: number = 0;
  maxSpeed: number = 100;
  speed: number = 0;
  element: SVGSVGElement;
  isDragging: boolean = false;
  thrustEl: SVGSVGElement;
  constructor() {
    this.element = document.querySelector("#rocket") as SVGSVGElement;
    this.thrustEl = document.querySelector("#thrust") as SVGSVGElement;
    const pos = this.element.getBoundingClientRect();
    this.pos = {
      x: pos.width / 2 + pos.x,
      y: pos.height / 2 + pos.y,
    };
    this.#addEventListeners();
  }

  #addEventListeners() {
    const hideTrustEl = (ev: PointerEvent) => {
      this.isDragging = false;
      this.startPos = { x: ev.clientX, y: ev.clientY };
    };

    const showTrustEl = (ev: PointerEvent) => {
      this.isDragging = true;
      this.startPos = { x: ev.clientX, y: ev.clientY };
    };

    const editTrust = (ev: PointerEvent) => {
      if (!this.isDragging) return;

      this.dir = {
        x: ev.clientX - this.startPos.x,
        y: ev.clientY - this.startPos.y,
      };
      this.rotation = getRotation(this.pos, { x: ev.clientX, y: ev.clientY });
      this.element.style.rotate = `${this.rotation}deg`;
      this.acceleration = Math.min(
        80,
        Math.hypot(this.dir.x - 100, this.dir.y - 100)
      );
      console.log(this.acceleration);
    };

    document.addEventListener("pointerdown", showTrustEl);
    document.addEventListener("pointerup", hideTrustEl);
    document.addEventListener("pointermove", editTrust);
  }

  update() {
    if (this.isDragging) {
      this.thrustEl.style.display = "block";
      this.thrustEl
        .querySelector("path")!
        .setAttribute("d", `M 100 100 L ${this.dir.x} ${this.dir.y}`);
    } else {
      this.thrustEl.style.display = "none";
    }
    console.log(this.rotation);
    return [this.acceleration, this.rotation] as const;
  }
}

const getRotation = (pos1: Pos, pos2: Pos) => {
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  let theta = Math.atan2(dy, dx);
  theta *= 180 / Math.PI;
  if (theta < 0) theta += 360;
  console.log(theta);
  return theta + 90;
};

/* 
this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
*/
