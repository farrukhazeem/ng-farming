import { SuperSupervisorsModule } from './super-supervisors.module';

describe('SuperSupervisorsModule', () => {
  let superSupervisorsModule: SuperSupervisorsModule;

  beforeEach(() => {
    superSupervisorsModule = new SuperSupervisorsModule();
  });

  it('should create an instance', () => {
    expect(superSupervisorsModule).toBeTruthy();
  });
});
