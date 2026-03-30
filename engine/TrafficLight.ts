import type { Direction } from "./constants";

export type TrafficLightState = "red" | "yellow" | "green";

/**
 * Classe que representa um semáforo de trânsito.
 * Funciona como um lock binário (mutex) para controlar o acesso ao cruzamento.
 * A estratégia de prevenção de deadlock é implementada no nível da simulação
 * (agrupamento Norte-Sul / Leste-Oeste), mas este semáforo fornece a base.
 */
export class TrafficLight {
  direction: Direction;
  state: TrafficLightState;
  timer: number;
  GREEN_DUR: number;   // duração do verde (ticks)
  YELLOW_DUR: number;  // duração do amarelo (ticks)

  constructor(direction: Direction) {
    this.direction = direction;
    this.state = "red";        // começa vermelho (recurso indisponível)
    this.timer = 0;
    this.GREEN_DUR = 200;
    this.YELLOW_DUR = 45;
  }

  /**
   * Adquire o lock (verde) – permite acesso ao recurso compartilhado.
   * Equivalente a sem_wait() em um semáforo binário.
   * @returns true se conseguiu adquirir (sempre verdade aqui, pois o ciclo é externo)
   */
  acquire(): boolean {
    if (this.state === "green") {
      // Em um sistema real, isso seria uma operação atômica.
      // Nossa simulação já garante que apenas carros com verde entram.
      return true;
    }
    return false;
  }

  /**
   * Libera o lock (vermelho) – torna o recurso indisponível.
   * Equivalente a sem_post() em um semáforo binário.
   * Na prática, a troca de estado é feita pelo ciclo automático,
   * mas este método existe para clareza conceitual.
   */
  release(): void {
    this.setRed();
  }

  /**
   * Força o estado para verde (lock liberado para uma direção).
   */
  setGreen(): void {
    this.state = "green";
    this.timer = 0;
  }

  /**
   * Força o estado para vermelho (lock adquirido, recurso bloqueado).
   */
  setRed(): void {
    this.state = "red";
    this.timer = 0;
  }

  /**
   * Verifica se o semáforo está verde (recurso disponível).
   */
  isGreen(): boolean {
    return this.state === "green";
  }

  /**
   * Verifica se o semáforo está vermelho (recurso ocupado).
   */
  isRed(): boolean {
    return this.state === "red";
  }

  /**
   * Atualiza o temporizador do semáforo, alternando entre verde, amarelo e vermelho.
   * Esta é a lógica de ciclo que simula a liberação periódica do recurso.
   */
  update(): void {
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