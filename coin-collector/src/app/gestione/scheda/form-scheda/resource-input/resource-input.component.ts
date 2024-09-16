import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SystemService } from 'src/app/system/system.service';
import { Resource } from './resource-input.interface';

@Component({
  selector: 'app-resource-input',
  templateUrl: './resource-input.component.html',
  styleUrls: ['./resource-input.component.css']
})
export class ResourceInputComponent {

  @Input() placeholder = 'Risorsa';
  @Input() required: string;
  @Input() icon: string;
  @Input() dir: string;
  @Input('control') formControl: FormControl = new FormControl();

  private _res: string[];
  @Input('resources') 
  get res(): string[] {
    return this._res;
  }
  set res(resources: string[]) {
    this._res = resources;
    this.getResources()
  }

  resources: Resource[] = [];

  private getResources(): void {
    const resources: Resource[] = [];
    for(let r of this.res) {
      resources.push({
        path: r,
        name: this.system.getFileName(r)
      });
    }
    this.resources = resources;
  }

  constructor(private system: SystemService) { }

  openDialog(): void {
    this.system.openResourceDialog(this.dir)
      .then(file => {
        this.formControl.setValue(file);
      })
      .catch(error => {
        console.error('error in select resource dialog, ', error);
      })
  }

}
