export class Space {
    ctx;
    width = 0;
    height = 0;
    pos = { x: 0, y: 0 };
    acceleration = { x: 0, y: 0 };
    canvasPos;
    velocity = { x: 0, y: 0 };
    friction = 0.99;
    thrust = 0.2;
    isDragging = false;
    maxSpeed = 10;
    maxCanvasPos;
    minCanvasPos;
    movement = { x: 0, y: 0 }; //Account for canvas translation
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.minCanvasPos = { x: innerWidth, y: innerHeight };
        this.maxCanvasPos = {
            x: this.width - innerWidth,
            y: this.height - innerHeight,
        };
        this.pos = { x: -this.width / 2, y: -this.height / 2 };
        this.canvasPos = { x: this.width / 2, y: this.height / 2 };
        this.ctx.translate(-this.width / 2, -this.height / 2);
        this.#addEventListeners();
        this.#generateGrid();
    }
    #clearRect() {
        this.ctx.clearRect(this.pos.x, this.pos.y, this.width + this.width / 2, this.height + this.height / 2);
    }
    #generateGrid() {
        this.#clearRect();
        this.ctx.strokeStyle = "green";
        this.ctx.beginPath();
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
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
            // Increase the thrust when the pointer is down
            this.isDragging = true;
        });
        document.addEventListener("pointerup", (e) => {
            // Decrease the thrust when the pointer is up
            this.isDragging = false;
        });
        document.addEventListener("pointermove", (e) => {
            let dx = 0, dy = 0;
            if (!this.isDragging)
                return;
            if (this.canvasPos.x + e.movementX <= this.minCanvasPos.x ||
                this.canvasPos.x + e.movementX >= this.maxCanvasPos.x) {
                dx = 0;
            }
            else {
                dx = e.movementX;
            }
            if (this.canvasPos.y + e.movementY <= this.minCanvasPos.y ||
                this.canvasPos.y + e.movementY >= this.maxCanvasPos.y) {
                dy = 0;
            }
            else {
                dy = e.movementY;
            }
            this.canvasPos.x += dx;
            this.canvasPos.y += dy;
            this.movement.x = dx;
            this.movement.y += dy;
            this.ctx.translate(dx, dy);
            this.#generateGrid();
        });
    }
    update() { }
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
