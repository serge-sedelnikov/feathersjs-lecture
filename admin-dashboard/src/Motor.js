import React, { Component } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer
} from 'recharts';
import moment from 'moment';
import classnames from 'classnames';
import { Pictogram } from '@storaensods/se-design-system';


/**
 * Renders motor as text and chart.
 */
class MotorComponent extends Component {

    /**
     * Creates an instance of the motor component,
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            speedLogLength: 50
        };
        this.speedLog = [];

    }

    /**
     * On component updated.
     */
    componentDidUpdate() {
        // we want to store the speed into array for log
        const { speed } = this.props;
        const { speedLogLength } = this.state;
        let newSpeedLog = this.speedLog || [];
        if (newSpeedLog.length < speedLogLength) {
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
        // we don't need to put it into state
        // as setting state would trigger re-render and this is not allowed in the 
        // componentDidUpdate method.
        // this is good anti-pattern if you need to save something into memory without triggering render
        this.speedLog = newSpeedLog;
    }

    /**
     * Renders one motor details.
     */
    render() {
        const { id, speed, updateTime } = this.props;
        const { speedLog } = this;

        const chartData = speedLog.map((speed, index) => {
            return { index, speed }
        });

        const mUpdateTime = moment(updateTime);
        const diffSec = moment().diff(mUpdateTime, 'seconds');

        return (
            <div>
                <div className="d-flex align-items-center ml-4">
                    <h3 className="text-uppercase mr-2">{id}</h3>

                    {/* Last speed reported */}
                    <div className="d-inline-flex p-1 bd-highlight">
                        <div>
                            <Pictogram name="production_speed" />
                        </div>
                        <p className="motor-speed-text">{speed.toFixed(2)}</p>
                    </div>
                    {/* /Last speed reported */}

                    {/* Last time updated */}
                    <div className={classnames("d-inline-flex p-1 ml-1 bd-highlight",
                    {
                        'success': diffSec < 20,
                        'warning': diffSec >= 20 && diffSec < 60,
                        'danger': diffSec >= 60
                    })}>
                        <div>
                            <Pictogram name="time_reports" />
                        </div>
                        <p className="motor-speed-text">{moment(updateTime).fromNow()}</p>
                    </div>
                    {/* / Last time updated */}
                </div>

                <div className="mt-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="index" />
                            <YAxis />
                            <Tooltip />
                            <Line dot={false} type="monotone" dataKey="speed" stroke="#67B419" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )
    }

}

export default MotorComponent;