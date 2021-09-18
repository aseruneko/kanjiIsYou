import { text } from "stream/consumers";

export default class MainScene extends Phaser.Scene {
    private acorn: Phaser.Physics.Arcade.Image | undefined;
    private text: Phaser.GameObjects.Text | undefined;
    private SCENE_WIDTH: number = 640;
    private SCENE_HEIGHT: number = 360;
    private SCENE_X: number = 320;
    private SCENE_Y: number = 180;
    private keyLeft: Phaser.Input.Keyboard.Key | undefined;
    private keyRight: Phaser.Input.Keyboard.Key | undefined;
    private keyDown: Phaser.Input.Keyboard.Key | undefined;
    private keyUp: Phaser.Input.Keyboard.Key | undefined;
    private keyLeftPushed: boolean = false;
    private keyRightPushed: boolean = false;
    private keyDownPushed: boolean = false;
    private keyUpPushed: boolean = false;
    constructor() {
      super({
        key: 'Main',
        physics: { arcade: { debug: true } },
      });
    }
  
    create(): void {
      var bg = this.addBg(0xDDDDDD);
      var stage = this.addStage(36, 36, 10, 10);
      this.text = this.addChar(32, 32, "字");
      var label = this.addChar(400,200, "矢印キーで移動")
      this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    }
    update(): void {
      // console.log(this.acorn!.x, this.acorn!.y);
      const setting = new Settings();
      if (this.keyLeft!.isDown && !this.keyLeftPushed) {
        this.text!.x -= setting.MAP_TIP_SIZE;
        this.keyLeftPushed = true;
      } else if (this.keyLeft!.isUp && this.keyLeftPushed) {
        this.keyLeftPushed = false;
      }
      if (this.keyRight!.isDown && !this.keyRightPushed) {
        this.text!.x += setting.MAP_TIP_SIZE;
        this.keyRightPushed = true;
      } else if (this.keyRight!.isUp && this.keyRightPushed) {
        this.keyRightPushed = false;
      }
      if (this.keyUp!.isDown && !this.keyUpPushed) {
        this.text!.y -= setting.MAP_TIP_SIZE;
        this.keyUpPushed = true;
      } else if (this.keyUp!.isUp && this.keyUpPushed) {
        this.keyUpPushed = false;
      }
      if (this.keyDown!.isDown && !this.keyDownPushed) {
        this.text!.y += setting.MAP_TIP_SIZE;
        this.keyDownPushed = true;
      } else if (this.keyDown!.isUp && this.keyDownPushed) {
        this.keyDownPushed = false;
      }
    }
    private addBg(color: number): Phaser.GameObjects.Rectangle {
      return this.add.rectangle(this.SCENE_X, this.SCENE_Y, this.SCENE_WIDTH, this.SCENE_HEIGHT, color)
    }
    private addStage(x: number, y: number, width: number, height: number): Phaser.GameObjects.Container {
      var container = this.add.container();
      const settings = new Settings();
      const color = new ColorPalette();
      for (var j = 0; j < height; j++) {
        for (var i = 0; i < width; i++) {
          const rectangle = this.add.rectangle(x + settings.MAP_TIP_SIZE * i, y + settings.MAP_TIP_SIZE * j, settings.MAP_TIP_SIZE, settings.MAP_TIP_SIZE, color.bgFill).setStrokeStyle(settings.MAP_TIP_STROKE_SIZE, color.bgStroke);
          container.add(rectangle);
        }
      }
      return container;
    }
    private addChar(x: number, y: number, text: string): Phaser.GameObjects.Text {
      return this.add.text(x, y, text);
    }
  }

export class Settings {
  MAP_TIP_SIZE: number
  MAP_TIP_STROKE_SIZE: number
  constructor() {
    this.MAP_TIP_SIZE = 32;
    this.MAP_TIP_STROKE_SIZE = 2;
  }
}

export class ColorPalette {
  bgStroke: number
  bgFill: number
  constructor() {
    this.bgStroke = 0xCCCCCC;
    this.bgFill = 0x000000;
  }
}