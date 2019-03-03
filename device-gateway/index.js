require('dotenv').config();
const debug = require('debug')('App:index');
// fetching the command line arguments
const argv = require('minimist')(process.argv.slice(2));
// fetch config
const config = require('config');
const Motor = require('./motor');

// getting device ID either default one or 
// if given, from config
const motorId = argv.id || config.get('me').defaultId;
debug('Fetched the motor Id:', motorId);

// creating and starting the motor.
const motor = new Motor(motorId);
motor.start(25);