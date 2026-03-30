import {
  W, H, CX, CY, ROAD_W, HALF,
  CAR_BODY_LEN, CAR_BODY_WID,
  COLORS, DIRECTIONS, LANE_CONFIG,
} from "./constants";
import type { Simulation } from "./simulation";
import type { Car } from "./car";
import type { Direction } from "./constants";

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
  // Background
  ctx.fillStyle = COLORS.grass;
  ctx.fillRect(0, 0, W, H);

  // Subtle grid
  ctx.strokeStyle = COLORS.gridLine;
  ctx.lineWidth = 1;
  for (let i = 0; i < W; i += 38) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(W, i); ctx.stroke();
  }

  // Road surfaces
  ctx.fillStyle = COLORS.road;
  ctx.fillRect(CX - HALF, 0, ROAD_W, H);         // vertical
  ctx.fillRect(0, CY - HALF, W, ROAD_W);          // horizontal

  // Lane dividers (dashed)
  ctx.setLineDash([16, 14]);
  ctx.strokeStyle = COLORS.roadLine;
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(CX, 0);       ctx.lineTo(CX, CY - HALF); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(CX, CY+HALF); ctx.lineTo(CX, H);         ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, CY);       ctx.lineTo(CX - HALF, CY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(CX+HALF, CY); ctx.lineTo(W, CY);         ctx.stroke();
  ctx.setLineDash([]);

  // Zebra crossings (subtle)
  const stripeW = 8, stripeGap = 6, stripes = 4;
  ctx.fillStyle = "rgba(255,255,255,0.04)";
  for (let i = 0; i < stripes; i++) {
    const off = i * (stripeW + stripeGap);
    ctx.fillRect(CX - HALF, CY - HALF - 28 - off, ROAD_W, stripeW);
    ctx.fillRect(CX - HALF, CY + HALF + 14 + off, ROAD_W, stripeW);
    ctx.fillRect(CX - HALF - 28 - off, CY - HALF, stripeW, ROAD_W);
    ctx.fillRect(CX + HALF + 14 + off, CY - HALF, stripeW, ROAD_W);
  }

  // Stop lines
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(CX, CY - HALF);       ctx.lineTo(CX + ROAD_W, CY - HALF); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(CX - ROAD_W, CY+HALF); ctx.lineTo(CX, CY + HALF);         ctx.stroke();
  ctx.beginPath(); ctx.moveTo(CX+HALF, CY - ROAD_W); ctx.lineTo(CX+HALF, CY);           ctx.stroke();
  ctx.beginPath(); ctx.moveTo(CX - HALF, CY);        ctx.lineTo(CX-HALF, CY+ROAD_W);    ctx.stroke();
}

// ── traffic lights ────────────────────────────
export function drawTrafficLight(ctx: CanvasRenderingContext2D, x: number, y: number, state: string) {
  const w = 18, h = 42, r = 4;
  ctx.fillStyle = "#12192b";
  ctx.strokeStyle = "#232a40";
  ctx.lineWidth = 1;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, r);
  ctx.fill(); ctx.stroke();

  const dots = [
    { s: "red",    color: COLORS.semRed,    py: y - h / 2 + 8  },
    { s: "yellow", color: COLORS.semYellow, py: y              },
    { s: "green",  color: COLORS.semGreen,  py: y + h / 2 - 8  },
  ];
  dots.forEach(({ s, color, py }) => {
    const active = state === s;
    ctx.beginPath();
    ctx.arc(x, py, 5, 0, Math.PI * 2);
    if (active) {
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
    } else {
      ctx.fillStyle = "#0a0e1a";
      ctx.shadowBlur = 0;
    }
    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

// ── car ───────────────────────────────────────
export function drawCar(ctx: CanvasRenderingContext2D, car: Car, flashOn: boolean) {
  const cfg = LANE_CONFIG[car.direction];
  const isV = cfg.axis === "y";
  // Width along travel axis = CAR_BODY_LEN; across = CAR_BODY_WID
  const cLen = CAR_BODY_LEN;
  const cWid = CAR_BODY_WID;
  const cw = isV ? cWid : cLen;  // canvas x extent
  const ch = isV ? cLen : cWid;  // canvas y extent

  const broken  = car.state === "broken";
  const waiting = car.state === "waiting";

  ctx.save();
  ctx.translate(car.x, car.y);

  // Glow for broken
  if (broken) {
    ctx.shadowColor = COLORS.deadlockFlash;
    ctx.shadowBlur  = flashOn ? 24 : 10;
  } else if (waiting) {
    ctx.shadowColor = COLORS.west;
    ctx.shadowBlur  = 6;
  }

  // Body
  const bodyColor = broken ? COLORS.broken : car.color;
  ctx.fillStyle = bodyColor;
  ctx.globalAlpha = broken ? 0.9 : 1;
  roundRect(ctx, -cw / 2, -ch / 2, cw, ch, 5);
  ctx.fill();

  // Windshield
  ctx.fillStyle = broken ? "rgba(80,30,30,0.6)" : "rgba(0,0,0,0.45)";
  if (isV) {
    const frontY = cfg.dir === 1 ? -ch / 2 + 4 : ch / 2 - 11;
    ctx.fillRect(-cw / 2 + 3, frontY, cw - 6, 7);
  } else {
    const frontX = cfg.dir === -1 ? -cw / 2 + 4 : cw / 2 - 11;
    ctx.fillRect(frontX, -ch / 2 + 3, 7, ch - 6);
  }

  // Headlights / taillights
  const hlColor = broken ? "#FF4560" : "#ffffffcc";
  const tlColor = "rgba(255,80,80,0.7)";
  ctx.fillStyle = hlColor;
  if (isV) {
    const frontY = cfg.dir === 1 ? -ch / 2 + 3 : ch / 2 - 3;
    const rearY  = cfg.dir === 1 ? ch / 2 - 3  : -ch / 2 + 3;
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

  // X mark on broken car
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
    ctx.fillStyle = `rgba(180,140,100,${p.life * 0.45})`;
    ctx.fill();
  });
}

// ── intersection deadlock highlight ──────────
export function drawDeadlockHighlight(ctx: CanvasRenderingContext2D, on: boolean) {
  ctx.fillStyle   = on ? "rgba(255,69,96,0.15)" : "rgba(255,69,96,0.06)";
  ctx.strokeStyle = on ? "rgba(255,69,96,0.8)"  : "rgba(255,69,96,0.2)";
  ctx.lineWidth   = 2;
  roundRect(ctx, CX - HALF, CY - HALF, ROAD_W, ROAD_W, 4);
  ctx.fill();
  ctx.stroke();
}

// ── full scene ────────────────────────────────
export function renderScene(ctx: CanvasRenderingContext2D, sim: Simulation, flashOn: boolean) {
  ctx.clearRect(0, 0, W, H);
  drawRoad(ctx);

  if (sim.deadlocked) drawDeadlockHighlight(ctx, flashOn);

  // Smoke (below cars)
  sim.cars.forEach(car => drawSmoke(ctx, car));

  // Traffic lights (solution mode)
  if (sim.mode === "solution") {
    DIRECTIONS.forEach(d => {
      const cfg = LANE_CONFIG[d];
      const { x, y } = cfg.semPos;
      drawTrafficLight(ctx, x, y, sim.lights[d].state);
    });
  }

  // Cars
  sim.cars.forEach(car => {
    if (car.state !== "done") drawCar(ctx, car, flashOn);
  });
}
