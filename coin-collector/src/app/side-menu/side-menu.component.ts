import { Component, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Menu } from 'src/app/interface/interface.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
  animations: [
    trigger('slider', [
      transition(':enter', [
        style({ height: 0, opacity: 0.2 }),
        animate('200ms ease-in', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ height: 0, opacity: 0.2 }))
      ])
    ])
  ]
})
export class SideMenuComponent {

  private _menu: Menu;
  clickedItem: number;

  @Input()
  set menu(menu: Menu) {
    this._menu = menu;
    if(menu) {
      this.clickedItem = (menu.selected != undefined) ? menu.selected : -1;
    }
  }
  get menu(): Menu { return this._menu; }

  constructor() { }

  iconsScale(): string {
    if(this.menu.iconsScale) {
      return 'scale(' + this.menu.iconsScale + ')';
    }
    else {
      return 'scale(1)';
    }
  }

}
