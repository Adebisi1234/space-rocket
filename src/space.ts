class Space {
  width: number = 0;
  height: number = 0;
  shape: string = "circle";
  noOfBodies: number = 3;
  typesOfBodies: string[] = ["planet", "star", "black-hole"];
  pos: { x: number; y: number } = { x: 0, y: 0 };
}
