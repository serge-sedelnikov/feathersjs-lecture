import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from "socket.io-client";

const apiUil = 'http://localhost:3030';
// array of callbacks to call when motor reported the speed.
const motorSpeedReportedCallbacks = [];
// application instance for future usage
let __app = null;

/**
 * Initializes the connection to API server.
 */
export async function initializeApiConnection() {

    console.log('Connecting to SocketIO for real time notifications...');
    const socketEndpoint = apiUil;
    const socket = io(socketEndpoint, {
        transports: ['websocket']
    });
    const app = feathers();
    __app = app;

    socket.on('connect', () => {
        console.log(`Connected to socket io at ${socketEndpoint}.`);
    });
    socket.on('disconnect', (error) => {
        console.error('Socket IO disconnected', error);
    })

    app.configure(socketio(socket));
    app.configure(auth({
        storage: window.localStorage
    }));

    // subscribe for the motor speed report method, 
    // call all registered callbacks
    app.service('api/v1/motor-speed').on('updated', (data) => {
        // we expect the object with the properties
        // id: "Motor1"
        // speed: 34.68086776263067
        // call all registered callbacks
        motorSpeedReportedCallbacks.forEach(callback => callback(data.id, data.speed));
    })

    // trying to authenticate with local storage JWT token
    const authResult = await app.authenticate();
    return authResult;
}

/**
 * Sends new motor speed value to the API server.
 */
export async function sendNewMotorSpeed(motorId, newSpeed){
    // we expect that app is already created by initialization method
    // execute command method
    const commandResult = await __app.service('api/v1/set-speed').update(motorId, {speed: newSpeed});
    console.log(commandResult);
}

/**
 * Registers the callback to execute when motor reported the speed.
 * @param {*} callback Function callback to be called on motor reports it's speed.
 */
export function onMotorSpeedReported(callback){
    motorSpeedReportedCallbacks.push(callback);
}