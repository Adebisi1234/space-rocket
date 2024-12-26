export class Body {
    radius;
    pos;
    spacePos;
    ctx;
    id;
    constructor(pos, radius, ctx, spacePos, id) {
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
    update(updatedSpacePos, gravity) {
        this.pos.x -= this.spacePos.x - updatedSpacePos.x;
        this.pos.y -= this.spacePos.y - updatedSpacePos.y;
        this.spacePos = { ...updatedSpacePos };
        if (rocketIsInBody(this.pos, this.radius)) {
            gravity.value = 20;
        }
        else {
            gravity.value = 0;
        }
        this.#generateBody();
    }
}
function rocketIsInBody(pos, radius) {
    // Rocket position is always at the middle
    const dist = Math.hypot(pos.x - innerWidth / 2, pos.y - innerHeight / 2);
    if (dist <= radius + 8) {
        //So it can be just outside the body
        return true;
    }
    return false;
}
