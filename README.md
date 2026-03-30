# 🚦 Traffic Deadlock Simulator — Simulador de Deadlock em Trânsito

🇺🇸 [English version](#english-version) | 🇧🇷 [Versão em português](#versão-em-português)

---

<a name="english-version"></a>
## 🇺🇸 English Version

[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC)](https://tailwindcss.com/)

An interactive simulation of the classic **deadlock** problem applied to a traffic intersection — where cars compete for crossing rights and can lock the entire system. The project implements a **traffic light** solution to prevent collisions and deadlocks.

> ⚠️ **Honest note:** A good part of this project was **vibe coded** with AI assistance. That said, it was a real opportunity to practice and test my skills in **React**, **Tailwind CSS**, and **TypeScript** — and I also got to learn how to work with **HTML5 Canvas**, which was completely new to me.

---

## 🧠 About the Problem

The simulation models an intersection where cars arrive from four directions (North, South, East, West) and attempt to cross. 

- In **deadlock mode**, cars obey no rules — they enter freely and may collide or block each other, freezing the entire system.
- In **solution mode**, a traffic light system coordinates the crossing, allowing safe flow and preventing deadlocks.

This is analogous to the classic **Dining Philosophers Problem**, where shared resources (intersection lanes) cause circular waiting without a proper control mechanism.

---

## 🎯 Features

- 🔁 **Two simulation modes**:
  - `deadlock` — no control, cars enter freely and may collide or freeze the system.
  - `solution` — traffic lights control entry, preventing deadlocks.
- 🚦 **Custom traffic lights** — vertical for North/South, horizontal for East/West, with correct color orientation facing incoming cars.
- 🚗 **Cars with collision detection and queue behavior** — respect stop lines and only proceed when the light is green and the intersection is clear.
- 📊 **Real-time statistics** — cars completed, waiting, broken, and crossing. Deadlock indicator with visual effects.
- 📱 **Responsive design** — canvas automatically resizes to fit any screen (mobile, tablet, desktop).
- 🎨 **Modern dark theme** with Tailwind CSS.
- 🧩 **Icons** from Lucide React (traffic cone in header, custom favicon).

---

## 🛠️ Technologies Used

| Area        | Technology                                              |
|-------------|----------------------------------------------------------|
| Framework   | [Next.js 14](https://nextjs.org/) (App Router)           |
| Language    | [TypeScript](https://www.typescriptlang.org/)            |
| Styling     | [Tailwind CSS](https://tailwindcss.com/)                 |
| Animations  | [Framer Motion](https://www.framer.com/motion/)          |
| Icons       | [Lucide React](https://lucide.dev/)                      |
| Canvas      | Native HTML5 Canvas API                                  |
| Deploy      | [Vercel](https://vercel.com/)                            |

---

## 🚀 How to Run Locally

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Daniel-Colonheze/Simulador-de-Deadlock-em-Transito.git
cd Simulador-de-Deadlock-em-Transito

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

> No environment variables required.

---

## 🧪 How to Use

1. On the homepage, choose between **Deadlock** (no control) or **Solution with Traffic Lights**.
2. Click **Start** to begin the simulation.
3. Watch cars spawn and move through the intersection.
4. In **deadlock mode**, cars will collide and the system may freeze.
5. In **solution mode**, traffic lights coordinate crossing — cars stop at the red line and only proceed when allowed.
6. Use **Pause** and **Reset** to control the simulation at any time.
7. Statistics update in real time every frame.

---

## 📁 Project Structure

```
src/
├── app/                 # App Router (layout, pages)
├── components/          # React components (SimulationCanvas, etc.)
├── engine/              # Core simulation logic
│   ├── simulation.ts    # Simulation class (system control)
│   ├── car.ts           # Car class (movement, collision, state)
│   ├── TrafficLight.ts  # TrafficLight class
│   ├── constants.ts     # Config (dimensions, colors, positions)
│   └── renderer.ts      # Canvas drawing (roads, cars, lights)
├── hooks/               # useSimulation (manages loop and state)
└── public/              # favicon.svg and static files
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or pull requests.

1. Fork the project
2. Create your branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📬 Contact

Developed by **Daniel Colonheze** — [GitHub](https://github.com/Daniel-Colonheze) · [LinkedIn](https://www.linkedin.com/in/daniel-colonheze/)

*Project inspired by the classic Dining Philosophers Problem applied to traffic systems.*

---

---

<a name="versão-em-português"></a>
## 🇧🇷 Versão em Português

[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC)](https://tailwindcss.com/)

Uma simulação interativa do clássico problema de **deadlock** aplicado a um cruzamento de trânsito — onde carros disputam a passagem e podem travar o sistema inteiro. O projeto implementa uma solução com **semáforos** para evitar colisões e impasses.

> ⚠️ **Nota honesta:** Boa parte deste projeto foi **vibe codada** com auxílio de IA. Mesmo assim, foi uma oportunidade real de praticar e testar minhas habilidades em **React**, **Tailwind CSS** e **TypeScript** — e também aprendi a trabalhar com **Canvas do HTML5**, que era completamente novo pra mim.

---

## 🧠 Sobre o Problema

O problema simula um cruzamento onde carros chegam pelas quatro direções (Norte, Sul, Leste, Oeste) e tentam atravessar.

- No **modo deadlock**, os carros não obedecem a nenhuma regra — entram livremente e podem colidir ou se bloquear, paralisando o sistema.
- No **modo solução**, um sistema de semáforos coordena a passagem, permitindo fluxo seguro e evitando impasses.

Este problema é análogo ao **Jantar dos Filósofos**, onde recursos compartilhados (as faixas do cruzamento) causam espera circular sem um mecanismo de controle.

---

## 🎯 Funcionalidades

- 🔁 **Dois modos de simulação**:
  - `deadlock` — sem controle, carros entram livremente e podem colidir ou travar.
  - `solution` — semáforos controlam a entrada, evitando deadlocks.
- 🚦 **Semáforos personalizados** — verticais para Norte/Sul, horizontais para Leste/Oeste, com cores orientadas corretamente para os carros.
- 🚗 **Carros com detecção de colisão e fila** — respeitam a linha de parada e só avançam com sinal verde e cruzamento livre.
- 📊 **Estatísticas em tempo real** — carros completados, aguardando, em colisão e cruzando. Indicador de deadlock com efeito visual.
- 📱 **Design responsivo** — canvas redimensiona automaticamente para qualquer tela (mobile, tablet, desktop).
- 🎨 **Tema escuro moderno** com Tailwind CSS.
- 🧩 **Ícones** da biblioteca Lucide React (cone de trânsito no cabeçalho, favicon personalizado).

---

## 🛠️ Tecnologias Utilizadas

| Área        | Tecnologia                                               |
|-------------|----------------------------------------------------------|
| Framework   | [Next.js 14](https://nextjs.org/) (App Router)           |
| Linguagem   | [TypeScript](https://www.typescriptlang.org/)            |
| Estilização | [Tailwind CSS](https://tailwindcss.com/)                 |
| Animações   | [Framer Motion](https://www.framer.com/motion/)          |
| Ícones      | [Lucide React](https://lucide.dev/)                      |
| Canvas      | API nativa do HTML5                                      |
| Deploy      | [Vercel](https://vercel.com/)                            |

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/Daniel-Colonheze/Simulador-de-Deadlock-em-Transito.git
cd Simulador-de-Deadlock-em-Transito

# 2. Instale as dependências
npm install

# 3. Execute o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

> Não são necessárias variáveis de ambiente.

---

## 🧪 Como Usar

1. Na página inicial, escolha entre **Deadlock** (sem controle) ou **Solução com Semáforos**.
2. Clique em **Iniciar** para começar a simulação.
3. Observe os carros surgindo e se movimentando pelo cruzamento.
4. No **modo deadlock**, os carros irão colidir e o sistema pode travar.
5. No **modo solução**, os semáforos coordenam a passagem — carros param na linha vermelha e só avançam quando permitido.
6. Use **Pausar** e **Reiniciar** para controlar a simulação a qualquer momento.
7. As estatísticas são atualizadas a cada frame em tempo real.

---

## 📁 Estrutura de Pastas

```
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
```

---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

1. Fork o projeto
2. Crie sua branch: `git checkout -b feature/minha-feature`
3. Commit suas mudanças: `git commit -m 'Adiciona nova feature'`
4. Push para a branch: `git push origin feature/minha-feature`
5. Abra um Pull Request

---

## 📬 Contato

Desenvolvido por **Daniel Colonheze** — [GitHub](https://github.com/Daniel-Colonheze) · [LinkedIn](https://www.linkedin.com/in/daniel-colonheze/)

*Projeto inspirado no clássico problema do Jantar dos Filósofos aplicado a sistemas de tráfego.*
