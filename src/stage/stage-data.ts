export default class StageData{
    data: string[][] = [];
    offsetX: number = 0;
    offsetY: number = 0;
    width: number = 0;
    height: number = 0;
}

export class StageData1 extends StageData {
    constructor(){
        super();
        this.data = 
        [
            ["壁","壁","壁","壁","壁","壁","壁","壁","壁","壁"],
            ["壁","字","空","字","空","壁","空","空","空","壁"],
            ["壁","空","空","空","空","壁","空","空","空","壁"],
            ["壁","空","空","空","空","壁","壁","壁","空","壁"],
            ["壁","空","空","空","空","空","空","空","空","壁"],
            ["壁","空","空","空","空","空","空","空","空","壁"],
            ["壁","空","空","空","空","空","物","空","空","壁"],
            ["壁","空","空","空","空","空","空","空","空","壁"],
            ["壁","空","空","空","空","空","空","空","空","壁"],
            ["壁","壁","壁","壁","壁","壁","壁","壁","壁","壁"],
        ];
        this.offsetX = 36;
        this.offsetY = 36;
        this.width = 10;
        this.height = 10;
    }
}

export class StageData2 extends StageData {
    constructor(){
        super();
        this.data = 
        [
            ["壁","壁","壁","壁","壁","壁","壁","壁","壁","壁"],
            ["壁","空","空","空","空","空","空","空","空","壁"],
            ["壁","空","空","空","空","空","空","空","空","壁"],
            ["壁","空","空","空","空","空","空","空","空","壁"],
            ["壁","空","字","物","物","物","空","空","空","壁"],
            ["壁","空","空","空","空","空","空","空","空","壁"],
            ["壁","空","空","空","空","空","空","空","空","壁"],
            ["壁","空","空","空","空","空","空","空","空","壁"],
            ["壁","空","空","空","空","空","空","空","空","壁"],
            ["壁","壁","壁","壁","壁","壁","壁","壁","壁","壁"],
        ];
        this.offsetX = 36;
        this.offsetY = 36;
        this.width = 10;
        this.height = 10;
    }
}

export class StageDataFactory {
    load(stageId: number): StageData{
        if (stageId == 1) {
            return new StageData1();
        } else if (stageId == 2) {
            return new StageData2();
        } else {
            return new StageData();
        }
    }
}