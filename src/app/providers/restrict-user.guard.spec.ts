import { TestBed, async, inject } from '@angular/core/testing';

import { RestrictUserGuard } from './restrict-user.guard';

describe('RestrictUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestrictUserGuard]
    });
  });

  it('should ...', inject([RestrictUserGuard], (guard: RestrictUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
