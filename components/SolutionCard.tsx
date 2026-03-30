"use client";

import { motion } from "framer-motion";
import { Lightbulb, Shield, Lock } from "lucide-react";

export function SolutionCard() {
  const steps = [
    {
      icon: <Lightbulb className="w-5 h-5 text-accent-north" />,
      title: "Semáforos",
      description: "Controle de fluxo alternado entre direções perpendiculares",
    },
    {
      icon: <Lock className="w-5 h-5 text-accent-east" />,
      title: "Exclusão Mútua",
      description: "Apenas um grupo de carros pode acessar a região crítica",
    },
    {
      icon: <Shield className="w-5 h-5 text-accent-south" />,
      title: "Prevenção",
      description: "Eliminação das 4 condições necessárias para deadlock",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-xl border border-border p-6"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Estratégias de Solução
      </h3>

      <div className="space-y-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="p-2 rounded-lg bg-card border border-border">
              {step.icon}
            </div>
            <div>
              <h4 className="font-medium text-foreground">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
