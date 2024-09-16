import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchedaComponent } from './edit-scheda.component';

describe('EditSchedaComponent', () => {
  let component: EditSchedaComponent;
  let fixture: ComponentFixture<EditSchedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSchedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSchedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
