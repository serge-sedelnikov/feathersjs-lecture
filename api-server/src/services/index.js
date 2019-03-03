const users = require('./users/users.service.js');
const apiV1MotorSpeed = require('./api/v1/motor_speed/motor_speed.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(apiV1MotorSpeed);
};
