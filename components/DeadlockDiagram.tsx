"use client";

import { motion } from "framer-motion";
import { ArrowRight, Circle, Square } from "lucide-react";

export function DeadlockDiagram() {
  const cars = [
    { id: "Carro A", dir: "Norte", color: "bg-accent-north", x: 150, y: 50 },
    { id: "Carro B", dir: "Leste", color: "bg-accent-east", x: 250, y: 150 },
    { id: "Carro C", dir: "Sul", color: "bg-accent-south", x: 150, y: 250 },
    { id: "Carro D", dir: "Oeste", color: "bg-accent-west", x: 50, y: 150 },
  ];

  const arrows = [
    { from: 0, to: 1, label: "espera" },
    { from: 1, to: 2, label: "espera" },
    { from: 2, to: 3, label: "espera" },
    { from: 3, to: 0, label: "espera" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-card rounded-xl border border-border p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
        Diagrama de Espera Circular
      </h3>

      <div className="relative w-[300px] h-[300px] mx-auto">
        {/* SVG Arrows */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#FF4560" />
            </marker>
          </defs>
          {arrows.map((arrow, i) => {
            const from = cars[arrow.from];
            const to = cars[arrow.to];
            return (
              <motion.line
                key={i}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2 }}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#FF4560"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            );
          })}
        </svg>

        {/* Cars */}
        {cars.map((car, i) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className={`absolute w-16 h-16 ${car.color} rounded-lg flex flex-col items-center justify-center shadow-lg`}
            style={{ left: car.x - 32, top: car.y - 32 }}
          >
            <Circle className="w-4 h-4 text-white mb-1" />
            <span className="text-xs font-bold text-white">{car.id}</span>
          </motion.div>
        ))}

        {/* Center intersection */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-dashed border-accent-north/50 rounded-lg flex items-center justify-center"
        >
          <Square className="w-6 h-6 text-accent-north/50" />
        </motion.div>
      </div>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>Cada carro espera o outro liberar a via</p>
        <p className="text-accent-north font-medium mt-2">Ciclo de espera circular = Deadlock</p>
      </div>
    </motion.div>
  );
}
