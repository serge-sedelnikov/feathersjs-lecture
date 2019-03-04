import React, { Component } from 'react';

/**
 * Renders motor as text and chart.
 */
class MotorComponent extends Component {

    /**
     * Renders one motor details.
     */
    render(){
        const { id, speed } = this.props;
        return (
            <div>
                <h3>{id}</h3>
                <span>{speed}</span>
            </div>
        )
    }

}

export default MotorComponent;