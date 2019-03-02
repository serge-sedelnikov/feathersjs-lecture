import React, { Component } from 'react';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from "socket.io-client";


import './App.css';
class App extends Component {

  signInToServer(){
    const winOpenProps = "toolbar=0,status=0,width=548,height=425";
    const win = window.open('http://localhost:3030/auth/github', 'Sign In to Feathers', winOpenProps);
    const interval = setInterval(() => {
      if(win.closed){
        console.log('Sign in window is closed, trying to use JWT saved in local storage');
        clearInterval(interval);
      }
    }, 500);
  }

  componentDidMount(){
    console.log('Connecting to SocketIO for real time notifications...');
    const socketEndpoint = 'http://localhost:3030';
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
    app.authenticate();
  }

  render() {
    return (
      <div>
        <button onClick={this.signInToServer.bind(this)}>Login With GitHub</button>
      </div>
    );
  }
}

export default App;
