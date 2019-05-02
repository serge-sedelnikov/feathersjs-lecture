# Introduction

This project is demonstrating the FeathersJS Socket IO Server and Clients.

# API

To run it locally navigate to API folder and run

```
npm install
npm start
```

# Device Emulator

To run it locally navigate to Gateway folder and run

```
npm install
node index.js --id=<id>
```

where `<id>` is a string of your device ID, can be anything, for instance `my-device`.

# User Interface Dashboard

To run it locally navigate to client application folder and run

```
npm install
npm start
```

It will start the react development server and will try to connect to API via Socket IO at the address of `http://localhost:3030`. Make sure that the API is running at this URL.

# User Interface Authentication

If you see `Not authenticated` message on the running UI app, you need to authenticate yourself with github account. Navigate to

```
http://localhost:3030/auth/github
```

Feathers API will redirect you to the github sign in page, it uses OAuth claim-based authentication, your password will never be delivered to the Feathers API, it will receive only your claims like user name and email. 

Once authenticatedm it will store the `authorization token` in the browser local storage and UI will fetch it from there on next restart.
