import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonetaDetailsComponent } from './moneta-details.component';

describe('MonetaDetailsComponent', () => {
  let component: MonetaDetailsComponent;
  let fixture: ComponentFixture<MonetaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonetaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonetaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
