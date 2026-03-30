import type { Direction } from "./constants";

export type TrafficLightState = "red" | "yellow" | "green";

export class TrafficLight {
  direction: Direction;
  state: TrafficLightState;
  timer: number;
  GREEN_DUR: number;
  YELLOW_DUR: number;

  constructor(direction: Direction) {
    this.direction = direction;
    this.state = "red";
    this.timer = 0;
    this.GREEN_DUR   = 200;
    this.YELLOW_DUR  = 45;
  }

  setGreen() {
    this.state = "green";
    this.timer = 0;
  }

  setRed() {
    this.state = "red";
    this.timer = 0;
  }

  isGreen() { return this.state === "green"; }
  isRed()   { return this.state === "red";   }

  update() {
    this.timer++;
    if (this.state === "green" && this.timer >= this.GREEN_DUR) {
      this.state = "yellow";
      this.timer = 0;
    } else if (this.state === "yellow" && this.timer >= this.YELLOW_DUR) {
      this.state = "red";
      this.timer = 0;
    }
  }
}
