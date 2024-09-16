import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { InterfaceService } from 'src/app/interface/interface.service';
import { Moneta, IndexedDBService, ambiti } from 'src/app/database/indexed-db.service';
import { MonetaDetailsComponent } from './moneta-details/moneta-details.component';

@Component({
  selector: 'app-collezione',
  templateUrl: './collezione.component.html',
  styleUrls: ['./collezione.component.css']
})
export class CollezioneComponent implements OnInit {

  private ambiti = ambiti;

  private routeSubscription: Subscription;
  private moneteSubscription: Subscription;

  title = '';
  monete: Moneta[] = [];

  constructor( 
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private ui: InterfaceService,
    private db: IndexedDBService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.ui.setTitle("COLLEZIONE");
      this.ui.setSelectedItem(0);
    }, 0);
    this.routeSubscription = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        if(this.moneteSubscription && !this.moneteSubscription.closed) {
          this.moneteSubscription.unsubscribe();
        }
        const ambito = params.get('ambito');
        this.getMonete(ambito);
        this.moneteSubscription = this.db.trackMonete().subscribe(monete => this.getMonete(ambito));
      }
    );
  }

  ngOnDestroy() {
    if(this.routeSubscription && !this.routeSubscription.closed) {
      this.routeSubscription.unsubscribe();
    }
    if(this.moneteSubscription && !this.moneteSubscription.closed) {
      this.moneteSubscription.unsubscribe();
    }
  }

  private getMonete(ambito: string): void {
    if(ambito) {
      this.db.getMonete(ambito)
        .then(monete => {
          console.log('getted monete by ambito ' + ambito + ' succesfully', monete);
          this.title = this.ambiti.find(a => a.id == ambito).display;
          this.monete = monete;
        })
        .catch(error => {
          console.error('error in getting monete by ambito ' + ambito, error);
        });
    }
    else {
      this.db.getAllMonete()
        .then(monete => {
          console.log('getted all monete succesfully', monete);
          this.title = 'Monete';
          this.monete = monete;
        })
        .catch(error => {
          console.error('error in getting all monete ', error);
        });
    }
  }

  openDialog(moneta: Moneta) {
    this.dialog.open(MonetaDetailsComponent, { data: moneta, width: '95vw', maxWidth: '95vw' });
  }

}
