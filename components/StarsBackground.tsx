"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
}

export function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animationRef = useRef<number>();
  const [particleColor, setParticleColor] = useState("#1f2937"); // cor padrão (escura)

  // Configurações mais suaves
  const COUNT = 120;                // menos partículas para fluidez
  const MAX_SPEED = 1.2;           // velocidade máxima reduzida
  const MOUSE_RADIUS = 180;         // raio de influência um pouco maior
  const MOUSE_FORCE = 2.5;          // força reduzida
  const PARTICLE_RADIUS = 50;       // repulsão entre partículas mais suave
  const SPRING = 0.012;             // retorno mais lento e suave
  const DAMPING = 0.97;             // amortecimento leve

  // Detecta o tema e atualiza a cor das partículas
  useEffect(() => {
    const updateColor = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setParticleColor(isDark ? "#ffffff" : "#374151"); // branco no dark, cinza escuro no light
    };
    updateColor();
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < COUNT; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x, y,
        homeX: x, homeY: y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
      });
    }
    particlesRef.current = particles;
  };

  const updateParticles = (width: number, height: number, mouseX: number, mouseY: number, mouseActive: boolean) => {
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      let fx = 0, fy = 0;

      // Repulsão entre partículas (suave)
      for (let j = 0; j < particles.length; j++) {
        if (i === j) continue;
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < PARTICLE_RADIUS) {
          const angle = Math.atan2(dy, dx);
          const force = (PARTICLE_RADIUS - dist) / PARTICLE_RADIUS * 0.6;
          fx += Math.cos(angle) * force;
          fy += Math.sin(angle) * force;
        }
      }

      // Repulsão do mouse
      if (mouseActive) {
        const dx = particles[i].x - mouseX;
        const dy = particles[i].y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS) {
          const angle = Math.atan2(dy, dx);
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * MOUSE_FORCE;
          fx += Math.cos(angle) * force;
          fy += Math.sin(angle) * force;
        }
      }

      // Força restauradora (mola)
      fx += (particles[i].homeX - particles[i].x) * SPRING;
      fy += (particles[i].homeY - particles[i].y) * SPRING;

      particles[i].vx += fx;
      particles[i].vy += fy;

      const speed = Math.hypot(particles[i].vx, particles[i].vy);
      if (speed > MAX_SPEED) {
        particles[i].vx = (particles[i].vx / speed) * MAX_SPEED;
        particles[i].vy = (particles[i].vy / speed) * MAX_SPEED;
      }

      particles[i].x += particles[i].vx;
      particles[i].y += particles[i].vy;
      particles[i].vx *= DAMPING;
      particles[i].vy *= DAMPING;

      // Bordas suaves
      if (particles[i].x < 15) particles[i].x = 15;
      if (particles[i].x > width - 15) particles[i].x = width - 15;
      if (particles[i].y < 15) particles[i].y = 15;
      if (particles[i].y > height - 15) particles[i].y = height - 15;
    }
  };

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    // Não preenchemos fundo – ele é transparente (o fundo do body aparece atrás)

    ctx.globalAlpha = 0.7;
    for (const p of particlesRef.current) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.shadowBlur = 4;
      ctx.shadowColor = particleColor;
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    if (particlesRef.current.length === 0) {
      initParticles(width, height);
    } else {
      // Ajusta proporções
      const oldWidth = canvas.width;
      const oldHeight = canvas.height;
      const scaleX = width / oldWidth;
      const scaleY = height / oldHeight;
      for (const p of particlesRef.current) {
        p.x *= scaleX;
        p.y *= scaleY;
        p.homeX *= scaleX;
        p.homeY *= scaleY;
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, active: true };
      }
    };
    const onTouchEnd = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);

    const animate = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const width = canvas.width;
      const height = canvas.height;
      const { x, y, active } = mouseRef.current;
      updateParticles(width, height, x, y, active);
      draw(ctx, width, height);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}