export const W = 620;
export const H = 620;
export const CX = W / 2;
export const CY = H / 2;
export const ROAD_W = 90;
export const HALF = ROAD_W / 2;

// Car dimensions — wider body, proper length
export const CAR_BODY_LEN = 46;  // along travel axis
export const CAR_BODY_WID = 22;  // across travel axis

// Cores adaptáveis - serão sobrescritas pelo CSS quando disponível
// Estas são cores de fallback para quando CSS não está disponível
export const COLORS = {
  // Background/road colors - usar variáveis CSS
  bg: "#1c1a18",
  road: "var(--road-surface, #4a525a)",
  roadLine: "var(--road-line, #5a6066)",
  grass: "var(--background, #1c1a18)",
  gridLine: "var(--border, #403c38)",

  // Car colors - tons naturais que funcionam em ambos os modos
  north: "var(--accent-north, #c94a4a)",
  south: "var(--accent-south, #4a9c6d)",
  east: "var(--accent-east, #3d7aa8)",
  west: "var(--accent-west, #c9913d)",

  // Status colors
  deadlockFlash: "var(--accent-north, #c94a4a)",
  semGreen: "var(--traffic-green, #4da866)",
  semRed: "var(--traffic-red, #d94646)",
  semYellow: "var(--traffic-yellow, #e6b84d)",
  broken: "#6b4c4c",
  smoke: "rgba(140,130,120,",
} as const;

export const DIRECTIONS = ["north", "south", "east", "west"] as const;
export type Direction = typeof DIRECTIONS[number];

export interface LaneConfig {
  entry: { x: number; y: number };
  axis: "x" | "y";
  dir: 1 | -1;
  stopLine: number;
  laneX?: number;
  laneY?: number;
  semPos: { x: number; y: number };
}

// Lane config — entry/exit, stop line, axis, movement direction
export const LANE_CONFIG: Record<Direction, LaneConfig> = {
  north: {
    entry:    { x: CX + HALF * 0.45, y: -CAR_BODY_LEN },
    axis:     "y",
    dir:      1,               // positive Y = downward
    stopLine: CY - HALF - 2,
    laneX:    CX + HALF * 0.45,
    semPos:   { x: CX + HALF + 20, y: CY + HALF + 30 }, // lado sul, fora da pista
  },
  south: {
    entry:    { x: CX - HALF * 0.45, y: H + CAR_BODY_LEN },
    axis:     "y",
    dir:      -1,
    stopLine: CY + HALF + 2,
    laneX:    CX - HALF * 0.45,
    semPos:   { x: CX - HALF - 20, y: CY - HALF - 30 }, // lado norte, fora da pista
  },
  east: {
    entry:    { x: W + CAR_BODY_LEN, y: CY + HALF * 0.45 },
    axis:     "x",
    dir:      -1,
    stopLine: CX + HALF + 2,
    laneY:    CY + HALF * 0.45,
    semPos:   { x: CX - HALF - 30, y: CY + HALF + 30 }, // lado oeste, fora da pista
  },
  west: {
    entry:    { x: -CAR_BODY_LEN, y: CY - HALF * 0.45 },
    axis:     "x",
    dir:      1,
    stopLine: CX - HALF - 2,
    laneY:    CY - HALF * 0.45,
    semPos:   { x: CX + HALF + 30, y: CY - HALF - 30 }, // lado leste, fora da pista
  },
};
