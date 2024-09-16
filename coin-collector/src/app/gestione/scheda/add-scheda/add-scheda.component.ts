import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

import { InterfaceService, arrangement } from 'src/app/interface/interface.service';
import { IndexedDBService, Moneta } from 'src/app/database/indexed-db.service';
import { FormSchedaComponent } from '../form-scheda/form-scheda.component';

@Component({
  selector: 'app-add-scheda',
  templateUrl: './add-scheda.component.html',
  styleUrls: ['./add-scheda.component.css']
})
export class AddSchedaComponent implements OnInit {

  @ViewChild(FormSchedaComponent) scheda: FormSchedaComponent;

  private arrangement = arrangement.gestione;

  private onActionSubscription: Subscription;
  private afterDismissedSubscription: Subscription;

  constructor(
    private snackBar: MatSnackBar,
    private ui: InterfaceService,
    private db: IndexedDBService,
  ) { }

  ngOnInit() {
    this.setMenu();
  } 

  ngOnDestroy() {
    if(this.onActionSubscription && !this.onActionSubscription.closed) {
      this.onActionSubscription.unsubscribe();
    }
    if(this.afterDismissedSubscription && !this.afterDismissedSubscription.closed) {
      this.afterDismissedSubscription.unsubscribe();
    }
  }

  private setMenu(): void {
    setTimeout(() => {
      this.ui.setTitle("NUOVA SCHEDA");
      this.ui.setSelectedItem(this.arrangement);
      this.ui.setSelectedItem(0, this.arrangement);
    }, 1);
  }

  addMoneta(): void {
    const moneta: Moneta = this.scheda.getMoneta();
    if(moneta) {
      
      this.db.addMoneta(moneta)
        .then(id => {
          const snack = this.snackBar.open('Moneta aggiunta!', 'Annulla', { 
            duration: 2000 
          });
          this.onActionSubscription = snack.onAction().subscribe(
            () => {
              this.db.removeMoneta(id).then(
                () => this.snackBar.open('Moneta rimossa!', 'Ok', { 
                  duration: 2000
                })
              )
              .catch(error => {
                console.error('error in removing moneta ', error);
                this.snackBar.open('Impossibile rimuovere moneta', 'Ok', { 
                  duration: 2000 
                });
              });
            }
          );
          this.afterDismissedSubscription = snack.afterDismissed().subscribe(
            () => this.scheda.reset()
          );
        })
        .catch(error => {
          console.error('error in adding moneta ', error);
          this.snackBar.open('Impossibile aggiungere moneta', 'Ok', { 
            duration: 2000 
          });
        });
        
    }
  }

}
