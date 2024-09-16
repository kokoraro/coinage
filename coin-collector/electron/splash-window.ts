import { BrowserWindow } from "electron";
import * as path from 'path';
import * as url from 'url';

import { MainWindow } from "./main-window";

export class SplashWindow {

  private win: BrowserWindow;

  private init(): void {
    this.win = new BrowserWindow({
      width: 670,
      height: 280,
      frame: false
    });
  }

  private load(): void {
    this.win.loadURL(
      url.format({
        pathname: path.join(__dirname, `splashscreen/index.html`),
        protocol: "file:",
        slashes: true
      })
    );
  }

  onCloseinterval(timeout: NodeJS.Timer, main: MainWindow): void {
    this.win.on("closed", () => {
      if(!main.opened) {
        main.close();
        clearTimeout(timeout);
      }
      this.win = null;
    });
  }

  hide(): void {
    this.win.hide();
  }

  close(): void {
      this.win.close();
  }

  constructor() {
    this.init();
    this.load();
  }

}
