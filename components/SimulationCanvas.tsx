"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useSimulation } from "@/hooks/useSimulation";
import { SimulationMode } from "@/engine/simulation";
import { W, H } from "@/engine/constants";
import { useLocale } from "@/contexts/LocaleContext";

interface SimulationCanvasProps {
  mode: SimulationMode;
  title: string;
  description: string;
}

export function SimulationCanvas({ mode, title, description }: SimulationCanvasProps) {
  const { t } = useLocale();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const { running, stats, toggleRun, reset } = useSimulation(mode, canvasRef, scale);

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const maxSize = Math.min(containerWidth, 600);
      const newScale = maxSize / W;
      setScale(newScale);
      canvasRef.current.width = W * newScale;
      canvasRef.current.height = H * newScale;
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-xl border border-border overflow-hidden shadow-lg"
    >
      <div className="p-3 sm:p-4 md:p-6 border-b border-border bg-secondary/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-foreground">{title}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleRun}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg font-medium transition-all text-xs sm:text-sm md:text-base ${
                running
                  ? "bg-accent-north/20 text-accent-north hover:bg-accent-north/30"
                  : "bg-accent-south/20 text-accent-south hover:bg-accent-south/30"
              }`}
            >
              {running ? (
                <>
                  <Pause className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{t("simulation.button.pause")}</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{t("simulation.button.start")}</span>
                </>
              )}
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg font-medium bg-muted/50 text-foreground hover:bg-muted transition-all text-xs sm:text-sm md:text-base"
            >
              <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{t("simulation.button.restart")}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-6 bg-background flex justify-center">
        <div
          ref={containerRef}
          className="relative rounded-lg overflow-hidden border border-border w-full max-w-[600px] simulation-drawing-area"
        >
          <canvas ref={canvasRef} className="block w-full h-auto" style={{ aspectRatio: "1 / 1" }} />
          {stats.deadlocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-accent-north/20 backdrop-blur-sm"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(201, 74, 74, 0.3)",
                    "0 0 40px rgba(201, 74, 74, 0.6)",
                    "0 0 20px rgba(201, 74, 74, 0.3)",
                  ],
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="bg-card border-2 border-accent-north rounded-xl px-3 py-2 sm:px-6 sm:py-4 md:px-8 md:py-6 text-center"
              >
                <h4 className="text-sm sm:text-lg md:text-2xl font-bold text-accent-north mb-1 sm:mb-2">
                  {t("deadlock.alert")}
                </h4>
                <p className="text-[10px] sm:text-xs md:text-sm text-white">
                  {t("deadlock.message")}
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 border-t border-border bg-secondary/30">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
          <StatCard label={t("stat.completed")} value={stats.completed} color="text-accent-south" />
          <StatCard label={t("stat.waiting")} value={stats.waiting} color="text-accent-west" />
          <StatCard label={t("stat.broken")} value={stats.broken} color="text-accent-north" />
          <StatCard label={t("stat.crossing")} value={stats.crossing} color="text-accent-east" />
          <div className="bg-card rounded-lg p-2 sm:p-3 border border-border">
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">{t("stat.status")}</p>
            <p
              className={`text-sm sm:text-base md:text-lg font-semibold ${
                stats.deadlocked ? "text-accent-north animate-pulse" : "text-foreground"
              }`}
            >
              {stats.deadlocked
                ? t("status.deadlock")
                : running
                  ? t("status.running")
                  : t("status.stopped")}
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
    <div className="bg-card rounded-lg p-1.5 sm:p-2 md:p-3 border border-border text-center sm:text-left">
      <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide truncate">{label}</p>
      <p className={`text-sm sm:text-lg md:text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}