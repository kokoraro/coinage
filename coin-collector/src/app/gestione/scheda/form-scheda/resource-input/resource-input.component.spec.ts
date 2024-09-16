import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceInputComponent } from './resource-input.component';

describe('ResourceInputComponent', () => {
  let component: ResourceInputComponent;
  let fixture: ComponentFixture<ResourceInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
