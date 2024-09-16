import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupProgressComponent } from './backup-progress.component';

describe('BackupProgressComponent', () => {
  let component: BackupProgressComponent;
  let fixture: ComponentFixture<BackupProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
