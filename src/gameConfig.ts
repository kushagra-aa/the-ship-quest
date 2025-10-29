type GameEntityBaseType = {
  size: {
    width: number;
    height: number;
  };
  position: {
    x: number;
    y: number;
  };
};

type GameConfigType = {
  frame: { size: GameEntityBaseType["size"] };
  background: GameEntityBaseType;
  ground: GameEntityBaseType & {};
  player: GameEntityBaseType & {};
  fuelTank: GameEntityBaseType & {
    totalTanksCount: number;
    calculateTanksCount: (fuel: number) => number;
  };
  health: GameEntityBaseType & {
    totalTanksCount: number;
    calculateTanksCount: (fuel: number) => number;
  };
};

// Player Config
type PlayerConfigType = {
  flyUpSpeed: number;
  dashXDistance: number;
};

// Fuel Config
type FuelConfigType = {
  fuelTankSize: number;
  fuelUse: number;
  fuelUseDash: number;
  fuelRefillAir: number;
  fuelRefillGround: number;
};

type DifficultyConfigType = {
  physics: {
    gravity: number;
    gravityX: number;
    bounce: number;
  };
  background: {
    speed: number;
  };
  player: PlayerConfigType;
  fuel: FuelConfigType;
};

type DifficultiesConfigType = Record<
  "story" | "normal" | "nightmare",
  DifficultyConfigType
>;

const BASE_GAME_CONFIG: GameConfigType = {
  background: {
    position: { x: 200, y: 250 },
    size: { width: 1200, height: 600 },
  },
  frame: { size: { width: 800, height: 500 } },
  fuelTank: {
    totalTanksCount: 10,
    calculateTanksCount: (fuel) => fuel,
    position: { x: 20, y: 20 },
    size: { width: 760, height: 6 },
  },
  player: {
    position: {
      x: 200,
      y: 300,
    },
    size: {
      height: 220,
      width: 90,
    },
  },
  ground: {
    position: {
      x: 400,
      y: 510,
    },
    size: {
      width: 800,
      height: 20,
    },
  },
  health: {
    totalTanksCount: 10,
    calculateTanksCount: (fuel) => fuel,
    position: { x: 0, y: 30 },
    size: { width: 800, height: 10 },
  },
};

const DIFFICULTIES: DifficultiesConfigType = {
  story: {
    physics: { gravity: 400, gravityX: 0, bounce: 0.9 },
    fuel: {
      fuelRefillAir: 0,
      fuelRefillGround: 0.25,
      fuelUse: 2,
      fuelUseDash: 20,
      fuelTankSize: 100,
    },
    player: { dashXDistance: 20, flyUpSpeed: 200 },
    background: { speed: 1 },
  },
  normal: {
    physics: { gravity: 700, gravityX: 0, bounce: 0.9 },
    fuel: {
      fuelRefillAir: 0,
      fuelRefillGround: 0.25,
      fuelUse: 1,
      fuelUseDash: 20,
      fuelTankSize: 100,
    },
    player: { dashXDistance: 20, flyUpSpeed: 200 },
    background: { speed: 0.7 },
  },
  nightmare: {
    physics: { gravity: 900, gravityX: 0, bounce: 0.9 },
    fuel: {
      fuelRefillAir: 0,
      fuelRefillGround: 0.25,
      fuelUse: 1,
      fuelUseDash: 20,
      fuelTankSize: 100,
    },
    player: { dashXDistance: 20, flyUpSpeed: 200 },
    background: { speed: 0.7 },
  },
};

export const GAME_CONFIG = {
  base: BASE_GAME_CONFIG,
  difficulties: DIFFICULTIES,
};
