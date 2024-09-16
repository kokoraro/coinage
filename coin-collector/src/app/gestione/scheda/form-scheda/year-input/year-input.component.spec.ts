import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearInputComponent } from './year-input.component';

describe('YearInputComponent', () => {
  let component: YearInputComponent;
  let fixture: ComponentFixture<YearInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
