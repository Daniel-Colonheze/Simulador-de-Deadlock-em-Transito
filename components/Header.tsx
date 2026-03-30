"use client";

import { motion } from "framer-motion";
import { Car, Cpu, AlertTriangle } from "lucide-react";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="p-3 bg-gradient-to-br from-accent-north to-accent-east rounded-xl"
            >
              <Car className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Simulador de{" "}
                <span className="text-gradient">Deadlock</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Concorrência em Sistemas Distribuídos
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Cpu className="w-4 h-4" />
              <span>Programação Concorrente</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="w-4 h-4 text-accent-north" />
              <span>Detecção de Deadlock</span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
