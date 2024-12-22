export class Rocket {
    pos = { x: 0, y: 0 };
    startPos = { x: 0, y: 0 }; // For calculating speed
    dir = { x: 0, y: 0 };
    thrust = 0;
    acceleration = 0;
    rotation = 0;
    angle = 0;
    maxSpeed = 100;
    speed = 0;
    element;
    isDragging = false;
    thrustEl;
    constructor() {
        this.element = document.querySelector("#rocket");
        this.thrustEl = document.querySelector("#thrust");
        const pos = this.element.getBoundingClientRect();
        this.pos = {
            x: pos.width / 2 + pos.x,
            y: pos.height / 2 + pos.y,
        };
        this.#addEventListeners();
    }
    #addEventListeners() {
        const hideTrustEl = (ev) => {
            this.isDragging = false;
            this.startPos = { x: ev.clientX, y: ev.clientY };
        };
        const showTrustEl = (ev) => {
            this.isDragging = true;
            this.startPos = { x: ev.clientX, y: ev.clientY };
        };
        const editTrust = (ev) => {
            if (!this.isDragging)
                return;
            this.dir = {
                x: ev.clientX - this.startPos.x,
                y: ev.clientY - this.startPos.y,
            };
            this.rotation = getRotation(this.pos, { x: ev.clientX, y: ev.clientY });
            this.element.style.rotate = `${this.rotation}deg`;
            this.acceleration = Math.min(80, Math.hypot(this.dir.x - 100, this.dir.y - 100));
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
                .querySelector("path")
                .setAttribute("d", `M 100 100 L ${this.dir.x} ${this.dir.y}`);
        }
        else {
            this.thrustEl.style.display = "none";
        }
        console.log(this.rotation);
        return [this.acceleration, this.rotation];
    }
}
const getRotation = (pos1, pos2) => {
    const dx = pos2.x - pos1.x;
    const dy = pos2.y - pos1.y;
    let theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    if (theta < 0)
        theta += 360;
    console.log(theta);
    return theta + 90;
};
/*
this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
*/
