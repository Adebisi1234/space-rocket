class Body {
    rings = 0;
    gravity = 0;
    size = 0;
    pos = { x: 0, y: 0 };
    ringSize = [];
    type = "";
    constructor({ size, pos, gravity, type }) {
        this.size = size;
        this.pos = pos;
        this.gravity = gravity;
        this.rings = 5;
        this.type = type;
        for (let i = 1; i <= this.rings; i++) {
            this.ringSize[i] = (200 / i) * this.size; //maximum ring size is *2 of the body size
        }
    }
}
export {};
