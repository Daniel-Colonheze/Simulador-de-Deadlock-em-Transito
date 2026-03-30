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

/**
 * ESTRATÉGIA DE PREVENÇÃO DE DEADLOCK:
 * - Os semáforos são agrupados: Norte+Sul ficam verdes juntos, Leste+Oeste juntos.
 * - Carros de eixos opostos (Norte/Sul ou Leste/Oeste) podem passar simultaneamente,
 *   pois não competem pelo mesmo espaço físico (não causam deadlock).
 * - Carros de direções perpendiculares NUNCA estão verdes ao mesmo tempo,
 *   eliminando a possibilidade de espera circular (condição necessária para deadlock).
 * - Isso equivale a uma ordem fixa de aquisição de recursos: primeiro o grupo NS,
 *   depois o grupo EW (ou vice-versa). O semáforo funciona como um lock binário
 *   que é adquirido (acquire()) antes de entrar no cruzamento e liberado
 *   (release()) quando o carro sai ou quando o ciclo do semáforo muda.
 */
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
      // Switch group – libera os locks do grupo anterior e adquire os do próximo
      if (this.activeGroup === "ns") {
        // Libera (release) os semáforos de NS
        this.lights["north"].release();
        this.lights["south"].release();
        // Adquire (acquire) os de EW (tornam-se verdes)
        this.lights["east"].setGreen();
        this.lights["west"].setGreen();
        this.activeGroup = "ew";
      } else {
        // Libera os de EW
        this.lights["east"].release();
        this.lights["west"].release();
        // Adquire os de NS
        this.lights["north"].setGreen();
        this.lights["south"].setGreen();
        this.activeGroup = "ns";
      }
      this.cyclePhase = "green";
      this.groupTimer = 0;
    }
  }

  // Verifica se duas direções são perpendiculares (cruzam)
  private _directionsCross(d1: Direction, d2: Direction): boolean {
    const ns = ['north', 'south'];
    const ew = ['east', 'west'];
    return (ns.includes(d1) && ew.includes(d2)) || (ew.includes(d1) && ns.includes(d2));
  }

  /**
   * Verifica se um carro pode entrar no cruzamento.
   * Implementa exclusão mútua usando o semáforo (lock) da direção.
   */
  private _canEnter(car: Car): boolean {
    if (this.mode === "deadlock") return true;

    // Tenta adquirir o lock do semáforo da direção do carro
    const acquired = this.lights[car.direction].acquire();
    if (!acquired) return false;

    // Verifica se há carro de direção cruzada já no cruzamento
    const crossingOccupied = this.cars.some(c =>
      c !== car && c.state !== "done" && c.isInIntersection() &&
      this._directionsCross(car.direction, c.direction)
    );

    if (crossingOccupied) {
      // Se ocupado, libera o lock imediatamente (não vai entrar)
      this.lights[car.direction].release();
      return false;
    }
    // Lock adquirido com sucesso e cruzamento livre – o carro pode entrar
    return true;
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

    // Update lights (apenas no modo solução)
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

    // Remove carros concluídos e libera o lock da direção (se ainda estiver adquirido)
    this.cars = this.cars.filter(c => {
      if (c.state === "done") {
        this.carsCompleted++;
        // Libera o lock associado à direção do carro que saiu
        // (importante para evitar que o semáforo fique permanentemente vermelho)
        this.lights[c.direction].release();
        return false;
      }
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