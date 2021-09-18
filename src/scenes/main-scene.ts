import { text } from "stream/consumers";
import TextObject, { Attribute } from "../types/text-object";

export default class MainScene extends Phaser.Scene {
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
    private setting: Settings = new Settings;
    private textObjects: TextObject[] = [];
    constructor() {
      super({
        key: 'Main',
        physics: { arcade: { debug: true } },
      });
    }
  
    create(): void {
      var bg = this.addBg(0xDDDDDD);
      var stage = this.addStage(36, 36, 10, 10);
      const hero = this.addChar(0, 0, "字");
      var heroObj = new TextObject(hero, 1, 1, [Attribute.YOU], true);
      this.textObjects.push(heroObj);
      var label = this.addChar(400,200, "矢印キーで移動")
      this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    }
    update(): void {
      // console.log(this.acorn!.x, this.acorn!.y);
      var hero = this.textObjects.find((obj) => obj.attribute.includes( Attribute.YOU));
      if (this.keyLeft!.isDown && !this.keyLeftPushed) {
        hero!.x -= 1;
        this.keyLeftPushed = true;
      } else if (this.keyLeft!.isUp && this.keyLeftPushed) {
        this.keyLeftPushed = false;
      }
      if (this.keyRight!.isDown && !this.keyRightPushed) {
        hero!.x += 1;
        this.keyRightPushed = true;
      } else if (this.keyRight!.isUp && this.keyRightPushed) {
        this.keyRightPushed = false;
      }
      if (this.keyUp!.isDown && !this.keyUpPushed) {
        hero!.y -= 1;
        this.keyUpPushed = true;
      } else if (this.keyUp!.isUp && this.keyUpPushed) {
        this.keyUpPushed = false;
      }
      if (this.keyDown!.isDown && !this.keyDownPushed) {
        hero!.y += 1;
        this.keyDownPushed = true;
      } else if (this.keyDown!.isUp && this.keyDownPushed) {
        this.keyDownPushed = false;
      }
      this.renderTextObjects(this.textObjects);
    }
    private addBg(color: number): Phaser.GameObjects.Rectangle {
      return this.add.rectangle(this.SCENE_X, this.SCENE_Y, this.SCENE_WIDTH, this.SCENE_HEIGHT, color)
    }
    private addStage(x: number, y: number, width: number, height: number): Phaser.GameObjects.Container {
      var container = this.add.container();
      const color = new ColorPalette();
      for (var j = 0; j < height; j++) {
        for (var i = 0; i < width; i++) {
          const rectangle = this.add.rectangle(x + this.setting.MAP_TIP_SIZE * i, y + this.setting.MAP_TIP_SIZE * j, this.setting.MAP_TIP_SIZE, this.setting.MAP_TIP_SIZE, color.bgFill).setStrokeStyle(this.setting.MAP_TIP_STROKE_SIZE, color.bgStroke);
          container.add(rectangle);
        }
      }
      return container;
    }
    private addChar(x: number, y: number, text: string): Phaser.GameObjects.Container {
      const settings = new Settings();
      const color = new ColorPalette();
      var container = this.add.container();
      var textObj = this.add.text(x, y, text).setFontSize(settings.CHAR_SIZE).setFontFamily("Yu Gothic");
      container.add(textObj);
      return container;
    }
    private renderTextObjects(textObjects: TextObject[]): void {
      textObjects.forEach(
        textObject => {
          textObject.container.x = this.setting.RENDER_OFFSET_X + textObject.x * this.setting.MAP_TIP_SIZE;
          textObject.container.y = this.setting.RENDER_OFFSET_Y + textObject.y * this.setting.MAP_TIP_SIZE;
          textObject.container.visible = textObject.visible;
        }
      )
    }
  }

export class Settings {
  RENDER_OFFSET_X: number
  RENDER_OFFSET_Y: number
  MAP_TIP_SIZE: number
  MAP_TIP_STROKE_SIZE: number
  CHAR_SIZE: number
  constructor() {
    this.RENDER_OFFSET_X = 24;
    this.RENDER_OFFSET_Y = 24;
    this.MAP_TIP_SIZE = 32;
    this.CHAR_SIZE = 24;
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