import { TestBed, async, inject } from '@angular/core/testing';

import { SupervisorRestrictGuard } from './supervisor-restrict.guard';

describe('SupervisorRestrictGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupervisorRestrictGuard]
    });
  });

  it('should ...', inject([SupervisorRestrictGuard], (guard: SupervisorRestrictGuard) => {
    expect(guard).toBeTruthy();
  }));
});
