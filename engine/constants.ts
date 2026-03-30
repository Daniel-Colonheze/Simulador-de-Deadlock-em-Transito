export const W = 620;
export const H = 620;
export const CX = W / 2;
export const CY = H / 2;
export const ROAD_W = 90;
export const HALF = ROAD_W / 2;

// Car dimensions — wider body, proper length
export const CAR_BODY_LEN = 46;  // along travel axis
export const CAR_BODY_WID = 22;  // across travel axis

export const COLORS = {
  bg: "#0a0e1a",
  road: "#161b2e",
  roadLine: "#232a40",
  grass: "#0d1420",
  gridLine: "#0f1520",
  north: "#FF4560",
  south: "#00E396",
  east: "#008FFB",
  west: "#FEB019",
  deadlockFlash: "#FF4560",
  semGreen: "#00E396",
  semRed: "#FF4560",
  semYellow: "#FEB019",
  broken: "#6b4c4c",
  smoke: "rgba(180,140,100,",
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