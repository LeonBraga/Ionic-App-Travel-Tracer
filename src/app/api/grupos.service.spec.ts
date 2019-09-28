import { TestBed } from '@angular/core/testing';

import { GruposService } from './grupos.service';

describe('GruposService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GruposService = TestBed.get(GruposService);
    expect(service).toBeTruthy();
  });
});
