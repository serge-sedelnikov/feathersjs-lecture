import React, { Component } from 'react';

/**
 * Renders motor as text and chart.
 */
class MotorComponent extends Component {

    /**
     * Creates an instance of the motor component,
     * @param {*} props 
     */
    constructor(props){
        super(props);
        this.state = {
            speedLogLength: 5
        };
    }

    /**
     * On component updated.
     */
    componentDidUpdate(){
        const { speed } = this.props;
        const { speedLogLength } = this.state;
        let newSpeedLog = this.speedLog || [];
        if(newSpeedLog.length < speedLogLength){
            newSpeedLog = [
                ...newSpeedLog,
                speed.toFixed(2)
            ]
        } else {
            newSpeedLog = [
                ...newSpeedLog.slice(1),
                speed.toFixed(2)
            ]
        }
        this.speedLog = newSpeedLog;
    }

    /**
     * Renders one motor details.
     */
    render(){
        const { id, speed } = this.props;
        const { speedLog } = this;
        return (
            <div>
                <h3>{id}</h3>
                <span>{speed.toFixed(2)}</span>
                <pre>{JSON.stringify(speedLog)}</pre>
            </div>
        )
    }

}

export default MotorComponent;