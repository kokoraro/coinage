import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { Subscription } from 'rxjs';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

import { InterfaceService, menu } from 'src/app/interface/interface.service';
import { SystemService } from 'src/app/system/system.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  uiState = menu;
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  private uiSubscription: Subscription;

  constructor(
    private key: HotkeysService, 
    private router: Router,
    private ui: InterfaceService,
    private system: SystemService
  ) { }

  ngOnInit() {
    this.ui.setState(this.uiState);
    this.uiSubscription = this.ui.state.subscribe(
      uiState => setTimeout(() => { 
        this.uiState = uiState; 
        if(this.uiState.menu) {
          this.uiState.menu = { ...uiState.menu };
        }
      }, 1)
    );
    this.setKeyEvents();
  }

  ngOnDestroy(): void {
    if(this.uiSubscription && !this.uiSubscription.closed) {
      this.uiSubscription.unsubscribe();
    }
  }

  private setKeyEvents(): void {

    this.key.add(new Hotkey('ctrl+m', (_event: KeyboardEvent): boolean => {
      this.sidenav.toggle();
      return false;
    }));

    this.key.add(new Hotkey('ctrl+l', (_event: KeyboardEvent): boolean => {
      this.router.navigate(['collezione']);
      return false;
    }));

    this.key.add(new Hotkey('ctrl+p', (_event: KeyboardEvent): boolean => {
      this.router.navigate(['parametri/conservazioni']);
      return false;
    }));

    this.key.add(new Hotkey('ctrl+u', (_event: KeyboardEvent): boolean => {
      this.router.navigate(['units/pesi']);
      return false;
    }));

    this.key.add(new Hotkey('ctrl+i', (_event: KeyboardEvent): boolean => {
      this.router.navigate(['resources/images']);
      return false;
    }));

    this.key.add(new Hotkey('ctrl+f', (_event: KeyboardEvent): boolean => {
      this.router.navigate(['resources/invoices']);
      return false;
    }));

    this.key.add(new Hotkey('ctrl+n', (_event: KeyboardEvent): boolean => {
      this.router.navigate(['gestione/add-scheda']);
      return false;
    }));

    this.key.add(new Hotkey('ctrl+b', (_event: KeyboardEvent): boolean => {
      this.router.navigate(['gestione/backup']);
      return false;
    }));

    this.key.add(new Hotkey('ctrl+d', (_event: KeyboardEvent): boolean => {
      this.system.toggleDevTools();
      return false;
    }));

  }

}
