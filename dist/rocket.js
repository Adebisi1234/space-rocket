export class Rocket {
    // private trail: Stack
    rocketEl;
    constructor() {
        this.rocketEl = document.querySelector("#rocket");
    }
    #addEventListeners() { }
    update(angle) {
        this.rocketEl.style.rotate = `${radToDegree(angle) + 90}deg`; // Taking into account the direction the angle is calculated in respect to..
    }
}
function calcAngleDegrees(pos) {
    return (Math.atan2(pos.y, pos.x) * 180) / Math.PI;
}
function radToDegree(angle) {
    return (angle * 180) / Math.PI;
}
