import { Body } from "./body.js";
import { Rocket } from "./rocket.js";
export class Space {
    ctx;
    width = 0;
    height = 0;
    pos = { x: 0, y: 0 };
    acceleration = { x: 0, y: 0 };
    velocity = { x: 0, y: 0 };
    friction = 0.5;
    thrust = 0.99;
    isDragging = false;
    maxSpeed = 20;
    maxPos;
    minPos;
    movement = { x: 0, y: 0 }; //Account for canvas translation
    angle = 0;
    rocket;
    cursorMoving = false;
    bodies = [];
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
        this.bodies = [
            new Body({ x: innerWidth / 4, y: innerHeight / 2 }, 100, this.ctx, {
                ...this.pos,
            }, 0),
            new Body({ x: 0, y: innerHeight / 5 }, 50, this.ctx, { ...this.pos }, 1),
            new Body({ x: innerWidth * 1.1, y: innerHeight / 8 }, 50, this.ctx, { ...this.pos }, 2),
        ];
    }
    #clearRect() {
        this.ctx.clearRect(0, 0, innerWidth, innerHeight);
    }
    #generateGrid() {
        this.#clearRect();
        this.ctx.beginPath();
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
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
            // Use to keep moving the rocket in the right direction
            this.cursorMoving = false;
        });
        document.addEventListener("pointermove", (e) => {
            if (!this.isDragging)
                return;
            if (!this.cursorMoving) {
                this.cursorMoving = true;
            }
            this.angle = calcAngleRad({ x: e.movementX, y: e.movementY });
            this.thrust = Math.min(this.maxSpeed, Math.max(this.thrust + (3 - this.thrust * getMaxGravity(this.bodies)), 0));
        });
    }
    update() {
        if (!this.isDragging) {
            this.thrust = Math.max(0, this.thrust - this.friction - this.thrust * getMaxGravity(this.bodies));
        }
        // if (!canRocketMove(this.bodies)) {
        //   console.log(this.thrust);
        //   this.thrust = ;
        // }
        this.movement.x = Math.cos(this.angle) * this.thrust;
        this.movement.y = Math.sin(this.angle) * this.thrust;
        if (!this.canRocketMove()) {
            console.log("can't move");
            return;
        }
        this.pos.x = Math.min(Math.max(this.pos.x - this.movement.x, this.minPos.x), this.maxPos.x);
        this.pos.y = Math.min(Math.max(this.pos.y - this.movement.y, this.minPos.y), this.maxPos.y);
        this.rocket.update(this.angle);
        this.#generateGrid();
        this.bodies.forEach((body) => body.update(this.pos));
    }
    canRocketMove() {
        return this.bodies.every((body) => body.canEscape(this.movement));
    }
}
// function calcAngleDegrees(pos: Pos) {
//   return (Math.atan2(pos.y, pos.x) * 180) / Math.PI;
// }
function calcAngleRad(pos) {
    return Math.atan2(pos.y, pos.x);
}
function getMaxGravity(bodies) {
    return bodies.reduce((prev, curr) => {
        if (curr.gravity > prev.gravity)
            return curr;
        return prev;
    }, { gravity: 0 })["gravity"];
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
