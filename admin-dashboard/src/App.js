import React, { Component } from 'react';
import { initializeApiConnection } from './utils/api-connect'


import './App.css';
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      authResult: null
    }
  }

  async componentWillMount(){
    const authResult = await initializeApiConnection();
    this.setState({
      authResult
    });
  }

  render() {
    const { authResult } = this.state;
    return (
      <div className="container-fluid">
        <code>
          {authResult ? 'authenticated!' : 'not authenticated'}
        </code>
      </div>
    );
  }
}

export default App;
