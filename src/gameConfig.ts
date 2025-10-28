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
  gravity: number;
  gravityX: number;
  frame: { size: { width: number; height: number } };
  background: GameEntityBaseType & {
    speed: number;
  };
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
