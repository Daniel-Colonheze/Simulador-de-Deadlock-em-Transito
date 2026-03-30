# 🚦 Traffic Deadlock Simulator / Simulador de Deadlock em Trânsito

🇺🇸 [English version](#english-version) | 🇧🇷 [Versão em português](#versão-em-português)

---

<a name="english-version"></a>
## English Version

[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC)](https://tailwindcss.com/)

An interactive simulation of the classic **deadlock** problem applied to a traffic intersection, where cars compete for crossing and can lock the system. The project implements a **traffic light** solution to avoid collisions and deadlocks.

![Simulation Demo](https://via.placeholder.com/800x400?text=Simulator+Running)  
*(Replace with a screenshot or GIF of your application)*

---

## 🧠 About the Problem

The simulation models an intersection where cars arrive from four directions (North, South, East, West) and attempt to cross. In **deadlock mode**, cars do not obey any rules – they simply enter and may collide or block each other, freezing the system (deadlock). In **solution mode**, a traffic light system coordinates the crossing, allowing safe flow and avoiding deadlocks.

This is analogous to the **Dining Philosophers Problem**, where shared resources (intersection lanes) cause circular waiting without a control mechanism.

---

## 🎯 Features

- 🔁 **Two simulation modes**:
  - `deadlock` – no control, cars enter freely and may collide/deadlock.
  - `solution` – traffic lights control entry, preventing deadlocks.
- 🚦 **Custom traffic lights**:
  - Vertical for North/South, horizontal for East/West.
  - Correct color order (red facing incoming cars).
- 🚗 **Cars with collision detection and queue behavior**:
  - Respect stop lines.
  - Only proceed if light is green **and** intersection is clear.
- 📊 **Real-time statistics**:
  - Cars completed, waiting, broken, crossing.
  - Deadlock indicator with visual effects.
- 📱 **Responsive design**:
  - Canvas automatically resizes to fit any screen (mobile, tablet, desktop).
  - Buttons and stats adapt to screen size.
- 🎨 **Modern dark theme** using Tailwind CSS.
- 🧩 **Icons** from Lucide React (traffic cone in header, custom favicon).

---

## 🛠️ Technologies Used

| Area          | Technology                                                    |
|---------------|---------------------------------------------------------------|
| Framework     | [Next.js 14](https://nextjs.org/) (App Router)                |
| Language      | [TypeScript](https://www.typescriptlang.org/)                 |
| Styling       | [Tailwind CSS](https://tailwindcss.com/)                      |
| Animations    | [Framer Motion](https://www.framer.com/motion/)               |
| Icons         | [Lucide React](https://lucide.dev/)                           |
| Canvas        | Native HTML5 API                                              |
| Deployment    | [Vercel](https://vercel.com/)                                 |

---

## 🚀 How to Run Locally

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Daniel-Colonheze/Simulador-de-Deadlock-em-Transito.git
   cd Simulador-de-Deadlock-em-Transito
Install dependencies

bash
npm install
# or
yarn install
Run the development server

bash
npm run dev
# or
yarn dev
Open in browser

text
http://localhost:3000
The project is configured with Tailwind CSS and TypeScript. No environment variables are required.

🧪 How to Use
On the homepage, you'll see two cards: Deadlock (no control) and Solution with Traffic Lights.

Click Start to begin the simulation.

Watch cars spawn and move.

In deadlock mode, cars will collide and the system may freeze (deadlock).

In solution mode, traffic lights control the crossing – cars stop at the red line and only proceed when allowed.

Use Pause and Reset to control the simulation.

Statistics update every frame.

📁 Project Structure (main)
text
src/
├── app/                 # App Router (layout, pages)
├── components/          # React components (SimulationCanvas, etc.)
├── engine/              # Core simulation logic
│   ├── simulation.ts    # Simulation class (system control)
│   ├── car.ts           # Car class (movement, collision, state)
│   ├── TrafficLight.ts  # TrafficLight class
│   ├── constants.ts     # Configurations (dimensions, colors, positions)
│   └── renderer.ts      # Canvas drawing (roads, cars, lights)
├── hooks/               # useSimulation (manages loop and state)
└── public/              # favicon.svg and static files
🤝 Contributing
Contributions are welcome! Feel free to open issues or pull requests with improvements, fixes, or new features.

Fork the project

Create your feature branch (git checkout -b feature/my-feature)

Commit your changes (git commit -m 'Add some feature')

Push to the branch (git push origin feature/my-feature)

Open a Pull Request

📬 Contact
Developed by Daniel Colonheze – GitHub

Project inspired by the classic Dining Philosophers Problem applied to traffic systems.


Versão em Português
https://img.shields.io/badge/Next.js-14.1.0-black
https://img.shields.io/badge/TypeScript-5.3.0-blue
https://img.shields.io/badge/Tailwind-3.4.1-38B2AC

Uma simulação interativa do clássico problema de deadlock (impasse) aplicado a um cruzamento de trânsito, onde carros disputam a passagem e podem travar o sistema. O projeto implementa uma solução baseada em semáforos para evitar colisões e deadlocks.

https://via.placeholder.com/800x400?text=Simulador+em+Funcionamento
(Substitua por um print ou GIF da sua aplicação)

🧠 Sobre o Problema
O problema simula um cruzamento onde carros chegam pelas quatro direções (Norte, Sul, Leste, Oeste) e tentam atravessar. No modo deadlock, os carros não obedecem a nenhuma regra – eles simplesmente entram e podem colidir ou se bloquear mutuamente, paralisando o sistema (deadlock). No modo solução, um sistema de semáforos coordena a passagem, permitindo fluxo seguro e evitando impasses.

Este problema é análogo ao Jantar dos Filósofos, onde recursos compartilhados (as faixas do cruzamento) causam espera circular se não houver um mecanismo de controle.

🎯 Funcionalidades
🔁 Dois modos de simulação:

deadlock – sem controle, carros entram livremente e podem colidir/travar.

solution – semáforos controlam a entrada, evitando deadlocks.

🚦 Semáforos personalizados:

Verticais para Norte/Sul, horizontais para Leste/Oeste.

Cores com ordem correta (vermelho voltado para os carros).

🚗 Carros com detecção de colisão e comportamento de fila:

Respeitam a linha de parada.

Só avançam se o semáforo estiver verde e o cruzamento estiver livre.

📊 Estatísticas em tempo real:

Carros completados, aguardando, em colisão, cruzando.

Indicador de deadlock com efeito visual.

📱 Design responsivo:

Canvas redimensiona automaticamente para caber em qualquer tela (mobile, tablet, desktop).

Botões e estatísticas se adaptam ao tamanho.

🎨 Tema escuro moderno com Tailwind CSS.

🧩 Ícones da biblioteca Lucide React (cone de trânsito no cabeçalho, favicon personalizado).

🛠️ Tecnologias Utilizadas
Área	Tecnologia
Framework	Next.js 14 (App Router)
Linguagem	TypeScript
Estilização	Tailwind CSS
Animações	Framer Motion
Ícones	Lucide React
Canvas	API nativa do HTML5
Deploy	Vercel
🚀 Como Executar Localmente
Pré-requisitos
Node.js 18.x ou superior

npm ou yarn

Passos
Clone o repositório

bash
git clone https://github.com/Daniel-Colonheze/Simulador-de-Deadlock-em-Transito.git
cd Simulador-de-Deadlock-em-Transito
Instale as dependências

bash
npm install
# ou
yarn install
Execute o servidor de desenvolvimento

bash
npm run dev
# ou
yarn dev
Acesse no navegador

text
http://localhost:3000
O projeto está configurado para usar Tailwind CSS e TypeScript. Não são necessárias variáveis de ambiente.

🧪 Como Usar
Na página inicial, você verá dois cards: Deadlock (sem controle) e Solução com Semáforos.

Clique em Iniciar para começar a simulação.

Observe os carros surgirem e se movimentarem.

No modo deadlock, os carros irão colidir e o sistema pode travar (deadlock).

No modo solução, os semáforos controlam a passagem – carros param na linha vermelha e só avançam quando permitido.

Use Pausar e Reiniciar para controlar a simulação.

As estatísticas são atualizadas a cada frame.

📁 Estrutura de Pastas (principais)
text
src/
├── app/                 # App Router (layout, páginas)
├── components/          # Componentes React (SimulationCanvas, etc.)
├── engine/              # Lógica principal da simulação
│   ├── simulation.ts    # Classe Simulation (controle do sistema)
│   ├── car.ts           # Classe Car (movimento, colisão, estado)
│   ├── TrafficLight.ts  # Classe TrafficLight
│   ├── constants.ts     # Configurações (dimensões, cores, posições)
│   └── renderer.ts      # Desenho no canvas (estradas, carros, semáforos)
├── hooks/               # useSimulation (gerencia loop e estado)
└── public/              # favicon.svg e arquivos estáticos
🤝 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests com melhorias, correções ou novas funcionalidades.

Fork o projeto

Crie sua branch (git checkout -b feature/minha-feature)

Commit suas mudanças (git commit -m 'Adiciona nova feature')

Push para a branch (git push origin feature/minha-feature)

Abra um Pull Request

📬 Contato
Desenvolvido por Daniel Colonheze – GitHub

Projeto inspirado no problema clássico de Jantar dos Filósofos aplicado a sistemas de tráfego.
