const app = require('../../../../src/app');

describe('\'api/v1/set_speed\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/v1/set-speed');
    expect(service).toBeTruthy();
  });
});
