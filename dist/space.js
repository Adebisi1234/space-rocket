import { Rocket } from "./rocket.js";
export class Space {
    ctx;
    width = 0;
    height = 0;
    pos = { x: 0, y: 0 };
    acceleration = { x: 0, y: 0 };
    velocity = { x: 0, y: 0 };
    friction = 0.09;
    thrust = 0.99;
    isDragging = false;
    maxSpeed = 10;
    maxPos;
    minPos;
    movement = { x: 0, y: 0 }; //Account for canvas translation
    angle = 0;
    rocket;
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.rocket = new Rocket();
        this.minPos = { x: -this.width, y: -this.height };
        this.maxPos = {
            x: 0,
            y: 0,
        };
        this.pos = { x: -this.width / 2, y: -this.height / 2 };
        this.#addEventListeners();
        this.#generateGrid();
    }
    #clearRect() {
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);
    }
    #generateGrid() {
        this.#clearRect();
        this.ctx.beginPath();
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        for (let x = this.pos.x; x < this.width; x += 100) {
            if (x < 0 || x > innerWidth)
                continue;
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
        }
        for (let y = this.pos.y; y < this.height; y += 100) {
            if (y < 0 || y > innerHeight)
                continue;
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
        }
        this.ctx.stroke();
    }
    #addEventListeners() {
        document.addEventListener("pointerdown", (e) => {
            // Increase the thrust when the pointer is down
            this.isDragging = true;
        });
        document.addEventListener("pointerup", (e) => {
            // Decrease the thrust when the pointer is up
            this.isDragging = false;
        });
        document.addEventListener("pointermove", (e) => {
            if (!this.isDragging)
                return;
            this.angle = calcAngleRad({ x: e.movementX, y: e.movementY });
            this.thrust = Math.min(20, this.thrust + 3);
        });
    }
    update() {
        if (!this.isDragging) {
            this.thrust = Math.max(0, this.thrust - this.friction);
        }
        console.log(this.pos);
        this.movement.x = Math.cos(this.angle) * this.thrust;
        this.movement.y = Math.sin(this.angle) * this.thrust;
        this.pos.x = Math.min(Math.max(this.pos.x - this.movement.x, this.minPos.x), this.maxPos.x);
        this.pos.y = Math.min(Math.max(this.pos.y - this.movement.y, this.minPos.y), this.maxPos.y);
        this.rocket.update(this.angle);
        this.#generateGrid();
    }
}
function calcAngleDegrees(pos) {
    return (Math.atan2(pos.y, pos.x) * 180) / Math.PI;
}
function calcAngleRad(pos) {
    return Math.atan2(pos.y, pos.x);
}
// Next
/*
- Limiting the space - done
- movement velocity, and friction
  - thrust += hypot(e.movement)
  - velocity *= thrust
  - velocity -= friction

- Bodies
 - Different class...
*/
