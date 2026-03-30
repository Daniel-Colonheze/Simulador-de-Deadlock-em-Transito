// ===================================================================
// SIMULACAO DE TRANSITO - CONCORRENCIA, EXCLUSAO MUTUA E DEADLOCK
// ===================================================================
// Autor: Aluno
// Disciplina: Sistemas Operacionais
// 
// Este programa simula a travessia de carros em um cruzamento,
// demonstrando o problema de deadlock e uma solução baseada em 
// ordem fixa de aquisição de locks.
// 
// Conceitos aplicados:
// - Concorrência: múltiplos carros (threads) executando simultaneamente.
// - Recurso compartilhado: o cruzamento (representado por dois locks).
// - Exclusão mútua: semáforos binários (locks) que permitem acesso
//   de apenas um carro por vez a cada eixo.
// - Prevenção de deadlock: ordem fixa de aquisição dos locks.
// ===================================================================

// =============================
// 1. SEMÁFORO BINÁRIO (LOCK)
// =============================
// Implementa um mecanismo de exclusão mútua (mutex) usando fila de espera.
// É a base para controlar o acesso aos eixos do cruzamento.
class Semaphore {
  constructor() {
    this.locked = false;    // false = livre, true = ocupado
    this.queue = [];        // fila de promessas aguardando o lock
  }

  // Método assíncrono para adquirir o lock.
  // Se o lock estiver livre, ele é ocupado imediatamente.
  // Caso contrário, a chamada fica aguardando na fila até ser liberado.
  async acquire() {
    if (!this.locked) {
      this.locked = true;
      return;
    }
    // Cria uma nova Promise que só será resolvida quando o lock for liberado
    return new Promise(resolve => {
      this.queue.push(resolve);
    });
  }

  // Libera o lock. Se houver alguém na fila, o próximo é chamado.
  // Caso contrário, o lock volta ao estado livre.
  release() {
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      next();  // acorda a promise que estava esperando
    } else {
      this.locked = false;
    }
  }
}

// =============================
// 2. CLASSE CARRO (THREAD)
// =============================
// Cada carro representa uma thread concorrente que tenta atravessar o cruzamento.
// Para isso, ele precisa adquirir dois locks: um para o eixo NS e outro para o EW.
// A ordem de aquisição determina se haverá deadlock ou não.
class Carro {
  // Parâmetros:
  //   id: identificador numérico do carro
  //   direcao: 'NS' (norte-sul) ou 'EW' (leste-oeste)
  //   lockNS, lockEW: referências para os semáforos compartilhados
  //   evitarDeadlock: booleano que indica se deve usar ordem fixa (prevenção)
  constructor(id, direcao, lockNS, lockEW, evitarDeadlock = false) {
    this.id = id;
    this.direcao = direcao;
    this.lockNS = lockNS;
    this.lockEW = lockEW;
    this.evitarDeadlock = evitarDeadlock;
  }

  // Método principal que simula a travessia do cruzamento.
  // É executado de forma assíncrona para permitir concorrência.
  async atravessar() {
    console.log(`Carro ${this.id} (${this.direcao}) chegou ao cruzamento.`);

    // -------------------------------------------------
    // AQUISIÇÃO DOS LOCKS (SEÇÃO DE ENTRADA)
    // -------------------------------------------------
    if (this.evitarDeadlock) {
      // ========== PREVENÇÃO DE DEADLOCK ==========
      // Estratégia: ordem fixa de aquisição (sempre lockNS primeiro, depois lockEW).
      // Isso elimina a espera circular, pois todos os carros seguem a mesma ordem.
      await this.lockNS.acquire();
      console.log(`   Carro ${this.id} adquiriu lockNS (ordem fixa).`);
      await this.lockEW.acquire();
      console.log(`   Carro ${this.id} adquiriu lockEW.`);
    } else {
      // ========== CENÁRIO COM DEADLOCK ==========
      // Carros NS adquirem lockNS primeiro, depois lockEW.
      // Carros EW adquirem lockEW primeiro, depois lockNS.
      // Isso cria uma espera circular: NS segura lockNS e espera lockEW,
      // enquanto EW segura lockEW e espera lockNS → deadlock.
      if (this.direcao === 'NS') {
        await this.lockNS.acquire();
        console.log(`   Carro ${this.id} adquiriu lockNS.`);
        // Pequeno atraso para aumentar a probabilidade de deadlock
        await new Promise(r => setTimeout(r, 10));
        await this.lockEW.acquire();
        console.log(`   Carro ${this.id} adquiriu lockEW.`);
      } else { // direcao 'EW'
        await this.lockEW.acquire();
        console.log(`   Carro ${this.id} adquiriu lockEW.`);
        await new Promise(r => setTimeout(r, 10));
        await this.lockNS.acquire();
        console.log(`   Carro ${this.id} adquiriu lockNS.`);
      }
    }

    // -------------------------------------------------
    // SEÇÃO CRÍTICA: atravessando o cruzamento
    // -------------------------------------------------
    // Neste ponto, o carro possui ambos os locks e pode usar o cruzamento
    // com exclusividade. Nenhum outro carro pode atravessar ao mesmo tempo.
    console.log(`   [OK] Carro ${this.id} esta ATRAVESSANDO o cruzamento!`);
    await new Promise(r => setTimeout(r, 50)); // simula o tempo de travessia
    console.log(`   [FIM] Carro ${this.id} atravessou completamente.`);

    // -------------------------------------------------
    // LIBERAÇÃO DOS LOCKS (SEÇÃO DE SAÍDA)
    // -------------------------------------------------
    // Libera na ordem inversa da aquisição (boa prática, mas não obrigatória)
    this.lockEW.release();
    this.lockNS.release();
  }

  // Método que inicia a thread do carro.
  // Usamos setTimeout para simular concorrência real (não bloqueia o event loop).
  run() {
    setTimeout(async () => {
      try {
        await this.atravessar();
      } catch (err) {
        console.error(`Erro no carro ${this.id}:`, err);
      }
    }, 0);
  }
}

// =============================
// 3. FUNÇÃO DE SIMULAÇÃO
// =============================
// Executa uma simulação completa com 5 carros, podendo ativar ou não
// a prevenção de deadlock. Os semáforos são criados localmente para
// garantir que cada simulação seja independente.
async function executarSimulacao(evitarDeadlock) {
  // Cabeçalho da simulação
  console.log(`\n${'='.repeat(60)}`);
  if (evitarDeadlock) {
    console.log("SIMULACAO COM PREVENCAO DE DEADLOCK (ordem fixa NS -> EW)");
  } else {
    console.log("SIMULACAO SEM PREVENCAO (deadlock esperado)");
  }
  console.log(`${'='.repeat(60)}`);

  // ==================================================
  // RECURSOS COMPARTILHADOS (criados a cada simulação)
  // ==================================================
  // Importante: criar novos semáforos evita que locks ocupados
  // na simulação anterior interfiram na atual.
  const lockNS = new Semaphore();  // controla eixo norte-sul
  const lockEW = new Semaphore();  // controla eixo leste-oeste

  // Contador de carros que conseguiram atravessar (estatística)
  let carrosPassaram = 0;
  // Lock adicional para proteger o contador (evita condição de corrida)
  const lockStats = new Semaphore();

  // ==================================================
  // CRIAÇÃO DOS CARROS (THREADS)
  // ==================================================
  // Criamos 5 carros (mínimo exigido pelo professor é 3)
  // Alternamos as direções para garantir que ambos os eixos sejam usados.
  const carros = [];
  for (let i = 1; i <= 5; i++) {
    const direcao = (i % 2 === 0) ? 'NS' : 'EW';
    const carro = new Carro(i, direcao, lockNS, lockEW, evitarDeadlock);
    carros.push(carro);
  }

  // ==================================================
  // WRAPPER PARA ATUALIZAR ESTATÍSTICAS
  // ==================================================
  // Função que incrementa o contador de forma segura (protegida por lock)
  const incrementarPassaram = async () => {
    await lockStats.acquire();
    carrosPassaram++;
    lockStats.release();
  };

  // Modificamos o método atravessar de cada carro para que, ao final,
  // ele automaticamente atualize a estatística. Isso mantém o código limpo.
  for (let carro of carros) {
    const originalAtravessar = carro.atravessar.bind(carro);
    carro.atravessar = async function() {
      await originalAtravessar();
      await incrementarPassaram();
    };
  }

  // ==================================================
  // INÍCIO DA EXECUÇÃO CONCORRENTE
  // ==================================================
  // Disparamos todos os carros (threads) simultaneamente.
  carros.forEach(carro => carro.run());

  // ==================================================
  // ESPERA PARA AS THREADS TERMINAREM
  // ==================================================
  // Aguardamos 2 segundos. No cenário com prevenção, todos os carros
  // completam a travessia nesse tempo. No cenário com deadlock,
  // alguns ficarão eternamente esperando (mas o timeout encerra a simulação).
  await new Promise(resolve => setTimeout(resolve, 2000));

  // ==================================================
  // RESULTADOS
  // ==================================================
  const carrosNaoAtravessaram = 5 - carrosPassaram;
  console.log(`\nRESULTADOS:`);
  console.log(`   Carros que atravessaram: ${carrosPassaram}`);
  if (!evitarDeadlock && carrosNaoAtravessaram > 0) {
    console.log(`   [ALERTA] Carros travados (deadlock): ${carrosNaoAtravessaram}`);
    console.log(`   DEADLOCK OCORREU! Espera circular detectada.`);
  } else if (evitarDeadlock && carrosNaoAtravessaram === 0) {
    console.log(`   NENHUM DEADLOCK! Todos os carros atravessaram.`);
  } else {
    console.log(`   Carros nao atravessaram: ${carrosNaoAtravessaram}`);
  }
  console.log(`${'='.repeat(60)}\n`);
}

// =============================
// 4. EXECUÇÃO PRINCIPAL
// =============================
// Aqui rodamos as duas simulações: uma sem prevenção e outra com prevenção.
// A ordem permite comparar os resultados.
(async () => {
  console.log("=== SIMULACAO DE CONCORRENCIA EM CRUZAMENTO ===");
  console.log("Recursos compartilhados: locks NS e EW (exclusao mutua)\n");

  // Primeira simulação: sem prevenção → deve ocorrer deadlock
  await executarSimulacao(false);

  // Segunda simulação: com prevenção → todos os carros atravessam
  await executarSimulacao(true);

  console.log("Fim da simulacao.");
})();