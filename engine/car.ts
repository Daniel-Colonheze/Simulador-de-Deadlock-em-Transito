import { LANE_CONFIG, CAR_BODY_LEN, CAR_BODY_WID, CX, CY, HALF, W, H } from "./constants";
import type { Direction } from "./constants";

let _id = 0;

export type CarState = "moving" | "waiting" | "crossing" | "broken" | "done";

export interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

export class Car {
  id: number;
  direction: Direction;
  x: number;
  y: number;
  speed: number;
  baseSpeed: number;
  state: CarState;
  waitTime: number;
  smokeParticles: SmokeParticle[];
  brokenTimer: number;
  collidedWith: number | null;
  color: string;

  constructor(direction: Direction) {
    this.id = ++_id;
    this.direction = direction;
    const cfg = LANE_CONFIG[direction];
    this.x = cfg.entry.x;
    this.y = cfg.entry.y;
    this.speed = 1.6 + Math.random() * 0.7;
    this.baseSpeed = this.speed;
    // state: moving | waiting | crossing | broken | done
    this.state = "moving";
    this.waitTime = 0;
    this.smokeParticles = [];
    this.brokenTimer = 0;
    this.collidedWith = null;

    // Set color based on direction
    const colors: Record<Direction, string> = {
      north: "#FF4560",
      south: "#00E396",
      east: "#008FFB",
      west: "#FEB019",
    };
    this.color = colors[direction];
  }

  // Axis-aligned bounding box (half-extents)
  getBounds() {
    const cfg = LANE_CONFIG[this.direction];
    const isV = cfg.axis === "y";
    const hw = isV ? CAR_BODY_WID / 2 : CAR_BODY_LEN / 2;
    const hh = isV ? CAR_BODY_LEN / 2 : CAR_BODY_WID / 2;
    return { x: this.x, y: this.y, hw, hh };
  }

  overlaps(other: Car) {
    const a = this.getBounds();
    const b = other.getBounds();
    return (
      Math.abs(a.x - b.x) < a.hw + b.hw - 2 &&
      Math.abs(a.y - b.y) < a.hh + b.hh - 2
    );
  }

  distAlongAxis() {
    const cfg = LANE_CONFIG[this.direction];
    return cfg.axis === "y" ? this.y : this.x;
  }

  distToStopLine() {
    const cfg = LANE_CONFIG[this.direction];
    const pos = cfg.axis === "y" ? this.y : this.x;
    return (cfg.stopLine - pos) * cfg.dir; // positive = haven't reached yet
  }

  isPastStopLine() {
    return this.distToStopLine() < 0;
  }

  isInIntersection() {
    return (
      this.x > CX - HALF - 4 && this.x < CX + HALF + 4 &&
      this.y > CY - HALF - 4 && this.y < CY + HALF + 4
    );
  }

  isOffScreen() {
    return this.x < -120 || this.x > W + 120 || this.y < -120 || this.y > H + 120;
  }

  markBroken() {
    if (this.state === "broken") return;
    this.state = "broken";
    this.speed = 0;
  }

  updateSmoke() {
    // Spawn smoke particles when broken
    if (this.state === "broken") {
      if (Math.random() < 0.25) {
        this.smokeParticles.push({
          x: this.x + (Math.random() - 0.5) * 16,
          y: this.y + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 0.6,
          vy: -0.5 - Math.random() * 0.5,
          life: 1.0,
          size: 4 + Math.random() * 6,
        });
      }
    }
    this.smokeParticles = this.smokeParticles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.018;
      p.size += 0.2;
      return p.life > 0;
    });
  }

  /**
   * Move the car one tick.
   * @param canEnterIntersection - whether the car can enter the intersection
   * @param otherCars - for leader-following (solution mode)
   * @param collisionMode - if true, check physical overlaps
   */
  update(canEnterIntersection: boolean, otherCars: Car[] = [], collisionMode = false) {
    if (this.state === "broken" || this.state === "done") {
      this.updateSmoke();
      return;
    }

    const cfg = LANE_CONFIG[this.direction];

    // ── COLLISION MODE (deadlock sim): detect overlap with others ──
    if (collisionMode) {
      for (const other of otherCars) {
        if (other.id === this.id) continue;
        if (other.state === "broken" || other.state === "done") continue;
        if (this.overlaps(other)) {
          this.markBroken();
          other.markBroken();
          this.updateSmoke();
          return;
        }
      }
    }

    // ── SOLUTION MODE: stop behind leader on same lane ──
    const sameDir = otherCars.filter(
      c => c.id !== this.id && c.direction === this.direction &&
           c.state !== "done" && c.state !== "broken"
    );

    // Find the closest car ahead on the same lane
    let minGap = Infinity;
    for (const leader of sameDir) {
      const myPos  = cfg.axis === "y" ? this.y  : this.x;
      const ledPos = cfg.axis === "y" ? leader.y : leader.x;
      const gap    = (ledPos - myPos) * cfg.dir; // positive = leader is ahead
      if (gap > 0 && gap < minGap) minGap = gap;
    }
    // Gap seguro: metade do carro atual + metade do carro da frente + espaço de segurança
    const SAFE_GAP = CAR_BODY_LEN + 15;
    if (minGap < SAFE_GAP) {
      this.state = "waiting";
      this.waitTime++;
      this.updateSmoke();
      return;
    }

    // ── STOP AT RED / STOP LINE ──
    const dist = this.distToStopLine();
    const stopBuffer = this.speed + 2;
    if (dist > 0 && dist < stopBuffer && !this.isPastStopLine() && !canEnterIntersection) {
      // Para completamente antes da linha de parada (comprimento total do carro + margem de segurança)
      const stopOffset = CAR_BODY_LEN + 12;
      if (cfg.axis === "y") this.y = cfg.stopLine - cfg.dir * stopOffset;
      else                   this.x = cfg.stopLine - cfg.dir * stopOffset;
      this.state = "waiting";
      this.waitTime++;
      this.updateSmoke();
      return;
    }

    // ── MOVE ──
    if (cfg.axis === "y") this.y += cfg.dir * this.speed;
    else                   this.x += cfg.dir * this.speed;

    if (this.isInIntersection()) this.state = "crossing";
    else if (this.state !== "crossing") this.state = "moving";

    if (this.isOffScreen()) this.state = "done";

    this.updateSmoke();
  }
}
