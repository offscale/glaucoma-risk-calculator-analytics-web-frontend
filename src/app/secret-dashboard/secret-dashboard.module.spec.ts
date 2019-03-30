import { SecretDashboardModule } from './secret-dashboard.module';

describe('SecretDashboardModule', () => {
  let secretDashboardModule: SecretDashboardModule;

  beforeEach(() => {
    secretDashboardModule = new SecretDashboardModule();
  });

  it('should create an instance', () => {
    expect(secretDashboardModule).toBeTruthy();
  });
});
