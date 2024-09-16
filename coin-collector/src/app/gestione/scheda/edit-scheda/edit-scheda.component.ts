import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

import { InterfaceService } from 'src/app/interface/interface.service';
import { Moneta, IndexedDBService } from 'src/app/database/indexed-db.service';
import { FormSchedaComponent } from '../form-scheda/form-scheda.component';

@Component({
  selector: 'app-edit-scheda',
  templateUrl: './edit-scheda.component.html',
  styleUrls: ['./edit-scheda.component.css']
})
export class EditSchedaComponent implements OnInit {

  id: string;
  moneta: Moneta;

  private routeSubscription: Subscription;
  private onActionSubscription: Subscription;
  private afterDismissedSubscription: Subscription;

  @ViewChild(FormSchedaComponent) scheda: FormSchedaComponent;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private location: Location,
    private ui: InterfaceService,
    private db: IndexedDBService,
  ) { }

  ngOnInit() {
    this.setMenu();
  } 

  ngOnDestroy(): void {
    if(this.routeSubscription && !this.routeSubscription.closed) {
      this.routeSubscription.unsubscribe();
    }
    if(this.onActionSubscription && !this.onActionSubscription.closed) {
      this.onActionSubscription.unsubscribe();
    }
    if(this.afterDismissedSubscription && !this.afterDismissedSubscription.closed) {
      this.afterDismissedSubscription.unsubscribe();
    }
  }

  private setMenu(): void {
    setTimeout(() => {
      this.ui.setTitle("EDIT SCHEDA");
    }, 1);
    this.routeSubscription = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id'); 
        this.db.getMoneta(+this.id)
          .then(moneta => {
            this.moneta = moneta;
          })
          .catch(error => console.error("error in getting moneta: ", error));
        }
    );
  }

  editMoneta(): void {
    const moneta: Moneta = this.scheda.getMoneta();
    if(moneta) {
      
      this.db.addMoneta(moneta)
        .then(_ => {
          const snack = this.snackBar.open('Moneta modificata!', 'Annulla', { 
            duration: 2000 
          });
          this.onActionSubscription = snack.onAction().subscribe(
            () => {
              this.db.addMoneta(this.moneta).then(
                () => this.snackBar.open('Aggiornamento annullato!', 'Ok', { 
                  duration: 2000
                })
              )
              .catch(error => {
                console.error('error in removing update ', error);
                this.snackBar.open('Impossibile annullare aggiornamento', 'Ok', { 
                  duration: 2000 
                });
              });
            }
          );
          this.afterDismissedSubscription = snack.afterDismissed().subscribe(
            () => this.location.back()
          );
        })
        .catch(error => {
          console.error('error in updating moneta ', error);
          this.snackBar.open('Impossibile modificare moneta', 'Ok', { 
            duration: 2000 
          });
        });
        
    }
  }

}
