# Claude.md - Simulador de Deadlock em Trânsito (Arquitetura, Stack e Problema)

## Objetivo do Projeto
Desenvolver uma aplicação web interativa que simule um problema clássico de concorrência
conhecido como deadlock utilizando o cenário realista de tráfico em cruzamentos. O objetivo       
é educar usuários sobre a natureza deste conceito e as maneiras possíveis de solucioná-lo         
através da visualização do comportamento dos carros (processos) na presença ou ausência de        
regras de controle, como semáforos.

## Problema a ser Resolvido
O simulador representa um cenário em que vários veículos tentam entrar simultaneamente num        
cruzamento controlado por sinais vermelho e verde (semáforos), levando ao deadlock, onde 
nenhum pode avançar. Essa situação se assemelha ao famoso Problema do Jantar dos Filósofos        
clássico de concorrência em sistemas.

## Arquitetura do Sistema
O simulador é estruturado com base na separação das responsabilidades em camadas, cada uma        
realizando funções distintas:

1. **Camada de Interface (UI)** - gerenciar interações diretas com o usuário através do
navegamento entre diferentes seções da simulação e controle dos elementos visuais como 
botões e animações. Construída em React para oferecer uma experiência nativa no browser e         
facilitar a manipulação de componentes dinâmicos.
   
2. **Camada de Simulação (Lógica)** - encarrega-se das regras que determinam o movimento dos      
carros, detecção de colisões potenciais e gerenciamento da lógica para resolver deadlocks ou      
permitir seu aparecimento. Utiliza TypeScript por sua segurança tipando os dados em fluxo ao      
longo do processo computacional.
   
3. **Camada de Renderização** - responsável pelo desenho dos veículos e da estrutura 
cruzamento, bem como pela animação necessária para criar o impressionante movimento visual        
na simulação realista em tempo real usando a API Canvas HTML5 juntamente com 
`requestAnimationFrame`.
   
## Stack Tecnológica
- **Frontend**: React e TypeScript - oferecem gerenciamento interativo, tipagem estática 
forte e abstrações de POO para construir interfaces flexíveis.
- **Styling**: Tailwind CSS permite o design responsivo rápido com personalizações faciais        
sem aprender a programação do estilo CSS tradicional.
- **Renderização Gráfica (Canvas)** - HTML5 Canvas API para gráficos e animação, utilizando       
`requestAnimationFrame` para harmonia entre navegação de usuário e renderização dos cenários      
complexos da simulação em tempo real sem afetar a performance do browser.
   
## Fluxo da Aplicação
- **Introdução**: Ocorre na primeira tela, com informações explicativas sobre o deadlock 
clássico no cruzamento de tráfego e sua relação com os carros se movendo através do 
simulador.
   
- **Simulação Inicial sem Controle**: Apresenta uma cena inicial onde não há controle por         
meio dos sinais, permitindo que o deadlock aconteça naturalmente na situação projetada pela       
lógica de programação da simulação.
    
- **Solução Visualizada e Comparativa**: Mostra como a introdução do semáforo pode resolver       
ou evitar o deadlock em cenários específicos, permitindo que os usuários visualizem melhores      
resultados através das alterações de configura_parametros da simulação.
    
- **Ajuste e Interação com a Simulação**: Permite ao usuário explorar diferentes variações        
do problema, como alterar o número de veículos ou os sinais para verificar se alterações
resolvem deadlocks. O feedback visual imediato ajuda na compreensão e aprendizado sobre a         
solução adequada em cenários da vida real.
    
## Modelagem Orientada a Objetos
O sistema utiliza uma estrutura de classes para modelar as entidades do mundo reais: 
- `Car` - representa os veículos com atributos como posição, velocidade e direção ao longo        
da simulação. Cada carro é instanciado com um objeto dessa classe para manter o controle
sobre seu estado interno individualmente em toda a aplicação de simulação.
  
- `TrafficLight` - encarregue-se do estado efetivo da luz vermelha ou verde, gerenciando 
transições entre estados que influençam diretamente no fluxo dos veículos na cruzamento ao        
longo de cada simulação.
  
- `Intersection` - encapsula o crossimóvel como um conjunto único para lidar com as colisões      
e permissões do movimento entre os diferentes sinais/traffic lights, que se relacionam 
diretamente com a lógica de deadlocks potenciais.
  
- `Simulation` - é uma classe raiz centralizada que constrói o loop principal da simulação e      
coordena todos os elementos na estrutura MVC para garantir um movimento constante em 
execução sem conflitos no estado dos veículos ou luzes.
  
Esse modelo orientado a objetos facilita reutilização de código, testabilidade unificada e
uma abordagem clara para resolver o problema dentro do projeto web interativa criado.

## Resumo do Frontend

O frontend é uma aplicação **Next.js com React e TypeScript** que oferece uma experiência educativa interativa sobre o conceito de deadlock em sistemas operacionais. A interface é organizada em seções que guiam o usuário através do aprendizado:

### Estrutura da Interface

- **Hero Section**: Apresentação do tema com título animado e explicação do propósito educativo
- **Cards de Conceitos**: Três cards explicativos cobrindo (1) definição de deadlock, (2) condições necessárias (exclusão mútua, posse e espera, sem preempção, espera circular), e (3) analogia com trânsito
- **Simulação do Problema**: Canvas interativo no modo "deadlock" onde carros entram no cruzamento sem coordenação, demonstrando como o deadlock ocorre naturalmente
- **Diagrama e Solução**: Visualização gráfica do problema e cards explicando estratégias de prevenção
- **Simulação da Solução**: Canvas no modo "solution" com semáforos controlando o fluxo alternado
- **Seção de Aprendizado**: Resumo dos conceitos de sistemas concorrentes e prevenção de deadlock

### Componentes Principais

- **`SimulationCanvas`**: Componente central que renderiza a simulação em tempo real usando HTML5 Canvas. Exibe controles de play/pause/reset, estatísticas ao vivo (carros completados, aguardando, em colisão, cruzando), e um overlay visual pulsante quando deadlock é detectado
- **`useSimulation`**: Hook customizado que gerencia o estado da simulação, coordenando o loop de animação via `requestAnimationFrame` e sincronizando estatísticas entre a engine e a UI
- **Componentes Auxiliares**: `ConceptCard`, `DeadlockDiagram`, `SolutionCard`, `Header`, `Footer`

### Funcionalidades Interativas

- **Controles de Simulação**: Botões para iniciar, pausar e reiniciar cada cenário independentemente
- **Estatísticas em Tempo Real**: Acompanhamento dinâmico do estado dos carros na simulação
- **Detecção Visual de Deadlock**: Overlay com efeito de pulsação e mensagem "DEADLOCK DETECTADO!" quando ocorre impasse
- **Design Responsivo**: Interface adaptável a diferentes tamanhos de tela usando Tailwind CSS
- **Animações Suaves**: Transições controladas por Framer Motion para melhor experiência do usuário

## Temas e Internacionalização

### Sistema de Temas (Light/Dark Mode)

O projeto implementa um sistema completo de temas com **variáveis CSS** que se adaptam automaticamente ao modo claro ou escuro:

**Paleta de Cores Natural** (menos "IA", mais terrosa):
- **Light Mode**: Fundo creme (`#faf8f5`), cores terrosas e acentos em tom terra-cota
- **Dark Mode**: Fundo cinza-escuro quente (`#1c1a18`), cores sóbrias e acentos mais suaves

**Implementação**:
- `globals.css`: Define variáveis CSS para ambos os modos usando a classe `.dark`
- `ThemeContext`: Gerencia estado do tema com persistência em localStorage e sincronização com preferência do sistema
- `tailwind.config.ts`: Configurado com `darkMode: "class"` para suportar alternância de classe
- Renderização Canvas: Cores obtidas dinamicamente via `getComputedStyle` para adaptar a simulação ao tema atual

### Internacionalização (i18n)

Sistema de tradução completo suportando **Português (PT)** e **Inglês (EN)**:

**Estrutura**:
- `i18n/translations.ts`: Contém todas as traduções organizadas por chave
- `LocaleContext`: Gerencia estado do idioma com persistência em localStorage e detecção automática do idioma do navegador
- Componentes acessam traduções via hook `useLocale()` com função `t(key)`

**Conteúdo Traduzido**:
- Todo o texto da interface (títulos, descrições, botões)
- Estatísticas da simulação
- Mensagens de alerta (deadlock detectado)
- Conteúdo educacional e referências

**Controles no Header**:
- Botão de tema (sol/lua) para alternar entre light/dark
- Botão de idioma (PT/EN) para alternar entre português e inglês