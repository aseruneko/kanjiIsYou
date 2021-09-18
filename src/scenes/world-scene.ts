import { StageData1 } from "../stage/stage-data";

export default class WorldScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'World',
        });
    }

    create(): void {
        const text = this.add.text(10, 10, 'Stage1');

        text.setInteractive();

        text.on('pointerdown', () => {
            this.scene.start('Main', {stageId: 1});
        });
    }
}