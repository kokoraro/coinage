import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

import { SystemService, SnackMessage, SnackType } from 'src/app/system/system.service';
import { InterfaceService, arrangement } from 'src/app/interface/interface.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  resource: string;
  title: string;

  private arrangement = arrangement.risorse;

  private routeSubscription: Subscription;
  private messageSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private zone: NgZone,
    private ui: InterfaceService,
    private system: SystemService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.ui.setTitle('RISORSE');
      this.ui.setSelectedItem(this.arrangement);
    }, 1);
    this.routeSubscription = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.resource = params.get('res'); 
        const tbState = this.ui.snapshot;
        const index = tbState.menu.items[this.arrangement].menu.items.findIndex(subitem => subitem.link == '/resources/' + this.resource);
        this.title = tbState.menu.items[this.arrangement].menu.items[index].name;
        setTimeout(() => {
          this.ui.setSelectedItem(index, this.arrangement);
        }, 1);
      }
    );
    this.snackbarSubscription();
  } 

  ngOnDestroy(): void {
    if(this.routeSubscription && !this.routeSubscription.closed) {
      this.routeSubscription.unsubscribe();
    }
    if(this.messageSubscription && !this.messageSubscription.closed) {
      this.messageSubscription.unsubscribe();
    }
  }

  private displaySuccess(snackMessage: SnackMessage): void {
    this.zone.run(() => {
      this.snackBar.open(snackMessage.message, 'Ok', { 
        duration: 3000,
        panelClass: ['success_snack'] 
      });
    });
    if(snackMessage.object) {
      console.log(snackMessage.log, snackMessage.object);
    }
    else {
      console.log(snackMessage.log);
    }
  }

  private displayError(snackMessage: SnackMessage): void {
    this.zone.run(() => {
      this.snackBar.open(snackMessage.message, 'Ok', { 
        duration: 2000,
        panelClass: ['error_snack'] 
      });
    });
    if(snackMessage.object) {
      console.error(snackMessage.log, snackMessage.object);
    }
    else {
      console.error(snackMessage.log);
    }
  }

  private snackbarSubscription(): void {
    const observer = this.system.getMessageObservable();
    this.messageSubscription = observer.subscribe(
      snackMessage => {
        switch(snackMessage.type) {
          case SnackType.SUCCESS:
            this.displaySuccess(snackMessage);
            break;
          case SnackType.ERROR:
            this.displayError(snackMessage);
            break;
        }
      }
    );
  }

  resourceSingolar(): string {
    return (this.resource == 'images') ? 'immagine' : 'fattura';
  }

  resourcePlural(): string {
    return (this.resource == 'images') ? 'immagini' : 'fatture';
  }

  openResourceFolder(): void {
    this.system.openResourceFolder(this.resource);
  }
  
  addResource(): void {
    this.system.addResource(this.resource);
  }
}
