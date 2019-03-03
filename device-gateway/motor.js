const debug = require('debug')('App:Motor');
/**
 * Motor emulator.
 */
class Motor {

    // In real life motor can be connected via controller and controlled via serial port, GPIO, TCP, etc.
    // we are emulating it.

    /**
     * Constructor.
     * @param {*} motorId Motor Id.
     */
    constructor(motorId) {
        this.motorId = motorId;
        this.speed = 0;
        // medium speed for all motors in the system
        this._equalizeSpeed = 50;

    }

    /**
     * Default method that is executed when speed is reported.
     * @param {*} speed Speed that was reported by motor. 
     */
    onSpeedReported(speed) {
        debug('Speed reported.', speed);
    }

    /**
     * Starts the motor.
     */
    start(initialSpeed) {
        this.speed = initialSpeed;

        this.interval = setInterval(() => {
            const randomizeSign = Date.now() % 2 === 0;
            // randomize speed a bit to emulate the real motor work
            this.speed = this.speed + (randomizeSign ? Math.random() : -Math.random())
            this.onSpeedReported(this.speed)
        }, 200);
    }

    /**
     * Changes the motor speed.
     * @param {*} newSpeed New speed of the motor.
     */
    changeSpeed(newSpeed){
        // we want to emulate speed change over time,
        // lets sat for motor it takes 1 sec to speed up or slow down
        const speedChangeStep = (newSpeed - this.speed)/100.0;
        let iteration = 0;
        const speedChangeInterval = setInterval(() => {
            this.speed += speedChangeStep;
            iteration += 1;
            if(iteration >= 100){
                clearInterval(speedChangeInterval);
            }
        }, 100);
    }
}

module.exports = Motor;