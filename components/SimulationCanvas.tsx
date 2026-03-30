"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useSimulation } from "@/hooks/useSimulation";
import { SimulationMode } from "@/engine/simulation";
import { W, H } from "@/engine/constants";

interface SimulationCanvasProps {
  mode: SimulationMode;
  title: string;
  description: string;
}

export function SimulationCanvas({ mode, title, description }: SimulationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { running, stats, toggleRun, reset } = useSimulation(mode, canvasRef);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-xl border border-border overflow-hidden shadow-xl"
    >
      {/* Header */}
      <div className="p-6 border-b border-border bg-secondary/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleRun}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                running
                  ? "bg-accent-north/20 text-accent-north hover:bg-accent-north/30"
                  : "bg-accent-south/20 text-accent-south hover:bg-accent-south/30"
              }`}
            >
              {running ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Iniciar</span>
                </>
              )}
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-muted/50 text-foreground hover:bg-muted transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reiniciar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Container */}
      <div className="p-6 bg-background flex justify-center">
        <div className="relative rounded-lg overflow-hidden shadow-2xl border border-border">
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            className="block"
            style={{ maxWidth: "100%", height: "auto" }}
          />

          {/* Deadlock Alert */}
          {stats.deadlocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-accent-north/20 backdrop-blur-sm"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(255, 69, 96, 0.3)",
                    "0 0 40px rgba(255, 69, 96, 0.6)",
                    "0 0 20px rgba(255, 69, 96, 0.3)",
                  ],
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="bg-card border-2 border-accent-north rounded-xl px-8 py-6 text-center"
              >
                <h4 className="text-2xl font-bold text-accent-north mb-2">
                  DEADLOCK DETECTADO!
                </h4>
                <p className="text-foreground/80">
                  Todos os carros estão bloqueados uns pelos outros
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-4 border-t border-border bg-secondary/30">
        <div className="grid grid-cols-5 gap-4">
          <StatCard label="Carros Completados" value={stats.completed} color="text-accent-south" />
          <StatCard label="Aguardando" value={stats.waiting} color="text-accent-west" />
          <StatCard label="Em Colisão" value={stats.broken} color="text-accent-north" />
          <StatCard label="Cruzando" value={stats.crossing} color="text-accent-east" />
          <div className="bg-card rounded-lg p-3 border border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Status</p>
            <p className={`text-lg font-semibold ${stats.deadlocked ? "text-accent-north animate-pulse" : "text-foreground"}`}>
              {stats.deadlocked ? "DEADLOCK" : running ? "Executando" : "Parado"}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  color: string;
}

function StatCard({ label, value, color }: StatCardProps) {
  return (
    <div className="bg-card rounded-lg p-3 border border-border">
      <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
