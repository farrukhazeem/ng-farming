import { RegionalSupervisorModule } from './regional-supervisor.module';

describe('RegionalSupervisorModule', () => {
  let regionalSupervisorModule: RegionalSupervisorModule;

  beforeEach(() => {
    regionalSupervisorModule = new RegionalSupervisorModule();
  });

  it('should create an instance', () => {
    expect(regionalSupervisorModule).toBeTruthy();
  });
});
