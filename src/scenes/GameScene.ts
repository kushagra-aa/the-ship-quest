import Phaser from "phaser";
import { GAME_CONFIG } from "../gameConfig";

export default class GameScene extends Phaser.Scene {
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  bgFar!: Phaser.GameObjects.TileSprite;
  fuelContainer!: Phaser.GameObjects.Rectangle;
  fuel = GAME_CONFIG.difficulties.story.fuel.fuelTankSize;
  stopProgress = false;
  ground!: Phaser.Physics.Arcade.StaticGroup;
  groundSensor!: Phaser.GameObjects.Rectangle;
  sensorBody!: Phaser.Physics.Arcade.Body;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("bg-far", "/assets/level_office1.png");
    this.load.image("character-main", "/assets/character_main_fly.png");
  }

  create() {
    if (!this?.input?.keyboard) alert("No Keyboard");
    // Background layers
    this.bgFar = this.add.tileSprite(
      GAME_CONFIG.base.background.position.x,
      GAME_CONFIG.base.background.position.y,
      GAME_CONFIG.base.background.size.width,
      GAME_CONFIG.base.background.size.height,
      "bg-far"
    );

    // Ground (simple)
    this.ground = this.physics.add.staticGroup();
    this.ground
      .create(
        GAME_CONFIG.base.ground.position.x,
        GAME_CONFIG.base.ground.position.y,
        ""
      )
      .setDisplaySize(
        GAME_CONFIG.base.ground.size.width,
        GAME_CONFIG.base.ground.size.height
      )
      .refreshBody();

    // Player
    this.player = this.physics.add.sprite(
      GAME_CONFIG.base.player.position.x,
      GAME_CONFIG.base.player.position.y,
      "character-main"
    );
    this.player.setDisplaySize(
      GAME_CONFIG.base.player.size.width,
      GAME_CONFIG.base.player.size.height
    );
    this.player.setBounce(GAME_CONFIG.difficulties.story.physics.bounce);
    this.player.setCollideWorldBounds(true);

    this.fuelContainer = this.add
      .rectangle(
        GAME_CONFIG.base.fuelTank.position.x,
        GAME_CONFIG.base.fuelTank.position.y,
        (this.fuel / 100) * GAME_CONFIG.base.fuelTank.size.width,
        GAME_CONFIG.base.fuelTank.size.height,
        0x00ff00
      )
      .setOrigin(0);
    this.groundSensor = this.add.rectangle(
      0,
      this.player.displayHeight / 2,
      this.player.displayWidth * 0.8,
      4,
      0x00ff00,
      0
    );
    this.physics.add.existing(this.groundSensor, false);
    this.sensorBody = this.groundSensor.body as Phaser.Physics.Arcade.Body;
    this.sensorBody.allowGravity = false;

    this.physics.add.collider(this.player, this.ground);
    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  update() {
    const player = this.player;

    // Background scroll
    if (!this.stopProgress) this.bgFar.tilePositionX += 0.7;

    // Player controls
    if (this.cursors.space?.isDown && this.fuel > 0.9) {
      player.setVelocityY(-200);
      this.fuel = this.fuel - GAME_CONFIG.difficulties.story.fuel.fuelUse;
    } else {
      // Increase fuel refill speed when below 150 height
      if (player.y >= 400 - 150) {
        this.fuel = Math.min(this.fuel + 0.25, 100);
      } else if (player.y >= 400 - 250) {
        this.fuel = Math.min(this.fuel + 0.2, 100);
      }
    }

    this.sensorBody.x = player.x - player.displayWidth / 2;
    this.sensorBody.y = player.y + player.displayHeight / 2;

    const touchingGround = this.physics.overlap(this.sensorBody, this.ground);
    // Stop BG when down on ground
    if (touchingGround) {
      this.stopProgress = true;
    } else {
      this.stopProgress = false;
    }

    // Fuel bar (temporary)
    this.fuelContainer.setSize(
      (this.fuel / 100) * GAME_CONFIG.base.fuelTank.size.width,
      GAME_CONFIG.base.fuelTank.size.height
    );
    if (this.fuel > 15) this.fuelContainer.setFillStyle(0x00ff00);
    if (this.fuel < 15) this.fuelContainer.setFillStyle(0xf59300);
    if (this.fuel <= 1) this.fuelContainer.setFillStyle(0xff0000);

    // * DEBUG
    this.add.text(
      0,
      0,
      `P::\n\tDisplayWidth: ${player.displayWidth}\n\tDisplayHeight: ${player.displayHeight}\n\tx: ${player.x} y: ${player.y}`,
      { backgroundColor: "#1e1e1e", padding: { top: 2, left: 1 } }
    );
  }
}
