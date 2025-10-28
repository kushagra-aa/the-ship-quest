import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  fuel = 100;
  fuelContainer!: Phaser.GameObjects.Rectangle;

  bgFar!: Phaser.GameObjects.TileSprite;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("bg-far", "/public/assets/level_office1.png");
    this.load.image("character-main", "/public/assets/character_main_fly.png");
  }

  create() {
    if (!this?.input?.keyboard) alert("No Keyboard");
    // Background layers
    this.bgFar = this.add.tileSprite(400, 300, 800, 500, "bg-far");

    // Ground (simple)
    const ground = this.physics.add.staticGroup();
    ground.create(400, 590, "").setDisplaySize(800, 20).refreshBody();

    // Player
    this.player = this.physics.add
      .sprite(200, 300, "character-main")
      .setDisplaySize(200, 200)
      .setCollideWorldBounds(true);
    this.fuelContainer = this.add
      .rectangle(0, 30, (this.fuel / 100) * 800, 10, 0x00ff00)
      .setOrigin(0);

    this.physics.add.collider(this.player, ground);
    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  update() {
    // Background scroll

    // Player controls
    if (this.cursors.space?.isDown && this.fuel > 0.9) {
      this.bgFar.tilePositionX += 0.7;
      this.player.setVelocityY(-200);
      this.fuel = this.fuel - 1;
    } else {
      if (this.player.y === 400) this.fuel = Math.min(this.fuel + 0.25, 100);
      else this.fuel = Math.min(this.fuel + 0.01, 100);
    }

    // Fuel bar (temporary)
    this.fuelContainer.setSize((this.fuel / 100) * 800, 10);
    if (this.fuel > 10) this.fuelContainer.setFillStyle(0x00ff00);
    if (this.fuel < 10) this.fuelContainer.setFillStyle(0xf59300);
    if (this.fuel <= 1) this.fuelContainer.setFillStyle(0xff0000);
  }
}
