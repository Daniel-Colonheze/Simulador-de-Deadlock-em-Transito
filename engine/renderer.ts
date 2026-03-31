import {
  W, H, CX, CY, ROAD_W, HALF,
  CAR_BODY_LEN, CAR_BODY_WID,
  COLORS, DIRECTIONS, LANE_CONFIG,
} from "./constants";
import type { Simulation } from "./simulation";
import type { Car } from "./car";
import type { Direction } from "./constants";

// Helper to get CSS variable value
function getCSSVariable(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

// Get theme-aware colors
function getThemeColors() {
  return {
    road: getCSSVariable("--road-surface", "#4a525a"),
    roadLine: getCSSVariable("--road-line", "#5a6066"),
    background: getCSSVariable("--background", "#1c1a18"),
    border: getCSSVariable("--border", "#403c38"),
    accentNorth: getCSSVariable("--accent-north", "#c94a4a"),
    accentEast: getCSSVariable("--accent-east", "#3d7aa8"),
    accentSouth: getCSSVariable("--accent-south", "#4a9c6d"),
    accentWest: getCSSVariable("--accent-west", "#c9913d"),
    trafficRed: getCSSVariable("--traffic-red", "#d94646"),
    trafficYellow: getCSSVariable("--traffic-yellow", "#e6b84d"),
    trafficGreen: getCSSVariable("--traffic-green", "#4da866"),
    card: getCSSVariable("--card", "#252320"),
  };
}

// ── helpers ──────────────────────────────────
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ── road ─────────────────────────────────────
export function drawRoad(ctx: CanvasRenderingContext2D) {
  const colors = getThemeColors();

  // Background
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, W, H);

  // Subtle grid
  ctx.strokeStyle = colors.border + "40"; // 25% opacity
  ctx.lineWidth = 1;
  for (let i = 0; i < W; i += 38) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(W, i); ctx.stroke();
  }

  // Road surfaces
  ctx.fillStyle = colors.road;
  ctx.fillRect(CX - HALF, 0, ROAD_W, H);         // vertical
  ctx.fillRect(0, CY - HALF, W, ROAD_W);          // horizontal

  // Lane dividers (dashed)
  ctx.setLineDash([16, 14]);
  ctx.strokeStyle = colors.roadLine;
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(CX, 0);       ctx.lineTo(CX, CY - HALF); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(CX, CY+HALF); ctx.lineTo(CX, H);         ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, CY);       ctx.lineTo(CX - HALF, CY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(CX+HALF, CY); ctx.lineTo(W, CY);         ctx.stroke();
  ctx.setLineDash([]);

  // Zebra crossings (subtle)
  const stripeW = 8, stripeGap = 6, stripes = 4;
  ctx.fillStyle = colors.roadLine + "15"; // very subtle
  for (let i = 0; i < stripes; i++) {
    const off = i * (stripeW + stripeGap);
    ctx.fillRect(CX - HALF, CY - HALF - 28 - off, ROAD_W, stripeW);
    ctx.fillRect(CX - HALF, CY + HALF + 14 + off, ROAD_W, stripeW);
    ctx.fillRect(CX - HALF - 28 - off, CY - HALF, stripeW, ROAD_W);
    ctx.fillRect(CX + HALF + 14 + off, CY - HALF, stripeW, ROAD_W);
  }

  // Stop lines
  ctx.strokeStyle = colors.roadLine + "60";
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(CX, CY - HALF);       ctx.lineTo(CX + ROAD_W, CY - HALF); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(CX - ROAD_W, CY+HALF); ctx.lineTo(CX, CY + HALF);         ctx.stroke();
  ctx.beginPath(); ctx.moveTo(CX+HALF, CY - ROAD_W); ctx.lineTo(CX+HALF, CY);           ctx.stroke();
  ctx.beginPath(); ctx.moveTo(CX - HALF, CY);        ctx.lineTo(CX-HALF, CY+ROAD_W);    ctx.stroke();
}

// ── traffic lights (vertical for N/S, horizontal for E/W, with inverted red/green for E/W) ──
export function drawTrafficLight(ctx: CanvasRenderingContext2D, x: number, y: number, state: string, direction: Direction) {
  const colors = getThemeColors();
  const isVertical = direction === 'north' || direction === 'south';

  if (isVertical) {
    // Vertical (north/south): 18x42, cores padrão (vermelho em cima)
    const w = 18, h = 42, r = 4;
    ctx.save();
    ctx.fillStyle = colors.card;
    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 1;
    roundRect(ctx, x - w / 2, y - h / 2, w, h, r);
    ctx.fill();
    ctx.stroke();

    const radius = 5;
    const yOffsets = [-h/2 + 8, 0, h/2 - 8];
    const lightColors = [colors.trafficRed, colors.trafficYellow, colors.trafficGreen];

    for (let i = 0; i < 3; i++) {
      const colorName = ['red', 'yellow', 'green'][i];
      const active = state === colorName;
      const py = y + yOffsets[i];
      ctx.beginPath();
      ctx.arc(x, py, radius, 0, Math.PI * 2);
      if (active) {
        ctx.fillStyle = lightColors[i];
        ctx.shadowColor = lightColors[i];
        ctx.shadowBlur = 12;
      } else {
        ctx.fillStyle = colors.background;
        ctx.shadowBlur = 0;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();
  } else {
    // Horizontal (east/west): 42x18, com vermelho na ponta oposta à anterior
    const w = 42, h = 18, r = 4;
    ctx.save();
    ctx.fillStyle = colors.card;
    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 1;
    roundRect(ctx, x - w / 2, y - h / 2, w, h, r);
    ctx.fill();
    ctx.stroke();

    const radius = 5;
    const xOffsets = [-w/2 + 10, 0, w/2 - 10];
    // Invertido: east -> vermelho à direita (green left), west -> vermelho à esquerda (green right)
    let lightColors: string[];
    if (direction === 'east') {
      lightColors = [colors.trafficGreen, colors.trafficYellow, colors.trafficRed]; // esquerda=verde, direita=vermelho
    } else { // west
      lightColors = [colors.trafficRed, colors.trafficYellow, colors.trafficGreen]; // esquerda=vermelho, direita=verde
    }

    for (let i = 0; i < 3; i++) {
      const colorName = direction === 'east' ? ['green', 'yellow', 'red'][i] : ['red', 'yellow', 'green'][i];
      const active = state === colorName;
      const px = x + xOffsets[i];
      ctx.beginPath();
      ctx.arc(px, y, radius, 0, Math.PI * 2);
      if (active) {
        ctx.fillStyle = lightColors[i];
        ctx.shadowColor = lightColors[i];
        ctx.shadowBlur = 12;
      } else {
        ctx.fillStyle = colors.background;
        ctx.shadowBlur = 0;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();
  }
}

// ── car ───────────────────────────────────────
export function drawCar(ctx: CanvasRenderingContext2D, car: Car, flashOn: boolean) {
  const colors = getThemeColors();
  const cfg = LANE_CONFIG[car.direction];
  const isV = cfg.axis === "y";
  const cLen = CAR_BODY_LEN;
  const cWid = CAR_BODY_WID;
  const cw = isV ? cWid : cLen;
  const ch = isV ? cLen : cWid;

  const broken  = car.state === "broken";
  const waiting = car.state === "waiting";

  // Get direction color
  const dirColors: Record<string, string> = {
    north: colors.accentNorth,
    south: colors.accentSouth,
    east: colors.accentEast,
    west: colors.accentWest,
  };

  ctx.save();
  ctx.translate(car.x, car.y);

  if (broken) {
    ctx.shadowColor = colors.accentNorth;
    ctx.shadowBlur  = flashOn ? 24 : 10;
  } else if (waiting) {
    ctx.shadowColor = colors.accentWest;
    ctx.shadowBlur  = 6;
  }

  const bodyColor = broken ? colors.accentNorth + "80" : dirColors[car.direction];
  ctx.fillStyle = bodyColor;
  ctx.globalAlpha = broken ? 0.9 : 1;
  roundRect(ctx, -cw / 2, -ch / 2, cw, ch, 5);
  ctx.fill();

  // Windows
  ctx.fillStyle = broken ? "rgba(60,40,40,0.6)" : "rgba(0,0,0,0.45)";
  if (isV) {
    const frontY = cfg.dir === 1 ? ch / 2 - 11 : -ch / 2 + 4;
    ctx.fillRect(-cw / 2 + 3, frontY, cw - 6, 7);
  } else {
    const frontX = cfg.dir === -1 ? -cw / 2 + 4 : cw / 2 - 11;
    ctx.fillRect(frontX, -ch / 2 + 3, 7, ch - 6);
  }

  // Lights
  const hlColor = broken ? colors.accentNorth : "#ffffffcc";
  const tlColor = "rgba(255,100,80,0.7)";
  ctx.fillStyle = hlColor;
  if (isV) {
    const frontY = cfg.dir === 1 ? ch / 2 - 3 : -ch / 2 + 3;
    const rearY  = cfg.dir === 1 ? -ch / 2 + 3  : ch / 2 - 3;
    [frontY].forEach(hy => {
      ctx.beginPath(); ctx.arc(-cw/2+4, hy, 2.5, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc( cw/2-4, hy, 2.5, 0, Math.PI*2); ctx.fill();
    });
    ctx.fillStyle = tlColor;
    ctx.beginPath(); ctx.arc(-cw/2+4, rearY, 2, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc( cw/2-4, rearY, 2, 0, Math.PI*2); ctx.fill();
  } else {
    const frontX = cfg.dir === -1 ? -cw/2+3 : cw/2-3;
    const rearX  = cfg.dir === -1 ? cw/2-3  : -cw/2+3;
    [frontX].forEach(hx => {
      ctx.beginPath(); ctx.arc(hx, -ch/2+4, 2.5, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(hx,  ch/2-4, 2.5, 0, Math.PI*2); ctx.fill();
    });
    ctx.fillStyle = tlColor;
    ctx.beginPath(); ctx.arc(rearX, -ch/2+4, 2, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(rearX,  ch/2-4, 2, 0, Math.PI*2); ctx.fill();
  }

  // X for broken cars
  if (broken) {
    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.lineWidth   = 2;
    ctx.shadowBlur  = 0;
    const mx = cw * 0.28, my = ch * 0.28;
    ctx.beginPath(); ctx.moveTo(-mx, -my); ctx.lineTo(mx, my); ctx.stroke();
    ctx.beginPath(); ctx.moveTo( mx, -my); ctx.lineTo(-mx, my); ctx.stroke();
  }

  ctx.shadowBlur  = 0;
  ctx.globalAlpha = 1;
  ctx.restore();
}

// ── smoke particles ───────────────────────────
export function drawSmoke(ctx: CanvasRenderingContext2D, car: Car) {
  car.smokeParticles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(160,150,140,${p.life * 0.4})`;
    ctx.fill();
  });
}

// ── intersection deadlock highlight ──────────
export function drawDeadlockHighlight(ctx: CanvasRenderingContext2D, on: boolean) {
  const colors = getThemeColors();
  ctx.fillStyle   = on ? colors.accentNorth + "25" : colors.accentNorth + "10";
  ctx.strokeStyle = on ? colors.accentNorth : colors.accentNorth + "50";
  ctx.lineWidth   = 2;
  roundRect(ctx, CX - HALF, CY - HALF, ROAD_W, ROAD_W, 4);
  ctx.fill();
  ctx.stroke();
}

// ── full scene (com suporte a escala) ─────────
export function renderScene(ctx: CanvasRenderingContext2D, sim: Simulation, flashOn: boolean, scale: number = 1) {
  ctx.save();
  ctx.scale(scale, scale);

  ctx.clearRect(0, 0, W, H);
  drawRoad(ctx);

  if (sim.deadlocked) drawDeadlockHighlight(ctx, flashOn);

  sim.cars.forEach(car => drawSmoke(ctx, car));

  if (sim.mode === "solution") {
    DIRECTIONS.forEach(d => {
      const cfg = LANE_CONFIG[d];
      const { x, y } = cfg.semPos;
      drawTrafficLight(ctx, x, y, sim.lights[d].state, d);
    });
  }

  sim.cars.forEach(car => {
    if (car.state !== "done") drawCar(ctx, car, flashOn);
  });

  ctx.restore();
}
