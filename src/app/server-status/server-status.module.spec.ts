import { ServerStatusModule } from './server-status.module';

describe('ServerStatusModule', () => {
  let serverStatusModule: ServerStatusModule;

  beforeEach(() => {
    serverStatusModule = new ServerStatusModule();
  });

  it('should create an instance', () => {
    expect(serverStatusModule).toBeTruthy();
  });
});
