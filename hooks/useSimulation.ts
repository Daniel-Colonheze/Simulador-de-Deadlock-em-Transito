"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Simulation, SimulationMode, SimulationStats } from "@/engine/simulation";
import { renderScene } from "@/engine/renderer";

export interface UseSimulationReturn {
  running: boolean;
  stats: SimulationStats;
  toggleRun: () => void;
  reset: () => void;
  start: () => void;
  stop: () => void;
}

export function useSimulation(
  mode: SimulationMode,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  scale: number
): UseSimulationReturn {
  const simRef = useRef<Simulation | null>(null);
  const rafRef = useRef<number | null>(null);
  const flashRef = useRef(false);

  const [running, setRunning] = useState(false);
  const [stats, setStats] = useState<SimulationStats>({
    completed: 0, waiting: 0, broken: 0, crossing: 0, deadlocked: false, tick: 0,
  });

  const initSim = useCallback(() => {
    simRef.current = new Simulation(mode);
    setStats({ completed: 0, waiting: 0, broken: 0, crossing: 0, deadlocked: false, tick: 0 });
    const canvas = canvasRef.current;
    if (canvas && simRef.current) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        renderScene(ctx, simRef.current, false, scale);
      }
    }
  }, [mode, canvasRef, scale]);

  useEffect(() => {
    initSim();
  }, [initSim]);

  const reset = useCallback(() => {
    setRunning(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setTimeout(initSim, 30);
  }, [initSim]);

  const start = useCallback(() => setRunning(true), []);
  const stop = useCallback(() => setRunning(false), []);
  const toggleRun = useCallback(() => setRunning(r => !r), []);

  useEffect(() => {
    if (!running) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const loop = () => {
      const sim = simRef.current;
      if (!sim) return;

      sim.update();
      const s = sim.getStats();

      flashRef.current = sim.deadlocked ? (Math.floor(sim.tick / 18) % 2 === 0) : false;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          renderScene(ctx, sim, flashRef.current, scale);
        }
      }

      setStats(s);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running, canvasRef, scale]);

  return { running, stats, toggleRun, reset, start, stop };
}