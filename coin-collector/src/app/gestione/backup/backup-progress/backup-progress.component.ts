import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'app-backup-progress',
  templateUrl: './backup-progress.component.html',
  styleUrls: ['./backup-progress.component.css']
})
export class BackupProgressComponent {

  text: string;
  spinnerDiameter = 80;

  constructor(@Inject(MAT_DIALOG_DATA) text: string, media: ObservableMedia) {
    this.text = text;
    media.subscribe(() => { this.spinnerDiameter = media.isActive('lt-sm') ? 50 : 80 });
  }

}
