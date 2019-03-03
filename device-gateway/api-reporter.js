const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const auth = require('@feathersjs/authentication-client');
const io = require('socket.io-client');
const config = require('config');
const debug = require('debug')('App:api-reporter');

/**
 * Reports the speed of the motor to API.
 */
class Reporter {

    /**
     * Constructor for the reporting class.
     * @param {*} motorId 
     */
    constructor(motorId) {
        const apiSettings = config.get('api');
        this.apiUrl = apiSettings.url;
        // in production we need to generate some hash or strong passwords for each device
        // for testing we use hardcoded line.
        const base64Token = Buffer.from(`${motorId}:some_random_hash_for_production`).toString('base64');
        this.deviceAuthToken = `Device ${base64Token}`;

        this.motorId = motorId;
    }

    /**
     * Initializes the reporter. Connects to API via WebSockets, authenticates the device. 
     */
    initialize() {
        const socket = io(this.apiUrl, {
            transports: ['websocket']
        });
        const app = feathers();
        socket.on('reconnect_attempt', (attemptNumber) => {
            debug('Reconnecting ', attemptNumber);
        });

        socket.on('connect', async () => {
            debug(`Connected to socket io at ${this.apiUrl}.`);
            debug('Authenticating device...');
            // trying to authenticate with local storage JWT token
            const authResult = await app.authenticate({
                strategy: 'device',
                accessToken: this.deviceAuthToken
            });
            debug(authResult);
        });

        app.configure(socketio(socket));
        app.configure(auth());
        this.app = app;
    }

    /**
     * Reports motor speed to the API backend.
     * @param {*} speed Speed to be reported.
     */
    reportSpeed(speed){
        // compose payload for the API
        const body = {
            motorId: this.motorId,
            speed
        }
        // execute API over web socket
        this.app.service('api/v1/motor_speed').update(body)
        .then(result => {
            debug('Sent updated speed with result:', result);
        })
        .catch(err => {
            debug(err);
        });
    }
}

module.exports = Reporter;