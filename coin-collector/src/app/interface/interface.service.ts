import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Interface } from './interface.interface';

export { menu } from './menu';
export { arrangement } from './arrangement.interface';
export { Interface } from './interface.interface';
export { Menu, MenuItem } from './menu.interface';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {

  private _state: Interface;
  get snapshot(): Interface {
    return this._state;
  }
  private state$ = new Subject<Interface>();
  get state(): Subject<Interface> {
    return this.state$;
  }

  setState(state: Interface): void {
    this._state = state;
    this.state.next(state);
  }

  setTitle(title: string): void {
    this._state.title = title;
    this.state.next(this._state);
  }

  setSelectedItem(selected: number, ...index: number[]): void {
    let menuRef = this._state.menu;
    for(let i of index) {
      menuRef = menuRef.items[i].menu;
    }
    menuRef.selected = selected;
    this.state.next(this._state);
  }

}
