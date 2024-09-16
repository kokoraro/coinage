import { Component, OnInit, OnDestroy, Input, HostBinding, Optional, Self, ElementRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NgControl, FormBuilder } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Subscription, Subject } from 'rxjs';

import { Unit } from 'src/app/database/indexed-db.service';
import { Quantity } from '../../scheda.interface';
import { BASICS_PREFIXES } from './default-prefixes';

@Component({
  selector: 'app-quantity-input',
  templateUrl: './quantity-input.component.html',
  styleUrls: ['./quantity-input.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: QuantityInputComponent }
  ]
})
export class QuantityInputComponent implements OnInit, OnDestroy, MatFormFieldControl<Quantity>, ControlValueAccessor {

  private monitorSubscription: Subscription;
  private formSubscription: Subscription;

  @Input() 
  get prefixes(): string[] {
    return this._prefixes;
  };
  set prefixes(value: string[]) {
    value = (value && value.length) ? value : [''];
    this.prefixes = value;
    this.showUnits = this.parseUnits(this.units);
  }
  _prefixes: string[] = BASICS_PREFIXES;

  stateChanges = new Subject<void>();

  @Input() 
  get units(): Unit[] {
    return this._units;
  }
  set units(value: Unit[]) {
    this._units = value;
    this.showUnits = this.parseUnits(value);
    this.stateChanges.next();
  }
  private _units: Unit[];

  showUnits: string[];

  unselected = true;
  quantityForm: FormGroup;

  @Input()
  get value(): Quantity | null {
    const value: Quantity = this.quantityForm.value;
    return ((value.value || value.value == 0) && !!value.unit) ? value : null;
  }
  set value(value: Quantity | null) {
    value = value || new Quantity(null, '');
    this.quantityForm.setValue({ value: value.value, unit: value.unit });
    if(this._onChange) this._onChange(value);
    this.stateChanges.next();
  }

  static nextId = 0;
  @HostBinding() id = `quantity-input-${QuantityInputComponent.nextId++}`;

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(placeholder) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }
  private _placeholder: string;
  
  focused = false;

  get empty() {
    const value = this.quantityForm.value as Quantity;
    return (!value.value && value.value != 0) && !!!value.unit;
  }

  @HostBinding('class.quantity-floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(required: boolean) {
    const temp: any = required;
    required = (temp != "true");
    this._required = required;
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    const temp: any = disabled;
    disabled = (temp != "true");
    this._disabled = disabled;
    this.setDisable();
    this.stateChanges.next();
  }
  private _disabled = false;

  errorState = false;
  controlType = 'quantity-input';

  @HostBinding('attr.aria-describedby') describedBy = '';
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if(!this.disabled) {
      this._onTouched();
    }
   }

   writeValue(value: Quantity): void {
    if(value instanceof Quantity) {
      this.quantityForm.setValue(value);
    }
  }

  _onChange: (_: any) => void;
  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  _onTouched: () => void;
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private setDisable(): void {
    if(this.disabled && this.quantityForm) {
      this.quantityForm.disable();
    }
    else if(this.quantityForm) {
      this.quantityForm.enable();
    }
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl, 
    private fb: FormBuilder, 
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>
  ) {
    if(this.ngControl != null) { 
      this.ngControl.valueAccessor = this; 
    }
    this.monitorSubscription = fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngOnInit() {
    this.quantityForm = this.fb.group({
      value: null,
      unit: ''
    });
    this.setDisable();
    this.formSubscription = this.quantityForm.valueChanges.subscribe(
      () => {
        const value = this.value;
        if(this._onChange) this._onChange(value);
        this.stateChanges.next();
      }
    );
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
    if(this.monitorSubscription && !this.monitorSubscription.closed) {
      this.monitorSubscription.unsubscribe();
    }
    if(this.formSubscription && !this.formSubscription.closed) {
      this.formSubscription.unsubscribe();
    }
  }

  getUnselectedColor(): string {
    return this.unselected ? '#999' : '#000';
  }

  setUnselected(select): void {
    this.unselected = !!!select.value;
  }

  private parseUnitPrefixes(unit: Unit): string[] {
    let units: string[] = [];
    if(unit.prefix) {
      for(let i = 0; i < this.prefixes.length; i++) {
        units.push(this.prefixes[i] + unit.unit);
      }
    }
    else {
      units.push(unit.unit);
    }
    return units;
  }

  private parseUnits(units: Unit[]): string[] {
    let result: string[] = [];
    if(units) {
      for(let i = 0; i < units.length; i++) {
        result = [ ...result, ...this.parseUnitPrefixes(units[i])];
      }
    }
    return result;
  }

}
