require('dotenv').config();
const debug = require('debug')('App:index');
// fetching the command line arguments
const argv = require('minimist')(process.argv.slice(2));
// fetch config
const config = require('config');
const Motor = require('./motor');
const Reporter = require('./api-reporter');

// getting device ID either default one or 
// if given, from config
const motorId = argv.id || config.get('me').defaultId;
debug('Fetched the motor Id:', motorId);

// create reporter to connect physical motor with API
// we split the logic of Motor and Reporter to keep code clean
// and follow OOP principles

const reporter = new Reporter(motorId);
reporter.initialize();

// creating and starting the motor.
const motor = new Motor(motorId);
// start motor at the random speed
const speed = 10 + Math.random() * 90; // from 10 to 100
motor.start(speed);

// each motor populate the speed on reported callback, subscribe to it to report speed to the API

setTimeout(() => {
    motor.changeSpeed(40);
}, 3000)

setTimeout(() => {
    motor.changeSpeed(10);
}, 4000)