import { StageData1 } from "../stage/stage-data";

export default class WorldScene extends Phaser.Scene {
    
    constructor() {
        super({
            key: 'World',
        });
    }

    create(): void {
        const textStage1 = this.add.text(10, 10, 'Stage1').setFontFamily('ltgFont');
        const textStage2 = this.add.text(10, 50, 'Stage2').setFontFamily('ltgFont');

        textStage1.setInteractive();
        textStage2.setInteractive();

        textStage1.on('pointerdown', () => {
            this.sound.stopAll();
            this.sound.play('cursor2');
            this.scene.start('Main', {stageId: 1});
        });
        textStage2.on('pointerdown', () => {
            this.sound.stopAll();
            this.sound.play('cursor2');
            this.scene.start('Main', {stageId: 2});
        });
    }
    update(): void {

    }
}