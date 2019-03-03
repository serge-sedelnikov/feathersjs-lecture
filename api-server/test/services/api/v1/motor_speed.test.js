const app = require('../../../../src/app');

describe('\'api/v1/motor_speed\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/v1/motor-speed');
    expect(service).toBeTruthy();
  });
});
