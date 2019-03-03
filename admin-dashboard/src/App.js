import React, { Component } from 'react';
import { initializeApiConnection, onMotorSpeedReported } from './utils/api-connect'


import './App.css';
class App extends Component {

  constructor(props){
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
  handleMotorSpeedReported(motorId, speed){
    this.setState({
      motors: [
        {motorId, speed}
      ]
    })
  }

  /**
   * Before component mount, connect to API, register callbacks.
   */
  async componentWillMount(){
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
          {authResult ? 'authenticated!' : 'not authenticated'}
        </code>

        { motors.map(({motorId, speed}) => {
          return <div key={motorId}>
            {motorId} {speed}
          </div>
        }) }
      </div>
    );
  }
}

export default App;
