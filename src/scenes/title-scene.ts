export default class TitleScene extends Phaser.Scene {

  private SCENE_WIDTH: number = 640;
  private SCENE_HEIGHT: number = 360;
  private SCENE_X: number = 320;
  private SCENE_Y: number = 180;

    constructor() {
      super({
        key: 'Title',
      });
    }
  
    /**ロードが終わったあとのライフサイクルで呼ばれるメソッド */
    create(): void {
      this.add.rectangle(this.SCENE_X, this.SCENE_Y, this.SCENE_WIDTH, this.SCENE_HEIGHT, 0xFFFFFF);
      this.add.image(this.SCENE_X, this.SCENE_Y - this.SCENE_Y / 4, 'titleLogo');
      const text = this.add.text(this.SCENE_X, this.SCENE_HEIGHT - this.SCENE_HEIGHT / 4, '- CLICK TO START -').setFontFamily('ltgFont').setColor('0x00000').setOrigin(0.5);
  
      this.sound.play('simpleAndClean');

      //setInteractiveを呼ぶと動的なオブジェクトになる
      //入力系のイベントなどが有効化される
      text.setInteractive();
  
      text.on('pointerdown', () => {
        this.sound.play('cursor2');
        this.scene.start('World');
      });
    }
  }
  