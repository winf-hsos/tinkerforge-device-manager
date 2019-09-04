var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class DistanceUSV2Wrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(tinkerforge.BrickletDistanceUSV2.CALLBACK_DISTANCE, this.distanceValueChanged.bind(this));
        this.setCallbackInterval(100);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setDistanceCallbackConfiguration(intervalInMs, false, 'x', 0, 0);
    }

    distanceValueChanged(distance, err) {
        var values = [];
        var sensorId = this.uid + "_distance_us";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'distance',
            value: distance
        })
        return super.valueChanged(values, err);
    }

}

exports.DistanceUSV2Wrapper = DistanceUSV2Wrapper;