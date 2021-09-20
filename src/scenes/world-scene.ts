import { StageData1 } from "../stage/stage-data";

export default class WorldScene extends Phaser.Scene {

    private textStage1: Phaser.GameObjects.Text | undefined;
    private textStage2: Phaser.GameObjects.Text | undefined;
    
    constructor() {
        super({
            key: 'World',
        });
    }

    create(): void {
        this.textStage1 = this.add.text(10, 10, 'Stage1').setFontFamily('ltgFont');
        const stage1Clear = (localStorage.getItem('stage1') == 'CLEAR')
        if (stage1Clear) this.textStage1.setColor('#AAAAAA');
        this.textStage1.setInteractive();
        this.textStage1.on('pointerdown', () => {
            this.sound.stopAll();
            this.sound.play('cursor2');
            this.scene.start('Main', {stageId: 1});
        });

        this.textStage2 = this.add.text(10, 50, 'Stage2').setFontFamily('ltgFont');
        const stage2Clear = (localStorage.getItem('stage2') == 'CLEAR')
        if (stage2Clear) this.textStage2.setColor('#AAAAAA');
        this.textStage2.setInteractive();
        this.textStage2.on('pointerdown', () => {
            this.sound.stopAll();
            this.sound.play('cursor2');
            this.scene.start('Main', {stageId: 2});
        });
    }
    update(): void {
        const stage1Clear = (localStorage.getItem('stage1') == 'CLEAR')
        if (stage1Clear) this.textStage1!.setColor('#AAAAAA');
        const stage2Clear = (localStorage.getItem('stage2') == 'CLEAR')
        if (stage2Clear) this.textStage2!.setColor('#AAAAAA');
    }
}