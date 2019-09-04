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

    altitudeValueChanged(value, err) {
        var values = [];
        var sensorId = this.uid + "_barometer";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'altitude',
            value: value
        })

        return super.valueChanged(values, err);
    }

    temperatureValueChanged(value, err) {
        var values = [];
        var sensorId = this.uid + "_barometer";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'temperature',
            value: value
        })

        return super.valueChanged(values, err);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setAirPressureCallbackConfiguration(intervalInMs, false, 'x', 0, 0);
        this.device.setAltitudeCallbackConfiguration(intervalInMs, false, 'x', 0, 0);
        this.device.setTemperatureCallbackConfiguration(intervalInMs, false, 'x', 0, 0);
    }
}

exports.BarometerV2Wrapper = BarometerV2Wrapper;