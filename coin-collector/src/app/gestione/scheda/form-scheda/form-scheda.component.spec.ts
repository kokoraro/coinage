import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSchedaComponent } from './form-scheda.component';

describe('FormSchedaComponent', () => {
  let component: FormSchedaComponent;
  let fixture: ComponentFixture<FormSchedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSchedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSchedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
