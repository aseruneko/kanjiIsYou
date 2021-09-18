export default class TextObject {
    visible: boolean = false;
    x: number = -1;
    y: number = -1;
    attribute: Attribute[] = [];
    container: Phaser.GameObjects.Container;
    constructor(container: Phaser.GameObjects.Container, x: number, y: number, attribute: Attribute[], visible: boolean) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.attribute = attribute;
        this.visible = visible;
    }
}

export enum Attribute {
    YOU,
    WALL,
}