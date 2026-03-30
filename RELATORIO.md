# Relatório Técnico – Implementação do Simulador de Deadlock em Trânsito

## 1. Estrutura da Concorrência

- **Classe `Car`**: representa cada veículo. Possui estado (`moving`, `waiting`, `crossing`, `broken`, `done`), posição, velocidade e direção.  
- **Classe `Simulation`**: gerencia um array `cars[]` e, a cada `tick` (60 FPS), chama `car.update()` para todos os carros ativos.  
- **Concorrência simulada**: não há threads reais; a simultaneidade é obtida pelo loop contínuo de atualização, onde todos os carros agem no mesmo instante lógico, compartilhando o mesmo recurso (o cruzamento).

## 2. Recurso Compartilhado e Seção Crítica

- **Recurso compartilhado**: o cruzamento (interseção das faixas).  
- **Seção crítica**: o trecho de código que decide se um carro pode entrar no cruzamento.  
- **Método `_canEnter(car)`** – analisa duas condições:  
  1. O semáforo da direção está verde? (lock disponível)  
  2. Não há carro de direção perpendicular já dentro do cruzamento?  

private _canEnter(car: Car): boolean {
  if (this.mode === "deadlock") return true;
  const acquired = this.lights[car.direction].acquire();
  if (!acquired) return false;
  const crossingOccupied = this.cars.some(c =>
    c !== car && c.state !== "done" && c.isInIntersection() &&
    this._directionsCross(car.direction, c.direction)
  );
  if (crossingOccupied) {
    this.lights[car.direction].release();
    return false;
  }
  return true;
}
3. Mecanismo de Sincronização – Semáforos Binários
Classe TrafficLight (semáforo binário com temporização automática):

state: "red", "yellow", "green"

acquire(): retorna true apenas se state === "green" (lock disponível).

release(): força o estado para "red", liberando o lock.

Onde o lock é adquirido?

No início de _canEnter(), chamando this.lights[dir].acquire().

Onde o lock é liberado?

Se o cruzamento estiver ocupado por carro perpendicular, release() é chamado imediatamente.

Quando o semáforo troca de grupo (ex.: NS → EW), release() é chamado para todas as direções do grupo que fica vermelho.

Quando um carro é removido (state === "done"), release() é chamado para sua direção.

typescript
// Liberação na troca de grupo (dentro de _updateLights)
this.lights["north"].release();
this.lights["south"].release();
Isso garante exclusão mútua na seção crítica – nenhum carro de direção cruzada pode estar no cruzamento ao mesmo tempo.

4. Prevenção de Deadlock
Estratégia utilizada: ordem fixa de aquisição de recursos, implementada via agrupamento de direções.

Grupo NS: Norte e Sul – compartilham o mesmo semáforo lógico (verdes juntos).

Grupo EW: Leste e Oeste – verdes juntos.

Nunca os dois grupos estão verdes simultaneamente.

No código, o método _updateLights() alterna entre os grupos:

typescript
if (this.activeGroup === "ns") {
  // libera NS, adquire EW
  this.lights["north"].release();
  this.lights["south"].release();
  this.lights["east"].setGreen();
  this.lights["west"].setGreen();
  this.activeGroup = "ew";
} else {
  // libera EW, adquire NS
  this.lights["east"].release();
  this.lights["west"].release();
  this.lights["north"].setGreen();
  this.lights["south"].setGreen();
  this.activeGroup = "ns";
}
Por que isso previne deadlock?

Carros do mesmo grupo não competem entre si (trajetórias paralelas).

Carros de grupos diferentes nunca estão ativos ao mesmo tempo → impossível haver espera circular.

A aquisição de locks segue uma ordem determinística: primeiro NS, depois EW, repetidamente.

5. Tratamento do Modo Deadlock (para demonstração)
Quando mode === "deadlock", a função _canEnter retorna sempre true, ignorando semáforos e prevenção. O método car.update recebe collisionMode = true, o que faz os carros verificarem sobreposição direta (colisão) e travarem o sistema. Isso evidencia a necessidade da sincronização.

6. Código Comentado
Todos os pontos críticos possuem comentários explicativos, tanto em TrafficLight.ts quanto em simulation.ts. Exemplo no topo da classe Simulation:

typescript
/**
 * ESTRATÉGIA DE PREVENÇÃO DE DEADLOCK:
 * - Semáforos agrupados: Norte+Sul juntos, Leste+Oeste juntos.
 * - Carros de eixos opostos podem passar simultaneamente.
 * - Carros perpendiculares nunca estão verdes ao mesmo tempo.
 * - Equivalente a ordem fixa de aquisição de recursos.
 */
7. Execução e Verificação
Modo solution: nunca ocorre deadlock; os carros respeitam semáforos e a ordem de passagem.

Modo deadlock: ocorrem colisões e eventualmente o sistema trava (deadlock detectado).

A interface web mostra estatísticas em tempo real; o script autônomo simulacao.js reproduz a mesma lógica no terminal.

Conclusão: O código implementa corretamente concorrência, exclusão mútua com semáforos e uma estratégia eficaz de prevenção de deadlock, atendendo a todos os requisitos do trabalho.

text

Salve como `RELATORIO.md` na raiz do projeto. Ele contém apenas a descrição técnica do código, sem referências externas ou informações repetidas do README.
faça a versão em inglês tbm
We need to provide English version of the technical report (RELATORIO.md) as requested. The user wants an English version of the code-focused report. We'll produce it in the same style, without references or README content.

Aqui está a versão em inglês do relatório técnico focado apenas no código. Salve como REPORT.md (ou mantenha RELATORIO.md em português e crie REPORT.md em inglês).

markdown
# Technical Report – Traffic Deadlock Simulator Implementation

## 1. Concurrency Structure

- **`Car` class**: represents each vehicle. Contains state (`moving`, `waiting`, `crossing`, `broken`, `done`), position, speed, and direction.
- **`Simulation` class**: manages an array `cars[]` and at each tick (60 FPS) calls `car.update()` for all active cars.
- **Simulated concurrency**: no real threads; simultaneity is achieved by a continuous update loop where all cars act at the same logical instant, sharing the same resource (the intersection).

## 2. Shared Resource and Critical Section

- **Shared resource**: the intersection (crossing of lanes).
- **Critical section**: the code block that decides whether a car may enter the intersection.
- **`_canEnter(car)` method** – checks two conditions:
  1. Is the traffic light green for that direction? (lock available)
  2. Is there no perpendicular direction car already inside the intersection?


private _canEnter(car: Car): boolean {
  if (this.mode === "deadlock") return true;
  const acquired = this.lights[car.direction].acquire();
  if (!acquired) return false;
  const crossingOccupied = this.cars.some(c =>
    c !== car && c.state !== "done" && c.isInIntersection() &&
    this._directionsCross(car.direction, c.direction)
  );
  if (crossingOccupied) {
    this.lights[car.direction].release();
    return false;
  }
  return true;
}
3. Synchronization Mechanism – Binary Semaphores
TrafficLight class (binary semaphore with automatic timing):

state: "red", "yellow", "green"

acquire(): returns true only if state === "green" (lock available).

release(): forces state to "red", releasing the lock.

Where is the lock acquired?

At the beginning of _canEnter(), calling this.lights[dir].acquire().

Where is the lock released?

If the intersection is occupied by a perpendicular car, release() is called immediately.

When the traffic light switches groups (e.g., NS → EW), release() is called for all directions in the group turning red.

When a car is removed (state === "done"), release() is called for its direction.

typescript
// Release during group switch (inside _updateLights)
this.lights["north"].release();
this.lights["south"].release();
This ensures mutual exclusion in the critical section – no perpendicular car can be inside the intersection at the same time.

4. Deadlock Prevention
Strategy used: fixed-order resource acquisition, implemented via direction grouping.

NS group: North and South – share the same logical light (green together).

EW group: East and West – green together.

The two groups are never green simultaneously.

In code, the _updateLights() method alternates between groups:

typescript
if (this.activeGroup === "ns") {
  // release NS, acquire EW
  this.lights["north"].release();
  this.lights["south"].release();
  this.lights["east"].setGreen();
  this.lights["west"].setGreen();
  this.activeGroup = "ew";
} else {
  // release EW, acquire NS
  this.lights["east"].release();
  this.lights["west"].release();
  this.lights["north"].setGreen();
  this.lights["south"].setGreen();
  this.activeGroup = "ns";
}
Why does this prevent deadlock?

Cars in the same group do not compete with each other (parallel trajectories).

Cars from different groups are never active at the same time → circular wait is impossible.

Lock acquisition follows a deterministic order: first NS, then EW, repeatedly.

5. Deadlock Mode (for demonstration)
When mode === "deadlock", the _canEnter function always returns true, ignoring lights and prevention. The car.update method receives collisionMode = true, causing cars to check direct overlap (collision) and eventually freeze the system. This demonstrates the need for synchronization.

6. Commented Code
All critical points have explanatory comments, both in TrafficLight.ts and simulation.ts. Example at the top of the Simulation class:

typescript
/**
 * DEADLOCK PREVENTION STRATEGY:
 * - Lights grouped: North+South together, East+West together.
 * - Opposite‑axis cars can pass simultaneously.
 * - Perpendicular cars are never green at the same time.
 * - Equivalent to fixed‑order resource acquisition.
 */
7. Execution and Verification
Solution mode: never deadlocks; cars respect lights and passing order.

Deadlock mode: collisions occur and eventually the system freezes (deadlock detected).

The web interface shows real‑time statistics; the standalone script simulacao.js reproduces the same logic in the terminal.
