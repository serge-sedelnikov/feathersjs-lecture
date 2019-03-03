// Initializes the `api/v1/motor_speed` service on path `/api/v1/motor-speed`
const createService = require('./motor_speed.class.js');
const hooks = require('./motor_speed.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/motor-speed', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/v1/motor-speed');

  service.hooks(hooks);
};
