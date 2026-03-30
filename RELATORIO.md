📄 Relatório Técnico – Simulador de Deadlock em Trânsito
🌐 Navegação
🇧🇷 Ver versão em Português
🇺🇸 Go to English version
🇧🇷 Versão em Português
1. Estrutura da Concorrência 🧠

O sistema simula concorrência sem utilizar múltiplas threads reais.

Classe Car
Estado (moving, waiting, crossing, broken, done)
Posição, velocidade e direção
Classe Simulation
Gerencia cars[]
Executa loop contínuo (60 FPS)
Atualiza todos os carros
Concorrência simulada
Todos os carros são processados no mesmo instante lógico, competindo pelo cruzamento.
2. Recurso Compartilhado e Seção Crítica 🔒
Recurso: cruzamento
Seção crítica: entrada no cruzamento
private _canEnter(car: Car): boolean {
  if (this.mode === "deadlock") return true;

  const acquired = this.lights[car.direction].acquire();
  if (!acquired) return false;

  const crossingOccupied = this.cars.some(c =>
    c !== car &&
    c.state !== "done" &&
    c.isInIntersection() &&
    this._directionsCross(car.direction, c.direction)
  );

  if (crossingOccupied) {
    this.lights[car.direction].release();
    return false;
  }

  return true;
}
3. Sincronização 🚦

Semáforos binários (TrafficLight):

green → permitido
red → bloqueado
acquire() → tenta entrar
release() → libera recurso
4. Controle de Recursos ⚠️

Evita vazamento de lock:

Falha → libera
Troca de grupo → libera
Carro finaliza → libera

Garantias:

Sem travamento permanente
Sem starvation
5. Prevenção de Deadlock 🔄

Grupos:

NS (Norte/Sul)
EW (Leste/Oeste)

Nunca ativos juntos.

if (this.activeGroup === "ns") {
  this.lights["north"].release();
  this.lights["south"].release();
  this.lights["east"].setGreen();
  this.lights["west"].setGreen();
  this.activeGroup = "ew";
} else {
  this.lights["east"].release();
  this.lights["west"].release();
  this.lights["north"].setGreen();
  this.lights["south"].setGreen();
  this.activeGroup = "ns";
}
6. Modo Deadlock 💥
Ignora semáforos
Carros colidem
Sistema pode travar
7. Execução 📊
Solution → estável
Deadlock → falhas intencionais
8. Conclusão 🎯

O sistema implementa:

Concorrência
Exclusão mútua
Prevenção de deadlock
Controle de recursos
🇺🇸 English Version
1. Concurrency Structure 🧠

The system simulates concurrency without real threads.

Car class
State, position, speed, direction
Simulation class
Manages cars[]
Runs a 60 FPS loop
Updates all cars
Simulated concurrency
All cars act in the same logical instant.
2. Shared Resource and Critical Section 🔒
Resource: intersection
Critical section: access control
private _canEnter(car: Car): boolean {
  if (this.mode === "deadlock") return true;

  const acquired = this.lights[car.direction].acquire();
  if (!acquired) return false;

  const crossingOccupied = this.cars.some(c =>
    c !== car &&
    c.state !== "done" &&
    c.isInIntersection() &&
    this._directionsCross(car.direction, c.direction)
  );

  if (crossingOccupied) {
    this.lights[car.direction].release();
    return false;
  }

  return true;
}
3. Synchronization 🚦

Binary semaphore:

green → allowed
red → blocked
4. Resource Control ⚠️

Prevents lock leakage:

Releases on failure
Releases on switch
Releases on completion
5. Deadlock Prevention 🔄

Groups:

NS (North/South)
EW (East/West)

Never active simultaneously.

6. Deadlock Mode 💥
No synchronization
Collisions occur
System may freeze
7. Execution 📊
Solution mode → stable
Deadlock mode → failure scenario
8. Conclusion 🎯

The system correctly implements:

Concurrency
Mutual exclusion
Deadlock prevention
Resource management
