import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneteTableComponent } from './monete-table.component';

describe('MoneteTableComponent', () => {
  let component: MoneteTableComponent;
  let fixture: ComponentFixture<MoneteTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneteTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
