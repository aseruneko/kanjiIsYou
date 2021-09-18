export default class MainScene extends Phaser.Scene {
    private acorn: Phaser.Physics.Arcade.Image | undefined;
    constructor() {
      super({
        key: 'Main',
        physics: { arcade: { debug: true } },
      });
    }
  
    create(): void {
      this.physics.world.gravity.y = 100;
      this.acorn = this.physics.add
        .sprite(30, 30, 'acorn') //loading画面で設定したkeyで画像を読める
        .setScale(0.1)
        .setOrigin(0, 0)
        .setInteractive()
        .setVelocityX(100)
        .setCollideWorldBounds(true, 1, 1);
      this.acorn.on('pointerdown', () => {
        this.acorn!.setVelocityX(-this.acorn!.body.velocity.x);
      });
    }
    update(): void {
      console.log(this.acorn!.x, this.acorn!.y);
    }
  }
  