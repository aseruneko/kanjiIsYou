// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const pathToPhaser = path.join(__dirname, "/node_modules/phaser/");
const phaser = path.join(pathToPhaser, "dist/phaser.js");

module.exports = {
  entry: "./src/index.ts",      //エントリポイント。依存関係整理の起点にするファイル。
  output: {
    path: path.resolve(__dirname, "dist"),    //distというディレクトリに生成する
    filename: "bundle.js"   //バンドルして書き出すファイル名
  },
  module: {
    rules: [
      //.tsがケツにつくファイルを探索し、TypeScriptとして読み込む(ts-loader)
      { test: /\.ts$/, 
        use: "ts-loader", 
        exclude: "/node_modules/" },
      //phaser-hogehoge.jsというファイルの内容はPhaserというグローバル変数に内容を突っ込む(expose-loader)
      { test: /phaser\.js$/, use: {
        loader: "expose-loader", 
        options: {
          exposes: "phaser" 
        }
      }}]},
  //開発用サーバを立てるときの設定
  // devServer: {
  //   contentBase: path.resolve(__dirname, "./"),
  //   publicPath: "/dist/",
  //   host: "127.0.0.1",
  //   port: 8080,
  //   open: true
  // },
  devServer: {
    static: path.resolve(__dirname, "./"),
  },

  resolve: {
    //バンドル対象にするファイルを指定する
    extensions: [".ts", ".js"],
    //import "phaser"ってしたときに読み込みに行くやつを指定する
    alias: {
      phaser: phaser
    }
  }
};