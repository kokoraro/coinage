import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

import { SystemService } from 'src/app/system/system.service';
import { Moneta, IndexedDBService } from 'src/app/database/indexed-db.service';

@Component({
  selector: 'app-moneta-details',
  templateUrl: './moneta-details.component.html',
  styleUrls: ['./moneta-details.component.css']
})
export class MonetaDetailsComponent implements OnInit {

  defaultImage = false;

  private onActionSubscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public moneta: Moneta,
    private dialogRef: MatDialogRef<MonetaDetailsComponent>,
    private router: Router,
    private snackBar: MatSnackBar,
    public domSanitazer: DomSanitizer, 
    private db: IndexedDBService,
    private system: SystemService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.onActionSubscription && !this.onActionSubscription.closed) {
      this.onActionSubscription.unsubscribe();
    }
  }

  getDataAcquisto(): string {
    const date = new Date(this.moneta.dataAcquisto);
    return date.toLocaleDateString();
  }

  dismiss(): void {
    this.dialogRef.close();
  }

  edit(): void {
    this.dialogRef.close();
    setTimeout(() => this.router.navigate(['gestione/edit-scheda/' + this.moneta.id]), 500);
  }

  delete(): void {
    this.dialogRef.close();
    this.db.removeMoneta(this.moneta.id)
        .then(() => {
          const snack = this.snackBar.open('Moneta rimossa!', 'Annulla', { 
            duration: 2000 
          });
          this.onActionSubscription = snack.onAction().subscribe(
            () => {
              this.db.addMoneta(this.moneta).then(
                id => this.snackBar.open('Moneta riaggiunta!', 'Ok', { 
                  duration: 2000
                })
              )
              .catch(error => {
                console.error('error in readding moneta ', error);
                this.snackBar.open('Impossibile riaggiungere moneta', 'Ok', { 
                  duration: 2000 
                });
              });
            }
          );
        })
        .catch(error => {
          console.error('error in removing moneta ', error);
          this.snackBar.open('Impossibile rimuovere moneta', 'Ok', { 
            duration: 2000 
          });
        });
  }

  openImmagine(): void {
    this.system.openFile(this.moneta.immagine)
      .then(() => console.log("File with path " + this.moneta.immagine + " opened succesfully"))
      .catch(error => {
        console.error('error in opening file with path ' + this.moneta.immagine, error);
        this.snackBar.open('Errore: Impossibile aprire file', 'Ok', { 
          duration: 2000,
          panelClass: ['error_snack'] 
        });
      });
  }

  openFattura(): void {
    this.system.openFile(this.moneta.fattura)
      .then(() => console.log("File with path " + this.moneta.fattura + " opened succesfully"))
      .catch(error => {
        console.error('error in opening file with path ' + this.moneta.fattura, error);
        this.snackBar.open('Errore: Impossibile aprire file', 'Ok', { 
          duration: 2000,
          panelClass: ['error_snack'] 
        });
      });
  }

}
