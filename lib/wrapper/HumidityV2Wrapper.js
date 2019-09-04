var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class HumidityV2Wrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(tinkerforge.BrickletHumidityV2.CALLBACK_HUMIDITY, this.humidityValueChanged.bind(this));
        this.device.on(tinkerforge.BrickletHumidityV2.CALLBACK_TEMPERATURE, this.temperatureValueChanged.bind(this));
        this.setCallbackInterval(500);
    }

    humidityValueChanged(value, err) {

        var values = [];
        var sensorId = this.uid + "_humidity";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'humidity',
            value: value
        })
        return super.valueChanged(values, err);
    }

    temperatureValueChanged(value, err) {
        var values = [];
        var sensorId = this.uid + "_humidity";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'temperature',
            value: value
        })
        return super.valueChanged(values, err);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setHumidityCallbackConfiguration(intervalInMs, false, 'x', 0, 0);
        this.device.setTemperatureCallbackConfiguration(intervalInMs, false, 'x', 0, 0);
    }

}

exports.HumidityV2Wrapper = HumidityV2Wrapper;