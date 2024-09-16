import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';
import { Subscription } from 'rxjs';

import { InterfaceService, arrangement } from 'src/app/interface/interface.service';
import { Unit, IndexedDBService } from 'src/app/database/indexed-db.service';
import { HistoryAdd, HistoryDelete, HistorySwap, HistoryEvent, HistoryToggle } from './units.interface';


@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {

  units: Unit[];
  history: Array<HistoryAdd | HistoryDelete | HistorySwap | HistoryToggle> = [];
  unit: string;
  title: string;
  selected = -1;

  private arrangement = arrangement.units;

  private unitsSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private ui: InterfaceService,
    private db: IndexedDBService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.ui.setTitle("UNITÀ");
      this.ui.setSelectedItem(this.arrangement);
    }, 1);
    this.routeSubscription = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        if(this.unitsSubscription && !this.unitsSubscription.closed) {
          this.unitsSubscription.unsubscribe();
        }
        this.unit = params.get('unit'); 
        this.db.getAllUnits(this.unit)
          .then((units: Unit[]) => {
            this.units = units;
          })
          .catch(error => console.error("error in getting units: ", error));
        this.unitsSubscription = this.db.trackUnits(this.unit).subscribe(units => this.units = units);
        this.history = [];
        const tbState = this.ui.snapshot;
        const index = tbState.menu.items[this.arrangement].menu.items.findIndex(subitem => subitem.link == '/units/' + this.unit);
        this.title = tbState.menu.items[this.arrangement].menu.items[index].name;
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
    if(this.unitsSubscription && !this.unitsSubscription.closed) {
      this.unitsSubscription.unsubscribe();
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.db.addUnit(this.unit, { unit: value.trim() })
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

  remove(Unit: Unit): void {
    const historyDelete: HistoryDelete = {
      event: HistoryEvent.DELETE,
      unit: Unit
    };
    this.history.push(historyDelete);
    this.db.removeParameter(this.unit, Unit.id);
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
          x: this.units[this.selected],
          y: this.units[index]
        };
        this.history.push(historySwap);
        this.db.swapUnits(this.unit, this.units[this.selected], this.units[index]);
        this.selected = -1;
      }
    }
  }

  togglePrefix(): void {
    const unit: Unit = this.units[this.selected];
    const historyToggle: HistoryToggle = {
      event: HistoryEvent.TOGGLE,
      unit: unit
    };
    this.history.push(historyToggle);
    this.db.toggleUnit(this.unit, unit);
  }

  undo(): void {
    if(this.history.length) {
      const last = this.history.length - 1;
      let h = this.history[last];
      switch(h.event) {
        case HistoryEvent.ADD:
          h = h as HistoryAdd;
          this.db.removeParameter(this.unit, h.index);
          break;
        case HistoryEvent.DELETE:
          h = h as HistoryDelete;
          this.db.addUnit(this.unit, h.unit);
          this.selected = -1;
          break;
        case HistoryEvent.SWAP:
          h = h as HistorySwap;
          this.db.swapUnits(this.unit, h.x, h.y);
          break;
        case HistoryEvent.TOGGLE:
          h = h as HistoryToggle;
          this.db.toggleUnit(this.unit, { ...h.unit, prefix: !h.unit.prefix });
          break;
      }
      this.history.pop();
    }
  }

}
