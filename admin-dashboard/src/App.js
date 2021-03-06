import React, { Component } from 'react';
import { throttle } from 'lodash';

import { initializeApiConnection, onMotorSpeedReported } from './utils/api-connect'
import Motor from './Motor';
import Navigation from './Header';

import './App.css';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authResult: null,
      motors: []
    }
  }

  /**
   * Handles the motor reported speed
   * @param {*} motorId 
   * @param {*} speed 
   */
  handleMotorSpeedReported(motorId, speed) {

    const { motors } = this.state;
    const indexOfMotor = motors.findIndex(motor => motor.motorId === motorId);
    if (indexOfMotor === -1) {
      this.setState({
        motors: [
          ...motors,
          { motorId, speed }
        ]
      })
    } else {
      this.setState({
        motors: [
          ...motors.slice(0, indexOfMotor),
          { motorId, speed, updateTime: new Date() },
          ...motors.slice(indexOfMotor + 1)
        ]
      });
    }
  }

  /**
   * Before component mount, connect to API, register callbacks.
   */
  async componentWillMount() {
    const authResult = await initializeApiConnection();
    this.setState({
      authResult
    });

    // register the callback to see when motor changes the speed
    // notice that we here are slowing down the reaction
    // using lodash throttle function and allow executing
    // the callback not often than every 200ms
    // we may loose some motor values but it is OK for overall picture.
    const throttledCallback = throttle(this.handleMotorSpeedReported.bind(this), 200);
    onMotorSpeedReported(throttledCallback);
  }

  render() {
    const { authResult, motors } = this.state;
    return (
      <div>
        <Navigation />
        <div className="container-fluid">
          <code>
            {!authResult && 'not authenticated'}
          </code>

          <div className="row mt-2">
            {motors.map(({ motorId, speed, updateTime }) => {
              return (
                <div key={motorId} className="col-md-6">
                  <Motor id={motorId} speed={speed} updateTime={updateTime} />
                </div>
              )
            })}
          </div>

        </div>
      </div>
    );
  }
}

export default App;
