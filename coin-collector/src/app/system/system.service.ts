import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { ChildProcessService } from 'ngx-childprocess';
import { ChildProcess } from 'ngx-childprocess/src/childProcess.interface';
import { FsService } from 'ngx-fs';
import { Subject, Observable } from 'rxjs';

import { IndexedDBService, Parametro, Unit, Moneta } from 'src/app/database/indexed-db.service';
import { SnackType, SnackMessage } from './snack.interface';
import { Backup, BACKUP_PROPERTIES_COUNT } from './backup.interface';

export { SnackType, SnackMessage } from './snack.interface';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private app: Electron.App;
  private dialog: Electron.Dialog;
  private webContents: Electron.WebContents;
  private ipcRenderer: Electron.IpcRenderer;
  private childProcess: ChildProcess;
  private fs: any;
  private path: {
    basename: (p: string, ext?: string) => string;
    join: (...paths: string[]) => string;
    normalize: (p: string) =>  string;
  }

  private userDataPath: string;
  private messageSubject = new Subject<SnackMessage>();
  private progressSubject = new Subject<string>();

  constructor(
    private electron: ElectronService, 
    childProcess: ChildProcessService, 
    private db: IndexedDBService,    
    fs: FsService, 
  ) {
    this.app = this.electron.remote.app;
    this.dialog = this.electron.remote.dialog;
    this.webContents = this.electron.remote.getCurrentWebContents();
    this.ipcRenderer = this.electron.ipcRenderer;
    this.childProcess = childProcess.childProcess;
    this.fs = fs.fs;
    this.userDataPath = this.app.getPath('userData');
    const path = electron.remote.require('path');
    this.path = {
      basename: path.basename,
      join: path.join,
      normalize: path.normalize
    }
  }

  /* GENERAL METHODS  */

  private makeFolderIfNotExists(folder: string): void {
    try {
      const exists = this.fs.existsSync(this.path.join(this.userDataPath, folder));
      if(!exists) {
        try {
          this.fs.mkdirSync(this.path.join(this.userDataPath, folder));
        } 
        catch(error) {
          const snackMessage: SnackMessage = {
            type: SnackType.ERROR,
            message: 'Errore: impossibile creare la cartella ' + folder,
            log: 'error in making ' + folder + 'dir, ',
            object: error
          }
          this.messageSubject.next(snackMessage);
        }
      }
    }
    catch(error) {
      const snackMessage: SnackMessage = {
        type: SnackType.ERROR,
        message: 'Errore: impossibile controllare esistenza cartella ' + this.userDataPath,
        log: 'error in checking existance of ' + this.userDataPath,
        object: error
      }
      this.messageSubject.next(snackMessage);
    }
  }

  private makePathIfNotExists(path: string): void {
    const parts: string[] = path.replace(/\\/g, '/').split('/');
    let current = '';
    for(let part of parts) {
      current = this.path.join(current, part);
      this.makeFolderIfNotExists(current);
    }
  }

  private copyDirectory(src: string, dest: string): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        this.fs.readdir(this.path.join(this.userDataPath, src), (error, files) => {
          if(error) {
            const snackMessage: SnackMessage = {
              type: SnackType.ERROR,
              message: 'Errore: impossibile leggere cartella ' + src,
              log: 'error in reading ' + src + 'dir, ',
              object: error
            }
            this.messageSubject.next(snackMessage);
            reject(error);
          }
          else {
            let done = 0;
            const size = files.length;
            if(size == 0) resolve();
            files.forEach(file => {
              const from = this.path.join(this.userDataPath, src, file);
              const to = this.path.join(this.userDataPath, dest, file);
              this.fs.copyFile(from, to, error => {
                if(error) {
                  const snackMessage: SnackMessage = {
                    type: SnackType.ERROR,
                    message: 'Errore: impossibile copiare file da ' + from + ' a ' + to,
                    log: 'error in copying file from ' + from + ' to ' + to,
                    object: error
                  }
                  this.messageSubject.next(snackMessage);
                  reject(error);
                }
                else {
                  if(++done == size) {
                    resolve();
                  }
                }
              });
            });
          }
        });
      }
    );
  }

  getMessageObservable(): Observable<SnackMessage> {
    return this.messageSubject.asObservable();
  }

  getProgressObservable(): Observable<string> {
    return this.progressSubject.asObservable();
  }

  getFileName(path: string): string {
    return this.path.basename(path);
  }

  openFile(path: string): Promise<void> {

    function getCommand(): string {
      switch (process.platform) { 
         case 'darwin': 
          return 'open';
         case 'win32': 
          return 'start "Dummy title"';
         case 'linux': 
          return 'xdg-open';
         default:
          console.warn("Unknown process platform " + process.platform);
          return null;
      }
   }

    return new Promise<void>(
      (resolve, reject) => {
        const openCommand = getCommand();
        if(openCommand) {
          this.childProcess.exec(openCommand + ' "' + path + '"', null, (error, _stdout, _stderr) => {
            if(error) {
              reject(error);
            }
          })
          .on('close', _code => {
            resolve();
          });
        }
        else {
          reject('error: unknown process platform');
        }
      }
    );
  }

  /* RESOURCES METHODS */

  private getTitle(resource: string): string {
    switch(resource) {
      case 'images':
        return 'immagini';
      case 'invoices':
        return 'fatture';
      default:
        return '';
    }
  }

  private getExtensionFilters(resource: string): Electron.FileFilter[] {
    switch(resource) {
      case 'images':
        return [{ name: 'Immagini', extensions: ['jpg', 'png'] }];
      case 'invoices':
        return [{ name: 'Documenti', extensions: ['jpg', 'png', 'pdf'] }];
      default:
        return [];
    }
  }

  private checkPath(resource: string, path: string): boolean {
    const expected = this.path.join(this.userDataPath, resource, this.path.basename(path));
    return (path == expected);
  }

  openResourceFolder(resource: string): void {
    this.makeFolderIfNotExists(resource);
    this.openFile(this.path.join(this.userDataPath, resource))
      .catch(error => console.error("error in opening resource folder: ", error));
  }

  addResource(resource: string): void {
    this.dialog.showOpenDialog({
      title: 'Aggiungi ' + this.getTitle(resource),
      properties: ['openFile', 'multiSelections'],
      filters: this.getExtensionFilters(resource),
      buttonLabel: 'Aggiungi'
    }, files => {
      if(files && files.length) {
        this.makeFolderIfNotExists(resource);
        for(let file of files) {
          const fileName = this.getFileName(file);
          const target = this.path.join(this.userDataPath, resource, fileName);
          this.fs.copyFile(file, target, error => {
            if(error) {
              const snackMessage: SnackMessage = {
                type: SnackType.ERROR,
                message: 'Errore:  impossibile copiare file',
                log: 'error in copying file ' + file,
                object: error
              }
              this.messageSubject.next(snackMessage);
            }
            else {
              const snackMessage: SnackMessage = {
                type: SnackType.SUCCESS,
                message: 'File copiato con successo',
                log: 'successfully copied file to ' + target
              }
              this.messageSubject.next(snackMessage);
            }
          });
        }
      }
    });
  }

  getResources(resource: string): string[] {
    try {
      this.makeFolderIfNotExists(resource);
      const files: string[] = this.fs.readdirSync(this.path.join(this.userDataPath, resource));
      return files.map(file => this.path.join(this.userDataPath, resource, file));
    }
    catch(error) {
      console.error('error in reading dir ' + this.userDataPath, error);
      return [];
    }
  }

  openResourceDialog(resource: string): Promise<string> {
    return new Promise<string>(
      (resolve, reject) => {
        this.dialog.showOpenDialog({
          title: 'Seleziona ' + this.getTitle(resource),
          defaultPath: this.path.join(this.userDataPath, resource),
          properties: ['openFile'],
          filters: this.getExtensionFilters(resource),
          buttonLabel: 'Seleziona'
        }, (files) => {
          if(files && files.length) {
            const file = files[0];
            if(this.checkPath(resource, file))  {
              resolve(file);
            }
            else {
              reject('error: you must select only files in the resources directory');
            }
          }
        });
      }
    );
  }

  private clearDir(path: string, delDir?: boolean): void {
    try {
      const exists = this.fs.existsSync(path);
      if(exists) {
        try {
          const files = this.fs.readdirSync(path);
          for(const file of files) {
            const filePath = this.path.join(path, file);
            const isDir = this.fs.lstatSync(filePath).isDirectory();
            if(isDir) {
                this.clearDir(filePath, true);
            }
            else {
              try {
                this.fs.unlinkSync(filePath);
              }
              catch(error) {
                const snackMessage: SnackMessage = {
                  type: SnackType.ERROR,
                  message: 'Errore: impossibile eliminare file ' + filePath,
                  log: 'error in removing file with path ' + filePath,
                  object: error
                }
                this.messageSubject.next(snackMessage);
              }
            }
          }
        }
        catch(error) {
          const snackMessage: SnackMessage = {
            type: SnackType.ERROR,
            message: 'Errore: impossibile leggere cartella temp',
            log: 'error in reading temp dir',
            object: error
          }
          this.messageSubject.next(snackMessage);
        }
      }
    }
    catch(error) {
      const snackMessage: SnackMessage = {
        type: SnackType.ERROR,
        message: 'Errore: impossibile controllare se esiste temp',
        log: 'error in checking temp dir existance',
        object: error
      }
      this.messageSubject.next(snackMessage);
    }
    if(delDir) {
      this.fs.rmdirSync(path);
    }
  }

  /* BACKUP METHODS */

  private cloneDB(): Promise<Backup> {

    let conservazioni: Parametro[];
    let contorni: Parametro[];
    let denominazioni: Parametro[];
    let materiali: Parametro[];
    let rarita: Parametro[];
    let segniZecche: Parametro[];
    let sovranita: Parametro[];
    let sovrani: Parametro[];
    let stati: Parametro[];
    let nominali: Parametro[];
    let zecche: Parametro[];
    let pesi: Unit[];
    let lunghezze: Unit[];
    let monete: Moneta[];
    let count = 0;

    function doResolve(resolve): void {
      if(++count == BACKUP_PROPERTIES_COUNT) {
        const backup: Backup = {
          conservazioni: conservazioni,
          contorni: contorni,
          denominazioni: denominazioni,
          materiali: materiali,
          rarita: rarita,
          segniZecche: segniZecche,
          sovranita: sovranita,
          sovrani: sovrani,
          stati: stati,
          nominali: nominali,
          zecche: zecche,
          pesi: pesi,
          lunghezze: lunghezze,
          monete: monete
        }
        resolve(backup);
      }
    }

    return new Promise<Backup>(
      (resolve, reject) => {
        
        this.db.getAllParametri('conservazioni')
          .then(result => {
            conservazioni = result;
            doResolve(resolve);
          })
          .catch(error => reject(error));
        this.db.getAllParametri('contorni')
          .then(result => {
            contorni = result;
            doResolve(resolve);
          })
          .catch(error => reject(error));
        this.db.getAllParametri('denominazioni')
          .then(result => {
            denominazioni = result;
            doResolve(resolve);
          })
          .catch(error => reject(error));
        this.db.getAllParametri('materiali')
          .then(result => {
            materiali = result;
            doResolve(resolve);
          })
          .catch(error => reject(error));
        this.db.getAllParametri('rarita')
          .then(result => {
            rarita = result;
            doResolve(resolve);
          })
          .catch(error => reject(error));
        this.db.getAllParametri('segniZecche')
          .then(result => {
            segniZecche = result;
            doResolve(resolve);
          })
          .catch(error => reject(error));
        this.db.getAllParametri('sovranita')
          .then(result => {
            sovranita = result;
            doResolve(resolve);
          })
          .catch(error => reject(error));
        this.db.getAllParametri('sovrani')
          .then(result => {
            sovrani = result;
            doResolve(resolve);
          })
          .catch(error => reject(error));
        this.db.getAllParametri('stati')
          .then(result => {
            stati = result;
            doResolve(resolve);
          })
          .catch(error => reject(error));
        this.db.getAllParametri('nominali')
          .then(result => {
            nominali = result;
            doResolve(resolve);
          })
          .catch(error => reject(error));
        this.db.getAllParametri('zecche')
          .then(result => {
            zecche = result;
            doResolve(resolve);
          })
          .catch(error => reject(error));
        this.db.getAllUnits('pesi')
          .then(result => {
            pesi = result;
            doResolve(resolve);
          })
          .catch(error => reject(error));
        this.db.getAllUnits('lunghezze')
          .then(result => {
            lunghezze = result;
            doResolve(resolve);
          })
          .catch(error => reject(error));
        this.db.getAllMonete()
          .then(result => {
            monete = result;
            doResolve(resolve);
          })
          .catch(error => reject(error));
      }

    );
  }

  private createBackupFile(backup: Backup): void {
    this.makePathIfNotExists('temp/backup');
    const backupText = JSON.stringify(backup);
    const path = this.path.join(this.userDataPath, 'temp', 'backup', 'backup.json');
    try {
      this.fs.writeFileSync(path, backupText);
    }
    catch(error) {
      const snackMessage: SnackMessage = {
        type: SnackType.ERROR,
        message: 'Errore: impossibile creare file di backup ' + path,
        log: 'error in making ' + path + 'dir, ',
        object: error
      }
      this.messageSubject.next(snackMessage);
    }
  }

  private createBackupResource(resource: string): Promise<void> {
    this.makeFolderIfNotExists(resource);
    this.makePathIfNotExists(this.path.join('temp', 'backup', resource));
    return this.copyDirectory(resource, this.path.join('temp', 'backup', resource));
  }

  private saveBackup(): Promise<string> {
    return new Promise<string>(
      (resolve, reject) => {
        this.dialog.showSaveDialog({
          title: 'Salva backup',
          filters: [{ name: 'Compressione', extensions: ['zip'] }],
          buttonLabel: 'Salva'
        }, (path) => {
          if(path) {
            resolve(path);
          }
          else {
            reject("no path selected for backup");
          }
        });
      }
    );
  }

  private zipDir(from: string, to: string): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        const listener = (_event, error) => {
          this.ipcRenderer.removeListener('zip-response', listener);
          if(error) {
            reject(error);
          }
          else {
            resolve();
          }
        };
        this.ipcRenderer.on('zip-response', listener);
        this.ipcRenderer.send('zip', { from: from, to: to });
      }
    );
  }

  private selectBackup(): Promise<string> {
    return new Promise<string>(
      (resolve, reject) => {
        this.dialog.showOpenDialog({
          title: 'Seleziona backup',
          properties: ['openFile'],
          filters: [{ name: 'Compressione', extensions: ['zip'] }],
          buttonLabel: 'Seleziona'
        }, (file) => {
          if(file && file.length) {
            resolve(file[0]);
          }
          else {
            reject("no backup selected");
          }
        });
      }
    );
  }

  private unzipDir(from: string, to: string): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        const listener = (_event, error) => {
          this.ipcRenderer.removeListener('unzip-response', listener);
          if(error) {
            reject(error);
          }
          else {
            resolve();
          }
        };
        this.ipcRenderer.on('unzip-response', listener);
        this.ipcRenderer.send('unzip', { from: from, to: to });
      }
    );
  }

  private executeBackupResource(resource: string): Promise<void> {
    this.makeFolderIfNotExists(resource);
    this.makePathIfNotExists(this.path.join('temp', 'backup', resource));
    return this.copyDirectory(this.path.join('temp', 'backup', resource), resource);
  }

  private checkBackup(backup: any): boolean {
    return (
      backup && 
      backup.conservazioni && 
      backup.contorni &&
      backup.denominazioni &&
      backup.lunghezze &&
      backup.materiali &&
      backup.monete &&
      backup.nominali &&
      backup.pesi &&
      backup.rarita &&
      backup.segniZecche &&
      backup.sovrani &&
      backup.sovranita &&
      backup.stati &&
      backup.zecche
    ) ? true : false;
  }

  private readBackupFile(): Promise<Backup> {
    return new Promise<Backup>(
      (resolve, reject) => {
        try {
          const text: string = this.fs.readFileSync(this.path.join(this.userDataPath, 'temp', 'backup', 'backup.json'), 'utf8');
          const backup: any = JSON.parse(text);
          if(this.checkBackup(backup)) {
            resolve(backup as Backup);
          }
          else {
            reject({ error: 'Object in backup.json is not of type Backup' });
          }
        }
        catch(error) {
          reject(error);
        }
      }
    );
  }

  private clearDB(): Promise<void> {

    let count = 0;
    function doResolve(resolve): void {
      if(++count == BACKUP_PROPERTIES_COUNT) {
        resolve();
      }
    }

    return new Promise<void>(
      (resolve, reject) => {
        
        this.db.removeAllParametri('conservazioni')
          .then(() => doResolve(resolve))
          .catch(error => reject(error));
        this.db.removeAllParametri('contorni')
          .then(() => doResolve(resolve))
          .catch(error => reject(error));
        this.db.removeAllParametri('denominazioni')
          .then(() => doResolve(resolve))
          .catch(error => reject(error));
        this.db.removeAllParametri('materiali')
          .then(() => doResolve(resolve))
          .catch(error => reject(error));
        this.db.removeAllParametri('rarita')
          .then(() => doResolve(resolve))
          .catch(error => reject(error));
        this.db.removeAllParametri('segniZecche')
          .then(() => doResolve(resolve))
          .catch(error => reject(error));
        this.db.removeAllParametri('sovranita')
          .then(() => doResolve(resolve))
          .catch(error => reject(error));
        this.db.removeAllParametri('sovrani')
          .then(() => doResolve(resolve))
          .catch(error => reject(error));
        this.db.removeAllParametri('stati')
          .then(() => doResolve(resolve))
          .catch(error => reject(error));
        this.db.removeAllParametri('nominali')
          .then(() => doResolve(resolve))
          .catch(error => reject(error));
        this.db.removeAllParametri('zecche')
          .then(() => doResolve(resolve))
          .catch(error => reject(error));
        this.db.removeAllUnits('pesi')
          .then(() => doResolve(resolve))
          .catch(error => reject(error));
        this.db.removeAllUnits('lunghezze')
          .then(() => doResolve(resolve))
          .catch(error => reject(error));
        this.db.removeAllMonete()
          .then(() => doResolve(resolve))
          .catch(error => reject(error));
      }

    );

  }

  private executeBackupDB(backup: Backup): Promise<void> {

    let count = 0;
    function doResolve(resolve): void {
      if(++count == BACKUP_PROPERTIES_COUNT) {
        resolve();
      }
    }

    return new Promise<void>(
      (resolve, reject) => {
        
        this.db.addParametri('conservazioni', backup.conservazioni)
          .then(_ => doResolve(resolve))
          .catch(error => reject(error));
        this.db.addParametri('contorni', backup.contorni)
          .then(_ => doResolve(resolve))
          .catch(error => reject(error));
        this.db.addParametri('denominazioni', backup.denominazioni)
          .then(_ => doResolve(resolve))
          .catch(error => reject(error));
        this.db.addParametri('materiali', backup.materiali)
          .then(_ => doResolve(resolve))
          .catch(error => reject(error));
        this.db.addParametri('rarita', backup.rarita)
          .then(_ => doResolve(resolve))
          .catch(error => reject(error));
        this.db.addParametri('segniZecche', backup.segniZecche)
          .then(_ => doResolve(resolve))
          .catch(error => reject(error));
        this.db.addParametri('sovranita', backup.sovranita)
          .then(_ => doResolve(resolve))
          .catch(error => reject(error));
        this.db.addParametri('sovrani', backup.sovrani)
          .then(_ => doResolve(resolve))
          .catch(error => reject(error));
        this.db.addParametri('stati', backup.stati)
          .then(_ => doResolve(resolve))
          .catch(error => reject(error));
        this.db.addParametri('nominali', backup.nominali)
          .then(_ => doResolve(resolve))
          .catch(error => reject(error));
        this.db.addParametri('zecche', backup.zecche)
          .then(_ => doResolve(resolve))
          .catch(error => reject(error));
        this.db.addUnits('pesi', backup.pesi)
          .then(_ => doResolve(resolve))
          .catch(error => reject(error));
        this.db.addUnits('lunghezze', backup.lunghezze)
          .then(_ => doResolve(resolve))
          .catch(error => reject(error));
        this.db.addMonete(backup.monete)
          .then(_ => doResolve(resolve))
          .catch(error => reject(error));
      }

    );

  }

  createBackup(): void {
    this.clearDir(this.path.join(this.userDataPath, 'temp'));
    this.cloneDB()
      .then(backup => {
        this.progressSubject.next('Preparazione backup in corso...');
        this.createBackupFile(backup);
        this.createBackupResource('images')
          .then(() => {
            this.createBackupResource('invoices')
              .then(() => {
                this.progressSubject.next(null);
                this.saveBackup()
                  .then(destination => {
                    this.progressSubject.next('Compressione backup in corso...');
                    this.zipDir(this.path.join(this.userDataPath, 'temp', 'backup'), destination)
                      .then(() => {
                        this.clearDir(this.path.join(this.userDataPath, 'temp'));
                        this.progressSubject.next(null);
                        const snackMessage: SnackMessage = {
                          type: SnackType.SUCCESS,
                          message: 'Backup creato con successo',
                          log: 'backup created succesfully!!!'
                        }
                        this.messageSubject.next(snackMessage);
                      })
                      .catch(error => {
                        this.progressSubject.next(null);
                        this.clearDir(this.path.join(this.userDataPath, 'temp'));
                        const snackMessage: SnackMessage = {
                          type: SnackType.ERROR,
                          message: 'Errore: impossibile comprimere cartella',
                          log: 'error: cannot zip backup folder',
                          object: error
                        }
                        this.messageSubject.next(snackMessage);
                      });
                })
                .catch(error => {
                  const snackMessage: SnackMessage = {
                    type: SnackType.ERROR,
                    message: 'Errore: nessun percorso specificato',
                    log: 'error: no path selected for backup',
                    object: error
                  }
                  this.messageSubject.next(snackMessage);
                  this.clearDir(this.path.join(this.userDataPath, 'temp'));
                });
              });
          });
      })
      .catch(error => {
        this.progressSubject.next(null);
        const snackMessage: SnackMessage = {
          type: SnackType.ERROR,
          message: 'Errore: impossibile ricavare dati dal database',
          log: 'error: cannot get db data',
          object: error
        }
        this.messageSubject.next(snackMessage);
      });
  }

  executeBackup(): void {
    this.clearDir(this.path.join(this.userDataPath, 'temp'));
    this.makePathIfNotExists(this.path.join('temp', 'backup'));
    this.selectBackup()
      .then(path => {
        this.progressSubject.next('Decompressione backup in corso...');
        this.unzipDir(path, this.path.join(this.userDataPath, 'temp', 'backup'))
          .then(() => {
            this.progressSubject.next('Esecuzione backup in corso...');
            this.clearDir(this.path.join(this.userDataPath, 'images'));
            this.clearDir(this.path.join(this.userDataPath, 'invoices'));
            this.executeBackupResource('images')
              .then(() => {
                this.executeBackupResource('invoices')
                  .then(() => {
                    this.progressSubject.next(null);
                    this.readBackupFile()
                      .then(backup => {
                        this.clearDB()
                        .then(() => {
                          this.executeBackupDB(backup)
                            .then(() => {
                              this.clearDir(this.path.join(this.userDataPath, 'temp'));
                              this.progressSubject.next(null);
                              const snackMessage: SnackMessage = {
                                type: SnackType.SUCCESS,
                                message: 'Backup ripristinato con successo',
                                log: 'backup executed succesfully!!!'
                              }
                              this.messageSubject.next(snackMessage);
                            })
                            .catch(error => {
                              const snackMessage: SnackMessage = {
                                type: SnackType.ERROR,
                                message: 'Errore: impossibile eseguire backup database, dati perduti',
                                log: 'error: cannot execute db backup, data lost',
                                object: error
                              }
                              this.messageSubject.next(snackMessage);
                              this.progressSubject.next(null);
                            });
                        })
                        .catch(error => {
                          const snackMessage: SnackMessage = {
                            type: SnackType.ERROR,
                            message: 'Errore: impossibile eliminare database',
                            log: 'error: cannot clear database',
                            object: error
                          }
                          this.messageSubject.next(snackMessage);
                          this.progressSubject.next(null);
                        });
                      })
                      .catch(error => {
                        const snackMessage: SnackMessage = {
                          type: SnackType.ERROR,
                          message: 'Errore: impossibile leggere file di backup',
                          log: 'error: cannot read backup.json file',
                          object: error
                        }
                        this.messageSubject.next(snackMessage);
                        this.progressSubject.next(null);
                      });
                  });
              });
          })
          .catch(error => {
            const snackMessage: SnackMessage = {
              type: SnackType.ERROR,
              message: 'Errore: impossibile decomprimere file di backup',
              log: 'error: cannot unzip backup file',
              object: error
            }
            this.messageSubject.next(snackMessage);
            this.progressSubject.next(null);
          });
      })
      .catch(error => {
        this.progressSubject.next(null);
        const snackMessage: SnackMessage = {
          type: SnackType.ERROR,
          message: 'Errore: nessun percorso specificato',
          log: 'error: no path selected for backup',
          object: error
        }
        this.messageSubject.next(snackMessage);
      });
  }

  /* DEVTOOLS METHODS */

  toggleDevTools(): void {
    if(this.webContents.isDevToolsOpened()) {
      this.webContents.closeDevTools();
    }
    else {
      this.webContents.openDevTools();
    }
  }
  
}
