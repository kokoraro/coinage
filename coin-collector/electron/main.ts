import { app, ipcMain } from 'electron';
import { handleSquirrelEvent } from './squirrel-event';

// this should be placed at top of main.js to handle setup events quickly
const stop = handleSquirrelEvent(app);

import * as zip from 'zip-a-folder';
import * as unzip from 'extract-zip'

import { MainWindow } from './main-window';
import { SplashWindow } from './splash-window';

if(!stop) {

  let main: MainWindow;
  let splash: SplashWindow;
  
  const start = (time: number, debug: boolean) => {
    main = new MainWindow(debug);
    splash = new SplashWindow();
    let splashTimeout = setTimeout(() => {
      splash.hide();
      main.show();
      splash.close();
    }, time);
    splash.onCloseinterval(splashTimeout, main);
  }
  
  app.on("ready", () => start(8000, false) );
  
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
  
  app.on("activate", () => {
    if (main.getWindow() === null) {
      main = new MainWindow();
    }
  });
  
  ipcMain.on('zip', (event, args) => {
    const { from, to } = args;
    zip.zipFolder(from, to, (error) => {
      event.sender.send('zip-response', error);
    });
  });
  
  ipcMain.on('unzip', (event, args) => {
    const { from, to } = args;
    unzip(from, { dir: to }, function (error) {
      event.sender.send('unzip-response', error);
     });
  });

}
