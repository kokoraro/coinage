import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';
import { Subscription } from 'rxjs';

import { InterfaceService, arrangement } from 'src/app/interface/interface.service';
import { Parametro, IndexedDBService } from 'src/app/database/indexed-db.service';
import { HistoryAdd, HistoryDelete, HistorySwap, HistoryEvent } from './parametri.interface';

@Component({
  selector: 'app-parametri',
  templateUrl: './parametri.component.html',
  styleUrls: ['./parametri.component.css']
})
export class ParametriComponent implements OnInit {

  parametri: Parametro[];
  history: Array<HistoryAdd | HistoryDelete | HistorySwap> = [];
  param: string;
  title: string;
  selected = -1;

  arrangement = arrangement.parametri;

  private routeSubscription: Subscription;
  private parametriSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private ui: InterfaceService,
    private db: IndexedDBService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.ui.setTitle("PARAMETRI");
      this.ui.setSelectedItem(this.arrangement);
    }, 1);
    this.routeSubscription = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        if(this.parametriSubscription && !this.parametriSubscription.closed) {
          this.parametriSubscription.unsubscribe();
        }
        this.param = params.get('param'); 
        this.db.getAllParametri(this.param)
          .then((parametri: Parametro[]) => {
            this.parametri = parametri;
          })
          .catch(error => console.error("error in getting parametri: ", error));
        this.parametriSubscription = this.db.trackParametri(this.param).subscribe(parametri => this.parametri = parametri);
        this.history = [];
        const uiState = this.ui.snapshot;
        const index = uiState.menu.items[this.arrangement].menu.items.findIndex(subitem => subitem.link == '/parametri/' + this.param);
        this.title = uiState.menu.items[this.arrangement].menu.items[index].name;
        setTimeout(() => {
          this.ui.setSelectedItem(index, this.arrangement);
        }, 1);
      }
    );
  }

  ngOnDestroy(): void {
    if(this.routeSubscription && !this.routeSubscription.closed) {
      this.routeSubscription.unsubscribe();
    }
    if(this.parametriSubscription && !this.parametriSubscription.closed) {
      this.parametriSubscription.unsubscribe();
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.db.addParameter(this.param, { value: value.trim() })
        .then((key: number) => {
          const historyAdd: HistoryAdd = {
            event: HistoryEvent.ADD,
            index: key
          };
          this.history.push(historyAdd);
        });
    }
    if (input) {
      input.value = '';
    }
  }

  remove(parametro: Parametro): void {
    const historyDelete: HistoryDelete = {
      event: HistoryEvent.DELETE,
      parametro: parametro
    };
    this.history.push(historyDelete);
    this.db.removeParameter(this.param, parametro.id);
  }

  select(index: number): void {
    if(this.selected == index) {
      this.selected = -1;
    }
    else {
      if(this.selected == -1) {
        this.selected = index;
      }
      else {
        const historySwap: HistorySwap = {
          event: HistoryEvent.SWAP,
          x: this.parametri[this.selected],
          y: this.parametri[index]
        };
        this.history.push(historySwap);
        this.db.swapParameters(this.param, this.parametri[this.selected], this.parametri[index]);
        this.selected = -1;
      }
    }
  }

  undo(): void {
    if(this.history.length) {
      const last = this.history.length - 1;
      let h = this.history[last];
      switch(h.event) {
        case HistoryEvent.ADD:
          h = h as HistoryAdd;
          this.db.removeParameter(this.param, h.index);
          break;
        case HistoryEvent.DELETE:
          h = h as HistoryDelete;
          this.db.addParameter(this.param, h.parametro);
          this.selected = -1;
          break;
        case HistoryEvent.SWAP:
          h = h as HistorySwap;
          this.db.swapParameters(this.param, h.x, h.y);
          break;
      }
      this.history.pop();
    }
  }

}
