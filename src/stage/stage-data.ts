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
            ["壁","君","空","君","空","壁","空","空","空","壁"],
            ["壁","空","空","空","空","壁","空","空","空","壁"],
            ["壁","空","空","空","空","壁","壁","壁","空","壁"],
            ["壁","空","空","空","空","空","空","空","空","壁"],
            ["壁","空","空","空","空","空","空","空","空","壁"],
            ["壁","空","空","空","空","空","物","空","空","壁"],
            ["壁","空","空","空","空","空","空","終","空","壁"],
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
            ["壁","空","君","物","物","物","空","空","空","壁"],
            ["壁","空","空","空","空","空","空","空","空","壁"],
            ["壁","空","空","空","空","空","空","空","空","壁"],
            ["壁","空","終","空","空","空","空","空","空","壁"],
            ["壁","空","空","空","空","空","空","空","空","壁"],
            ["壁","壁","壁","壁","壁","壁","壁","壁","壁","壁"],
        ];
        this.offsetX = 36;
        this.offsetY = 36;
        this.width = 10;
        this.height = 10;
    }
}

export class StageSoukoban1Data extends StageData {
    stageName: String;
    constructor(){
        super();
        this.data =
        [
            ['壁','壁','壁','壁','壁','壁','壁'],
            ['壁','壁','壁','終','壁','壁','壁'],
            ['壁','壁','空','空','空','壁','壁'],
            ['壁','物','物','空','物','物','壁'],
            ['壁','空','物','物','物','空','壁'],
            ['壁','物','空','空','空','物','壁'],
            ['壁','空','物','物','物','空','壁'],
            ['壁','空','空','君','空','空','壁'],
            ['壁','壁','壁','壁','壁','壁','壁'],
        ];
        this.offsetX = 36;
        this.offsetY = 48;
        this.width = 7;
        this.height = 9;
        this.stageName = '倉庫番1';
    }
}

export class StageDataFactory {
    load(stageId: string): StageData{
        if (stageId == '1') {
            return new StageData1();
        } else if (stageId == '2') {
            return new StageData2();
        } else if (stageId == 'Soukoban1') {
            return new StageSoukoban1Data();
        } else {
            return new StageData();
        }
    }
}