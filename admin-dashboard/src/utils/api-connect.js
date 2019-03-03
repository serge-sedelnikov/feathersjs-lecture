import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from "socket.io-client";

const apiUil = 'http://localhost:3030';

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
    // trying to authenticate with local storage JWT token
    const authResult = await app.authenticate();
    return authResult;
}