var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class AccelerometerWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(tinkerforge.BrickletAccelerometer.CALLBACK_ACCELERATION, this.accelerationValueChanged.bind(this));
        this.setCallbackInterval(100);
    }

    accelerationValueChanged(x, y, z, err) {
        return super.valueChanged({ "x": x, "y": y, "z": z }, err);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setAccelerationCallbackPeriod(intervalInMs);
    }
}

exports.AccelerometerWrapper = AccelerometerWrapper;