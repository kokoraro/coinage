import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollezioneComponent } from './collezione.component';

describe('CollezioneComponent', () => {
  let component: CollezioneComponent;
  let fixture: ComponentFixture<CollezioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollezioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollezioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
