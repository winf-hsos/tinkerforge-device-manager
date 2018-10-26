var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class BarometerV2Wrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(tinkerforge.BrickletBarometerV2.CALLBACK_AIR_PRESSURE, this.airPressureValueChanged.bind(this));
        this.device.on(tinkerforge.BrickletBarometerV2.CALLBACK_ALTITUDE, this.altitudeValueChanged.bind(this));
        this.device.on(tinkerforge.BrickletBarometerV2.CALLBACK_TEMPERATURE, this.temperatureValueChanged.bind(this));

        this.setCallbackInterval(500);
    }

    airPressureValueChanged(value, err) {
        return super.valueChanged({ type: "air_pressure", value: value }, err);
    }

    altitudeValueChanged(value, err) {
        return super.valueChanged({ type: "altitude", value: value }, err);
    }

    temperatureValueChanged(value, err) {
        return super.valueChanged({ type: "temperature", value: value }, err);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setAirPressureCallbackConfiguration(intervalInMs, false, 'x', 0, 0);
        this.device.setAltitudeCallbackConfiguration(intervalInMs, false, 'x', 0, 0);
        this.device.setTemperatureCallbackConfiguration(intervalInMs, false, 'x', 0, 0);
    }
}

exports.BarometerV2Wrapper = BarometerV2Wrapper;