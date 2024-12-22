export class Rocket {
    constructor() { }
    #addEventListeners() { }
    update() { }
}
function calcAngleDegrees(pos) {
    return (Math.atan2(pos.y, pos.x) * 180) / Math.PI;
}
/*
this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
*/
