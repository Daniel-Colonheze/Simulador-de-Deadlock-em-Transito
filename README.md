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

⭐ Acknowledgements
Professors and peers who discussed deadlock solutions.

Next.js and Tailwind CSS communities for excellent documentation.

Vercel for seamless deployment.

<hr style="border-top: 3px solid #ccc; margin: 40px 0;" />
<a name="versão-em-português"></a>
