import { Component, OnInit, NgZone } from '@angular/core';
import { MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { InterfaceService } from 'src/app/interface/interface.service';
import { SystemService, SnackMessage, SnackType } from 'src/app/system/system.service';
import { BackupProgressComponent } from './backup-progress/backup-progress.component';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {

  progressDialog: MatDialogRef<BackupProgressComponent, string>;

  private messageSubscription: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private zone: NgZone,
    private ui: InterfaceService, 
    private system: SystemService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.ui.setTitle("BACKUP");
      this.ui.setSelectedItem(4);
      this.ui.setSelectedItem(1, 4);
    }, 1);
    this.snackbarSubscription();
    this.progressbarSubscription();
  } 

  ngOnDestroy() {
    if(this.messageSubscription && !this.messageSubscription.closed) {
      this.messageSubscription.unsubscribe();
    }
  }

  private displaySuccess(snackMessage: SnackMessage): void {
    this.zone.run(() => {
      this.snackBar.open(snackMessage.message, 'Ok', { 
        duration: 3000,
        panelClass: ['success_snack'] 
      });
    });
    if(snackMessage.object) {
      console.log(snackMessage.log, snackMessage.object);
    }
    else {
      console.log(snackMessage.log);
    }
  }

  private displayError(snackMessage: SnackMessage): void {
    this.zone.run(() => {
      this.snackBar.open(snackMessage.message, 'Ok', { 
        duration: 2000,
        panelClass: ['error_snack'] 
      });
    });
    if(snackMessage.object) {
      console.error(snackMessage.log, snackMessage.object);
    }
    else {
      console.error(snackMessage.log);
    }
  }

  private snackbarSubscription(): void {
    const observer = this.system.getMessageObservable();
    this.messageSubscription = observer.subscribe(
      snackMessage => {
        switch(snackMessage.type) {
          case SnackType.SUCCESS:
            this.displaySuccess(snackMessage);
            break;
          case SnackType.ERROR:
            this.displayError(snackMessage);
            break;
        }
      }
    );
  }

  private progressbarSubscription(): void {
    const observer = this.system.getProgressObservable();
    observer.subscribe(text => this.openProgressDialog(text));
  }

  private openProgressDialog(text: string) {
    if(text == null) {
      if(this.progressDialog) {
        this.progressDialog.close();
        this.progressDialog = null;
      }
    }
    else {
      if(this.progressDialog) {
        this.progressDialog.componentInstance.text = text; 
      }
      else {
        this.progressDialog = this.dialog.open(BackupProgressComponent, { data: text, disableClose: true });
      }
    }
  }

  newBackup() {
    this.system.createBackup();
  }

  execBackup() {
    this.system.executeBackup();
  }

}
