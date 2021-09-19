export default class LoadingScene extends Phaser.Scene {

  private SCENE_WIDTH: number = 640;
  private SCENE_HEIGHT: number = 360;
  private SCENE_X: number = 320;
  private SCENE_Y: number = 180;

    constructor() {
      super({
        key: 'Loading',
      });
    }
    /**アセットを読み込むライフサイクルで呼ばれるメソッド*/
    preload(): void {
      this.add.rectangle(this.SCENE_X, this.SCENE_Y, this.SCENE_WIDTH, this.SCENE_HEIGHT, 0xFFFFFF);
      //ロード中の文面を設定する
      const loadingText = (progress: number): string =>
        `Now Loading ... ${Math.round(progress * 100)}%`;
  
      //テキストオブジェクトを作る
      const currentLoadingText = this.add.text(10, 10, loadingText(0)).setColor('0x000000').setFontFamily('ltgFont');
  
      //ファイルのロードをしていく
      this.load.image('acorn', '../assets/picture.png');
      this.load.image('titleLogo', '../assets/titleLogo.png');
  
      //ロードに進捗があるたびに発生するイベント
      this.load.on('progress', (progress: number) => {
        //テキストの内容を書き換える
        currentLoadingText.text = loadingText(progress);
      });
      //ロードが完了すると発生するイベント
      this.load.on('complete', () => {
        //タイトルシーンへ遷移
        this.scene.start('Title');
      });
    }
  }