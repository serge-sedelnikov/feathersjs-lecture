// Initializes the `api/v1/set_speed` service on path `/api/v1/set-speed`
const createService = require('./set_speed.class.js');
const hooks = require('./set_speed.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/set-speed', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/v1/set-speed');

  service.hooks(hooks);
};
