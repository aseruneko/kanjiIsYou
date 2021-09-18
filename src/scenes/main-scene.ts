import { text } from "stream/consumers";
import StageData, { StageData1 } from "../stage/stage-data";
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
    private attemptToMove: Direction = Direction.NEUTRAL;
    private stageData: StageData;
    constructor(data: any) {
      super({
        key: 'Main',
        physics: { arcade: { debug: true } },
      });
      this.stageData = new StageData;
    }
  
    create(data: any): void {
      console.log(data);
      this.stageData = new StageData1();
      var bg = this.addBg(0xDDDDDD);
      this.textObjects = this.loadStageData(this.stageData);
      var label = this.addChar(400,200, "矢印キーで移動")
      this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    }
    update(): void {
      // console.log(this.acorn!.x, this.acorn!.y);
      this.attemptToMove = Direction.NEUTRAL;
      if (this.keyLeft!.isDown && !this.keyLeftPushed) {
        this.attemptToMove = Direction.WEST;
        this.keyLeftPushed = true;
      } else if (this.keyLeft!.isUp && this.keyLeftPushed) {
        this.keyLeftPushed = false;
      }
      if (this.keyRight!.isDown && !this.keyRightPushed) {
        this.attemptToMove = Direction.EAST;
        this.keyRightPushed = true;
      } else if (this.keyRight!.isUp && this.keyRightPushed) {
        this.keyRightPushed = false;
      }
      if (this.keyUp!.isDown && !this.keyUpPushed) {
        this.attemptToMove = Direction.NORTH;
        this.keyUpPushed = true;
      } else if (this.keyUp!.isUp && this.keyUpPushed) {
        this.keyUpPushed = false;
      }
      if (this.keyDown!.isDown && !this.keyDownPushed) {
        this.attemptToMove = Direction.SOUTH;
        this.keyDownPushed = true;
      } else if (this.keyDown!.isUp && this.keyDownPushed) {
        this.keyDownPushed = false;
      }
      this.executeMove(this.textObjects, this.attemptToMove);
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
    private loadStageData(stageData: StageData): TextObject[] {
      var textObjects: TextObject[] = [];
      this.addStage(stageData.offsetX, stageData.offsetY, stageData.width, stageData.height);
      for(var j = 0; j < stageData.height; j++) {
        for(var i = 0; i < stageData.width; i ++) {
          const tile = stageData.data[j][i];
          if (tile == "字") {
            const label = this.addChar(0, 0, "字");
            var obj = new TextObject(label, i, j, [Attribute.YOU], true)
            textObjects.push(obj);
          } else if (tile == "壁") {
            const label = this.addChar(0, 0, "壁");
            var obj = new TextObject(label, i, j, [Attribute.STOP], true)
            textObjects.push(obj);
          } else if (tile == "物") {
            const label = this.addChar(0, 0, "物");
            var obj = new TextObject(label, i, j, [Attribute.PUSH], true)
            textObjects.push(obj);
          }                
        }
      }
      return textObjects;
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
    private executeMove(textObjects: TextObject[], attemptToMove: Direction): void {
      textObjects.filter((obj) => obj.attribute.includes(Attribute.YOU)).forEach(obj => {
        this.attemptMove(obj, textObjects, obj.x, obj.y, attemptToMove)
      });
    }

    private attemptMove(obj: TextObject, allObj: TextObject[], fromX: number, fromY: number, direction: Direction): boolean {
      var toX = fromX;
      var toY = fromY;
      if(direction == Direction.NEUTRAL) {
        return true;
      }
      if (direction == Direction.EAST) {
        toX = fromX + 1;
      }
      if (direction == Direction.WEST){
         toX = fromX - 1; 
        }
      if (direction == Direction.NORTH){
         toY = fromY - 1; 
        }
      if (direction == Direction.SOUTH){
         toY = fromY + 1; 
        }
      var toObj = allObj.filter(tobj => tobj.x == toX && tobj.y == toY)
      if (toObj.length > 0) {
        var stopObj = toObj.filter(tobj => tobj.attribute.includes(Attribute.STOP))
        if (stopObj.length > 0) {
          return false;
        } else {
          var pushObj = toObj.filter(tobj => tobj.attribute.includes(Attribute.PUSH));
          if (pushObj.length == 0) {
            obj.x = toX;
            obj.y = toY;
            return true;
          } else {
            if (pushObj.every(tobj => {return this.attemptMove(tobj, allObj, tobj.x, tobj.y, direction)})) {
              obj.x = toX;
              obj.y = toY;
              return true;
            } else {
              return false;
            }
          }
        }
      } else {
        obj.x = toX;
        obj.y = toY;
        return true;
      }
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

export enum Direction {
  NEUTRAL,
  NORTH,
  EAST,
  WEST,
  SOUTH
}