import Phaser from "phaser";
import { GAME_CONFIG } from "./gameConfig";
import GameScene from "./scenes/GameScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: GAME_CONFIG.base.frame.size.width,
  height: GAME_CONFIG.base.frame.size.height,
  backgroundColor: "#1e1e1e",
  autoFocus: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: GAME_CONFIG.difficulties.story.physics.gravity,
        x: GAME_CONFIG.difficulties.story.physics.gravityX,
      },
      debug: true,
      // debugShowBody: true,
      // debugShowVelocity: true,
      // debugShowStaticBody: true,
      debugBodyColor: 0x00ff00,
      debugStaticBodyColor: 0x00ff00,
      debugVelocityColor: 0x00ff00,
    },
  },
  scene: [GameScene],
};

new Phaser.Game(config);
