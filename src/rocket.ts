import { Stack } from "./utils/stack";
import { Pos } from "./utils/types";

class Rocket {
  pos: Pos = { x: 0, y: 0 };
  thrust: number = 0;
  acceleration: number = 0;
  size: number = 0;
  rotation: number = 0;
  trail: Stack = new Stack(this.size, this.pos); // Stack, size increases with the acceleration, pops with every animation-frame
  angle: number = 0;
  maxSpeed: number = 0;
  constructor({
    pos,
    thrust,
    acceleration,
    size,
    rotation,
    trail,
  }: {
    pos: Pos;
    thrust: number;
    acceleration: number;
    size: number;
    rotation: number;
    trail: Stack;
  }) {
    this.pos = pos;
    this.thrust = thrust;
    this.acceleration = acceleration;
    this.size = size;
    this.rotation = rotation;
    this.trail = trail;
  }
}

/* 
this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
*/
