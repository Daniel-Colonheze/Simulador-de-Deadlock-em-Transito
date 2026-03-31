export type Locale = "pt" | "en";

export type TranslationKey =
  // Header
  | "site.title"
  | "site.subtitle"
  | "nav.concurrent"
  | "nav.detection"
  | "button.theme"
  | "button.language"
  // Hero
  | "hero.title"
  | "hero.highlight"
  | "hero.description"
  // Concept Cards
  | "concept.what.title"
  | "concept.what.description"
  | "concept.conditions.title"
  | "concept.conditions.items"
  | "concept.analogy.title"
  | "concept.analogy.description"
  // Simulation - Problem
  | "simulation.problem.section"
  | "simulation.problem.subtitle"
  | "simulation.problem.mode"
  | "simulation.problem.description"
  // Simulation - Solution
  | "simulation.solution.section"
  | "simulation.solution.subtitle"
  | "simulation.solution.mode"
  | "simulation.solution.description"
  // Simulation Controls
  | "simulation.button.start"
  | "simulation.button.pause"
  | "simulation.button.restart"
  // Stats
  | "stat.completed"
  | "stat.waiting"
  | "stat.broken"
  | "stat.crossing"
  | "stat.status"
  | "status.running"
  | "status.stopped"
  | "status.deadlock"
  | "deadlock.alert"
  | "deadlock.message"
  // Diagram
  | "diagram.title"
  | "diagram.description"
  | "diagram.node.north"
  | "diagram.node.east"
  | "diagram.node.south"
  | "diagram.node.west"
  | "diagram.edge.wait"
  // Solution Card
  | "solution.title"
  | "solution.strategy1.title"
  | "solution.strategy1.description"
  | "solution.strategy2.title"
  | "solution.strategy2.description"
  | "solution.strategy3.title"
  | "solution.strategy3.description"
  // Learning Section
  | "learning.title"
  | "learning.concurrent.title"
  | "learning.concurrent.description"
  | "learning.prevention.title"
  | "learning.prevention.description"
  | "learning.note"
  | "learning.reference"
  // Footer
  | "footer.educational"
  | "footer.inspired";

type Translations = Record<Locale, Record<TranslationKey, string>>;

export const translations: Translations = {
  pt: {
    // Header
    "site.title": "Simulador de ",
    "site.subtitle": "Concorrência em Sistemas Distribuídos",
    "nav.concurrent": "Programação Concorrente",
    "nav.detection": "Detecção de Deadlock",
    "button.theme": "Tema",
    "button.language": "Idioma",
    // Hero
    "hero.title": "Entendendo o ",
    "hero.highlight": "Deadlock",
    "hero.description":
      "Uma simulação interativa do problema clássico de concorrência em sistemas operacionais, usando um cenário de trânsito para demonstrar como múltiplos processos podem entrar em deadlock.",
    // Concept Cards
    "concept.what.title": "O que é Deadlock?",
    "concept.what.description":
      "Deadlock é uma situação onde dois ou mais processos ficam bloqueados indefinidamente, cada um esperando por um recurso que está sendo segurado por outro processo.",
    "concept.conditions.title": "Condições Necessárias",
    "concept.conditions.items":
      "Exclusão mútua\nPosse e espera\nSem preempção\nEspera circular",
    "concept.analogy.title": "Analogia com Trânsito",
    "concept.analogy.description":
      "Em um cruzamento, quando quatro carros entram simultaneamente, cada um bloqueia o outro, criando um ciclo de espera onde nenhum consegue avançar.",
    // Simulation - Problem
    "simulation.problem.section": "Cenário do Problema",
    "simulation.problem.subtitle":
      "Sem controle de fluxo - observe como o deadlock ocorre naturalmente",
    "simulation.problem.mode": "Modo: Problema",
    "simulation.problem.description":
      "Carros entram no cruzamento sem coordenação. Quando múltiplos carros ocupam a interseção simultaneamente, ocorre colisão e deadlock.",
    // Simulation - Solution
    "simulation.solution.section": "Cenário com Solução",
    "simulation.solution.subtitle":
      "Com semáforos - controle de fluxo alternado entre direções",
    "simulation.solution.mode": "Modo: Solução",
    "simulation.solution.description":
      "Semáforos controlam o acesso ao cruzamento. Apenas uma direção por vez pode atravessar, eliminando o deadlock.",
    // Controls
    "simulation.button.start": "Iniciar",
    "simulation.button.pause": "Pausar",
    "simulation.button.restart": "Reiniciar",
    // Stats
    "stat.completed": "Carros Completados",
    "stat.waiting": "Aguardando",
    "stat.broken": "Em Colisão",
    "stat.crossing": "Cruzando",
    "stat.status": "Status",
    "status.running": "Executando",
    "status.stopped": "Parado",
    "status.deadlock": "DEADLOCK",
    "deadlock.alert": "DEADLOCK DETECTADO!",
    "deadlock.message": "Todos os carros estão bloqueados uns pelos outros",
    // Diagram
    "diagram.title": "Visualização do Deadlock",
    "diagram.description":
      "Representação do grafo de espera circular que leva ao deadlock",
    "diagram.node.north": "Carro Norte",
    "diagram.node.east": "Carro Leste",
    "diagram.node.south": "Carro Sul",
    "diagram.node.west": "Carro Oeste",
    "diagram.edge.wait": "espera",
    // Solution Card
    "solution.title": "Estratégias de Prevenção",
    "solution.strategy1.title": "Ordenação de Recursos",
    "solution.strategy1.description":
      "Estabelecer uma ordem global para aquisição de recursos evita ciclos.",
    "solution.strategy2.title": "Alocação Preventiva",
    "solution.strategy2.description":
      "Requisitar todos os recursos de uma vez, ou não permitir espera com recursos.",
    "solution.strategy3.title": "Controle de Acesso",
    "solution.strategy3.description":
      "Mecanismos como semáforos limitam o acesso simultâneo a recursos compartilhados.",
    // Learning Section
    "learning.title": "Conceitos Aprendidos",
    "learning.concurrent.title": "Sistemas Concorrentes",
    "learning.concurrent.description":
      "Processos concorrentes competem por recursos compartilhados. Sem mecanismos adequados de sincronização, situações de corrida e deadlock podem ocorrer.",
    "learning.prevention.title": "Prevenção de Deadlock",
    "learning.prevention.description":
      "Estratégias como ordenação de recursos, alocação preventiva e controle de acesso garantem que pelo menos uma das quatro condições de Coffman nunca seja satisfeita.",
    "learning.note": "Nota:",
    "learning.reference":
      "Esta simulação é inspirada no problema clássico dos Filósofos Jantantes, proposto por Edsger Dijkstra em 1965 para ilustrar problemas de sincronização em sistemas concorrentes.",
    // Footer
    "footer.educational": "Projeto Educacional",
    "footer.inspired":
      "Inspirado no Problema dos Filósofos Jantantes de Dijkstra (1965)",
  },
  en: {
    // Header
    "site.title": "Deadlock Simulator",
    "site.subtitle": "Distributed Systems Concurrency",
    "nav.concurrent": "Concurrent Programming",
    "nav.detection": "Deadlock Detection",
    "button.theme": "Theme",
    "button.language": "Language",
    // Hero
    "hero.title": "Understanding ",
    "hero.highlight": "Deadlock",
    "hero.description":
      "An interactive simulation of the classic concurrency problem in operating systems, using a traffic scenario to demonstrate how multiple processes can enter a deadlock state.",
    // Concept Cards
    "concept.what.title": "What is Deadlock?",
    "concept.what.description":
      "Deadlock is a situation where two or more processes become blocked indefinitely, each waiting for a resource held by another process.",
    "concept.conditions.title": "Necessary Conditions",
    "concept.conditions.items":
      "Mutual exclusion\nHold and wait\nNo preemption\nCircular wait",
    "concept.analogy.title": "Traffic Analogy",
    "concept.analogy.description":
      "At an intersection, when four cars enter simultaneously, each blocks the other, creating a waiting cycle where none can proceed.",
    // Simulation - Problem
    "simulation.problem.section": "Problem Scenario",
    "simulation.problem.subtitle":
      "No flow control - watch how deadlock occurs naturally",
    "simulation.problem.mode": "Mode: Problem",
    "simulation.problem.description":
      "Cars enter the intersection without coordination. When multiple cars occupy the intersection simultaneously, collision and deadlock occur.",
    // Simulation - Solution
    "simulation.solution.section": "Solution Scenario",
    "simulation.solution.subtitle":
      "With traffic lights - alternating flow control between directions",
    "simulation.solution.mode": "Mode: Solution",
    "simulation.solution.description":
      "Traffic lights control access to the intersection. Only one direction can cross at a time, eliminating deadlock.",
    // Controls
    "simulation.button.start": "Start",
    "simulation.button.pause": "Pause",
    "simulation.button.restart": "Restart",
    // Stats
    "stat.completed": "Cars Completed",
    "stat.waiting": "Waiting",
    "stat.broken": "In Collision",
    "stat.crossing": "Crossing",
    "stat.status": "Status",
    "status.running": "Running",
    "status.stopped": "Stopped",
    "status.deadlock": "DEADLOCK",
    "deadlock.alert": "DEADLOCK DETECTED!",
    "deadlock.message": "All cars are blocking each other",
    // Diagram
    "diagram.title": "Deadlock Visualization",
    "diagram.description":
      "Representation of the circular wait graph that leads to deadlock",
    "diagram.node.north": "North Car",
    "diagram.node.east": "East Car",
    "diagram.node.south": "South Car",
    "diagram.node.west": "West Car",
    "diagram.edge.wait": "waits for",
    // Solution Card
    "solution.title": "Prevention Strategies",
    "solution.strategy1.title": "Resource Ordering",
    "solution.strategy1.description":
      "Establishing a global order for resource acquisition prevents cycles.",
    "solution.strategy2.title": "Preventive Allocation",
    "solution.strategy2.description":
      "Request all resources at once, or don't allow waiting while holding resources.",
    "solution.strategy3.title": "Access Control",
    "solution.strategy3.description":
      "Mechanisms like semaphores limit simultaneous access to shared resources.",
    // Learning Section
    "learning.title": "Concepts Learned",
    "learning.concurrent.title": "Concurrent Systems",
    "learning.concurrent.description":
      "Concurrent processes compete for shared resources. Without proper synchronization mechanisms, race conditions and deadlocks can occur.",
    "learning.prevention.title": "Deadlock Prevention",
    "learning.prevention.description":
      "Strategies like resource ordering, preventive allocation, and access control ensure that at least one of Coffman's four conditions is never satisfied.",
    "learning.note": "Note:",
    "learning.reference":
      "This simulation is inspired by the classic Dining Philosophers problem, proposed by Edsger Dijkstra in 1965 to illustrate synchronization issues in concurrent systems.",
    // Footer
    "footer.educational": "Educational Project",
    "footer.inspired":
      "Inspired by Dijkstra's Dining Philosophers Problem (1965)",
  },
};
