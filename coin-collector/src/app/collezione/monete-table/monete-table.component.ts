import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Moneta, IndexedDBService } from 'src/app/database/indexed-db.service';
import { Column } from './monete-table.interface';

@Component({
  selector: 'app-monete-table',
  templateUrl: './monete-table.component.html',
  styleUrls: ['./monete-table.component.css']
})
export class MoneteTableComponent implements OnInit {

  @Output('select') selectEmitter = new EventEmitter<Moneta>();

  private _monete: Moneta[] = [];
  @Input() get monete(): Moneta[] {
    return this._monete;
  }
  set monete(monete: Moneta[]) {
    this._monete = monete;
    this.dataSource = new MatTableDataSource(monete)
    this.dataSource.sort = this.sort;
  }

  filterControl = new FormControl('');
  caseControl = new FormControl(false);

  dataSource: MatTableDataSource<Moneta>;
  displayedColumns: string[];
  columns: Column[] = [
    {
      name: 'codice',
      display: 'Cod',
      footer: () => 'Quantità:',
      paddingRight: true
    },
    {
      name: 'stato',
      display: 'Stato',
      footer: () => (this.dataSource) ? this.dataSource.data.length.toString() : ''
    },
    {
      name: 'nominale',
      display: 'Nominale',
      footer: () => 'Tot Acquisto:',
      paddingRight: true
    },
    {
      name: 'anno',
      display: 'Anno',
      footer: () => {
        let tot = 0;
        if(this.dataSource) {
          this.dataSource.data.forEach(moneta => tot += moneta.prezzoAcquisto ? moneta.prezzoAcquisto : 0);
        }
        return '€ ' + tot.toFixed(2);
      }
    },
    {
      name: 'zecca',
      display: 'Zecca'
    },
    {
      name: 'segnoZecca',
      display: 'S Zec',
      footer: () => 'Tot Valore:',
      paddingRight: true
    },
    {
      name: 'tiratura',
      display: 'Tiratura',
      footer: () => {
        let tot = 0;
        if(this.dataSource) {
          this.dataSource.data.forEach(moneta => tot += moneta.valore);
        }
        return '€ ' + tot.toFixed(2);
      }
    },
    {
      name: 'rarita',
      display: 'Rarità'
    },
    {
      name: 'conservazione',
      display: 'Cons'
    },
    {
      name: 'valore',
      display: 'Valore',
      value: (m: Moneta) => '€ ' + m.valore.toFixed(2)
    }
  ];

  @ViewChild(MatSort) sort: MatSort;

  private filterSubscription: Subscription;
  private caseSubscription: Subscription;
  private onActionSubscription: Subscription;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private db: IndexedDBService
  ) { }

  ngOnInit() {
    this.displayedColumns = this.columns.map(column => column.name);
    this.displayedColumns.push('azioni');
    this.filterSubscription = this.filterControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(
        (result: string) => {
          this.filter();
        }
      );
    this.caseSubscription = this.caseControl.valueChanges.subscribe( () => this.filter() );
  }

  ngOnDestroy() {
    if(this.filterSubscription && !this.filterSubscription.closed) {
      this.filterSubscription.unsubscribe();
    }
    if(this.caseSubscription && !this.caseSubscription.closed) {
      this.caseSubscription.unsubscribe();
    }
    if(this.onActionSubscription && !this.onActionSubscription.closed) {
      this.onActionSubscription.unsubscribe();
    }
  }

  private filter() {
    const filter: string = this.filterControl.value;
    let filtered: Moneta[];
    if(filter) {
      const filt = filter.toLocaleLowerCase();     
      filtered = this.monete.filter(moneta => {
        const keys = Object.keys(moneta).filter(key => key != 'immagine' && key != 'fattura');
        for(let key of keys) {
          let filt = filter;
          let compareString = (new String(moneta[key]));
          if(!this.caseControl.value) {
            compareString = compareString.toLocaleLowerCase();
            filt = filt.toLocaleLowerCase();
          }
          if(compareString.indexOf(filt) != -1) {
            return true;
          }
        }
        return false;
      });
    }
    else {
      filtered = this.monete;
    }
    this.dataSource = new MatTableDataSource(filtered);
    this.dataSource.sort = this.sort;
  }

  edit(id: number): void {
    this.router.navigate(['gestione/edit-scheda/' + id]);
  }

  delete(moneta: Moneta): void {
    this.db.removeMoneta(moneta.id)
        .then(() => {
          const snack = this.snackBar.open('Moneta rimossa!', 'Annulla', { 
            duration: 2000 
          });
          this.onActionSubscription = snack.onAction().subscribe(
            () => {
              this.db.addMoneta(moneta).then(
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

  select(moneta: Moneta): void {
    this.selectEmitter.emit(moneta);
  }

}
