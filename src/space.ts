import { Rocket } from "./rocket.js";
import { Pos } from "./utils/types.js";

export class Space {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private rockets: Rocket[] = [];
  private pos: Pos = { x: 0, y: 0 };
  public acceleration: Pos = { x: 0, y: 0 };
  public velocity: Pos = { x: 0, y: 0 };
  public friction = 0.99;
  public gravity = 0.1;
  public thrust = 0.2;
  private isDragging = false;
  private maxVelocity = 10;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    // this.rockets.push(new Rocket(ctx, width, height));
    this.#addEventListeners();
    this.#generateGrid();
  }
  #generateGrid() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    for (let x = this.pos.x; x < this.width; x += 100) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
    }
    for (let y = this.pos.y; y < this.height; y += 100) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
    }
    this.ctx.stroke();
  }

  #addEventListeners() {
    document.addEventListener("pointerdown", (e) => {
      console.log("a");
      // Increase the thrust when the pointer is down
      this.isDragging = true;
    });
    document.addEventListener("pointerup", (e) => {
      console.log("a");
      // Decrease the thrust when the pointer is up
      this.isDragging = false;
    });
    document.addEventListener("pointermove", (e) => {
      console.log("a");
      if (!this.isDragging) return;
      this.acceleration.x = (e as PointerEvent).movementX * this.thrust;
      this.acceleration.y = (e as PointerEvent).movementY * this.thrust;
      this.velocity.x -= Math.min(this.maxVelocity, this.acceleration.x);
      this.velocity.y -= Math.min(this.maxVelocity, this.acceleration.y);
      this.#translateSpace();
    });
  }

  #translateSpace() {
    const translation = { x: this.velocity.x, y: this.velocity.y };
    this.update(translation);
  }

  update(translation: Pos) {
    this.pos = { x: -translation.x, y: -translation.y };
    this.#generateGrid();
  }
}
