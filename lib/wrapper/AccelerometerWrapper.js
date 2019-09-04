var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class AccelerometerWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(tinkerforge.BrickletAccelerometer.CALLBACK_ACCELERATION, this.accelerationValueChanged.bind(this));
        this.setCallbackInterval(100);
    }

    accelerationValueChanged(x, y, z, err) {

        var values = [];
        var sensorId = this.uid + "_acceleration";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'x',
            value: x
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'y',
            value: y
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'z',
            value: z
        })

        return super.valueChanged(values, err);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setAccelerationCallbackPeriod(intervalInMs);
    }
}

exports.AccelerometerWrapper = AccelerometerWrapper;