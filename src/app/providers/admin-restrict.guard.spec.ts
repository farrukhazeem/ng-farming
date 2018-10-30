import { TestBed, async, inject } from '@angular/core/testing';

import { AdminRestrictGuard } from './admin-restrict.guard';

describe('AdminRestrictGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminRestrictGuard]
    });
  });

  it('should ...', inject([AdminRestrictGuard], (guard: AdminRestrictGuard) => {
    expect(guard).toBeTruthy();
  }));
});
