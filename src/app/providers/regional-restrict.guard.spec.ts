import { TestBed, async, inject } from '@angular/core/testing';

import { RegionalRestrictGuard } from './regional-restrict.guard';

describe('RegionalRestrictGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegionalRestrictGuard]
    });
  });

  it('should ...', inject([RegionalRestrictGuard], (guard: RegionalRestrictGuard) => {
    expect(guard).toBeTruthy();
  }));
});
