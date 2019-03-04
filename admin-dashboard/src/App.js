import React, { Component } from 'react';
// Using CSS
import '@storaensods/se-design-system/dist/css/styles.css';

import { initializeApiConnection, onMotorSpeedReported } from './utils/api-connect'
import Motor from './Motor';

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
          ...motors.splice(0, indexOfMotor),
          { motorId, speed },
          ...motors.splice(indexOfMotor + 1)
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
    onMotorSpeedReported(this.handleMotorSpeedReported.bind(this));
  }

  render() {
    const { authResult, motors } = this.state;
    return (
      <div className="container-fluid">
        <code>
          {!authResult && 'not authenticated'}
        </code>

        {motors.map(({ motorId, speed }) => {
          return <Motor key={motorId} id={motorId} speed={speed} />
        })}
      </div>
    );
  }
}

export default App;
