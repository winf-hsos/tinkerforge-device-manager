var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class BarometerWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);
        
        this.device.on(tinkerforge.BrickletBarometer.CALLBACK_AIR_PRESSURE, this.airPressureValueChanged.bind(this));
        this.setCallbackInterval(500);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setAirPressureCallbackPeriod(intervalInMs);
    }

    airPressureValueChanged(value, err) {
        var values = [];
        var sensorId = this.uid + "_barometer";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'air_pressure',
            value: value
        })
        return super.valueChanged(values, err);
    }

}

exports.BarometerWrapper = BarometerWrapper;