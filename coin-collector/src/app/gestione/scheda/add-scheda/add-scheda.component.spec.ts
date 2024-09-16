import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchedaComponent } from './add-scheda.component';

describe('AddSchedaComponent', () => {
  let component: AddSchedaComponent;
  let fixture: ComponentFixture<AddSchedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSchedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSchedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
