import { Stack } from "./utils/stack.js";
export class Rocket {
    trail;
    ctx;
    rocketEl;
    constructor(ctx) {
        this.rocketEl = document.querySelector("#rocket");
        this.trail = new Stack(100);
        this.ctx = ctx;
    }
    update(angle, movement) {
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
        // console.log(this.trail);
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
function calcAngleDegrees(pos) {
    return (Math.atan2(pos.y, pos.x) * 180) / Math.PI;
}
function radToDegree(angle) {
    return (angle * 180) / Math.PI;
}
