import { Component, Input } from '@angular/core';
import { MAT_DATE_FORMATS, MatDatepicker } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Moment } from 'moment';

export const YEAR_MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-year-input',
  templateUrl: './year-input.component.html',
  styleUrls: ['./year-input.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: YEAR_MODE_FORMATS },
  ]
})
export class YearInputComponent {

  @Input() max: Date;
  @Input() min: Date;
  @Input() required: string;
  @Input() control: FormControl;
  @Input() placeholder: string = 'Anno';

  annoYearChosen(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    this.control.setValue(normalizedYear);
    datepicker.close();
  }

}
