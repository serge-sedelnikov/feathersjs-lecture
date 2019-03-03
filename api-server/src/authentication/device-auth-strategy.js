const { Strategy } = require('passport-custom');
const { ExtractJwt } = require('passport-jwt');
const debug = require('debug')('App:device-auth');

/**
 * Authenticates the device with the device "secret" token.
 */
module.exports = function () {
  /**
   * Decodes token and extracts device ID and Password.
   * @param {*} token Raw token from the request.
   */
  const getDeviceIdAndHashedPassword = token => {
    const encodedStr = Buffer.from(token, 'base64').toString('utf-8');
    const id = encodedStr.slice(0, encodedStr.indexOf(':'));
    const password = encodedStr.slice(encodedStr.indexOf(':') + 1);
    return { id, password };
  };

  /**
     * Fetches token from the request for SocketIO provider
     * @param {*} req Request object.
     */
  const fetchTokenFromSocketIoRequest = req => {
    let token = req.query.accessToken;
    // extract token without `Device ` part
    if (!token || token.indexOf('Device') !== 0) {
      return null; // not valid token provided
    }
    return token.replace('Device ', '');
  };

  return function () {
    /**
     * Verifies the user identity after it is received and sends it to Done if everything is OK.
     * @param {*} req Request.
     * @param {*} done Done callback.
     */
    const verifier = (req, done) => {
      // extract token from the header of the auth
      let token = null;

      // fetch authorization token from the request based on transport provider.
      if (req.params.provider === 'socketio') {
        token = fetchTokenFromSocketIoRequest(req);
      } else if (req.params.provider === 'rest') {
        token = ExtractJwt.fromAuthHeaderWithScheme('Device')(req);
      }

      debug('Fetched token for the device authentication:', token);   

      if (!token) {
        // if no token provided, return empty user.
        return done(null, null);
      }

      // TODO: Decode the token and find device in the database.
      const device = getDeviceIdAndHashedPassword(token);

      // TODO: find device in the database (with cache)
      // TODO: compare device hashed password to the received password.
      //   const hashedPassword = 'xxxxxx'; // TODO: this should come from DB from device table.
      //   const isValid = passwordHasher.validatePassword(
      //     device.password,
      //     hashedPassword
      //   );
      //   if (!isValid) {
      //     return done(null, null); // device is invalid
      //   }

      // TODO: Retrieve device from the Database!
      let res = {
        _id: Date.now(),
        realm: 'device',
        identity: device, // TODO: Find and Decode device from the database.
      };
      return done(null, res);
    };

    // register the strategy into passport.
    this.passport.use('device', new Strategy(verifier));
    // add options to strategy
    this.passport.options('device', {});
  };
};