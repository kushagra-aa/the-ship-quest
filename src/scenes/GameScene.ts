import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  fuel = 100;

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

    this.physics.add.collider(this.player, ground);
    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  update() {
    // Background scroll
    this.bgFar.tilePositionX += 0.2;

    // Player controls
    if (this.cursors.space?.isDown && this.fuel > 0) {
      this.player.setVelocityY(-200);
      this.fuel -= 0.5;
    } else {
      this.fuel = Math.min(this.fuel + 0.1, 100);
    }

    // Fuel bar (temporary)
    this.add.rectangle(80, 30, this.fuel * 2, 10, 0x00ff00).setOrigin(0);
  }
}
