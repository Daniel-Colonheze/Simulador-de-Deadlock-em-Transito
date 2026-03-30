import { Car, type CarState } from "./car";
import { TrafficLight } from "./TrafficLight";
import { DIRECTIONS, type Direction } from "./constants";

export type SimulationMode = "deadlock" | "solution";

export interface SimulationStats {
  completed: number;
  waiting: number;
  broken: number;
  crossing: number;
  deadlocked: boolean;
  tick: number;
}

export class Simulation {
  mode: SimulationMode;
  cars: Car[];
  lights: Record<Direction, TrafficLight>;
  tick: number;
  carsCompleted: number;
  deadlocked: boolean;
  spawnCooldown: Record<Direction, number>;

  // Traffic light cycle state
  activeGroup: "ns" | "ew";
  groupTimer: number;
  GROUP_GREEN: number;
  GROUP_YELLOW: number;
  cyclePhase: "green" | "yellow";

  constructor(mode: SimulationMode) {
    this.mode = mode;
    this.cars = [];
    this.lights = {} as Record<Direction, TrafficLight>;
    this.tick = 0;
    this.carsCompleted = 0;
    this.deadlocked = false;
    this.spawnCooldown = {} as Record<Direction, number>;

    // Traffic light cycle state
    this.activeGroup = "ns";
    this.groupTimer  = 0;
    this.GROUP_GREEN   = 200;
    this.GROUP_YELLOW  = 45;
    this.cyclePhase    = "green";

    DIRECTIONS.forEach(d => {
      this.lights[d] = new TrafficLight(d);
      this.spawnCooldown[d] = 30 + Math.floor(Math.random() * 60);
    });

    if (mode === "solution") {
      // NS starts green, EW red
      this.lights["north"].setGreen();
      this.lights["south"].setGreen();
    }
  }

  // ── Spawn ──
  private _spawnCar(dir: Direction) {
    const existing = this.cars.filter(c => c.direction === dir && c.state !== "done");
    if (existing.length >= 3) return;
    this.cars.push(new Car(dir));
  }

  // ── Traffic light cycle (solution mode) ──
  private _updateLights() {
    this.groupTimer++;

    if (this.cyclePhase === "green" && this.groupTimer >= this.GROUP_GREEN) {
      // Turn active group yellow
      if (this.activeGroup === "ns") {
        this.lights["north"].state = "yellow";
        this.lights["south"].state = "yellow";
      } else {
        this.lights["east"].state = "yellow";
        this.lights["west"].state = "yellow";
      }
      this.cyclePhase = "yellow";
      this.groupTimer = 0;
    } else if (this.cyclePhase === "yellow" && this.groupTimer >= this.GROUP_YELLOW) {
      // Switch group
      if (this.activeGroup === "ns") {
        this.lights["north"].setRed();
        this.lights["south"].setRed();
        this.lights["east"].setGreen();
        this.lights["west"].setGreen();
        this.activeGroup = "ew";
      } else {
        this.lights["east"].setRed();
        this.lights["west"].setRed();
        this.lights["north"].setGreen();
        this.lights["south"].setGreen();
        this.activeGroup = "ns";
      }
      this.cyclePhase = "green";
      this.groupTimer = 0;
    }
  }

  // ── Can a car enter the intersection? ──
  private _canEnter(car: Car) {
    if (this.mode === "deadlock") return true;   // no control → crash
    return this.lights[car.direction].isGreen();
  }

  // ── Deadlock detection ──
  private _checkDeadlock() {
    if (this.mode !== "deadlock") { this.deadlocked = false; return; }
    const alive = this.cars.filter(c => c.state !== "done");
    const stuck = alive.filter(c => c.state === "waiting" || c.state === "broken");
    this.deadlocked = stuck.length >= 3 && alive.length >= 3;
  }

  // ── Main update ──
  update() {
    this.tick++;

    // Spawn
    DIRECTIONS.forEach(d => {
      this.spawnCooldown[d]!--;
      if (this.spawnCooldown[d]! <= 0) {
        this._spawnCar(d);
        this.spawnCooldown[d] = 100 + Math.floor(Math.random() * 80);
      }
    });

    // Update lights
    if (this.mode === "solution") this._updateLights();

    // Update cars
    const alive = this.cars.filter(c => c.state !== "done");
    for (const car of alive) {
      car.update(
        this._canEnter(car),
        alive,
        this.mode === "deadlock"
      );
    }

    this._checkDeadlock();

    // Count completions and prune
    this.cars = this.cars.filter(c => {
      if (c.state === "done") { this.carsCompleted++; return false; }
      return true;
    });
  }

  getStats(): SimulationStats {
    const alive = this.cars.filter(c => c.state !== "done");
    return {
      completed: this.carsCompleted,
      waiting:   alive.filter(c => c.state === "waiting").length,
      broken:    alive.filter(c => c.state === "broken").length,
      crossing:  alive.filter(c => c.state === "crossing").length,
      deadlocked: this.deadlocked,
      tick: this.tick,
    };
  }
}
