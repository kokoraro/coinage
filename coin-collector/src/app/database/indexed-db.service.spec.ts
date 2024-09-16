import { TestBed } from '@angular/core/testing';

import { IndexedDBService } from './indexed-db.service';

describe('IndexedDBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndexedDBService = TestBed.get(IndexedDBService);
    expect(service).toBeTruthy();
  });
});
