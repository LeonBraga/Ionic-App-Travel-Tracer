import { TestBed } from '@angular/core/testing';

import { ExtractService } from './extract.service';

describe('ExtractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtractService = TestBed.get(ExtractService);
    expect(service).toBeTruthy();
  });
});
