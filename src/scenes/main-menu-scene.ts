export default class MainMenuScene extends Phaser.Scene {
    private SCENE_WIDTH: number = 640;
    private SCENE_HEIGHT: number = 360;
    private SCENE_X: number = 320;
    private SCENE_Y: number = 180;
    private keyEscape: Phaser.Input.Keyboard.Key | undefined;
    
    constructor() {
        super({
            key: 'MainMenu',
        });
    }
    create(): void {
        this.add.rectangle(this.SCENE_X, this.SCENE_Y, this.SCENE_WIDTH, this.SCENE_HEIGHT, 0x000000, 0.5)
        const text = this.add.text(50,50, 'もう一度ESCキーでステージ選択へ').setFontFamily('ltgFont');
        this.keyEscape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }
    update(): void {
        if (this.keyEscape!.isDown) {
            this.scene.stop('Main');
            this.scene.start('World');
          }
    }
}