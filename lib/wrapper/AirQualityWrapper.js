var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class AirQualityWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(tinkerforge.BrickletAirQuality.CALLBACK_ALL_VALUES, this.airQualityValueChanged.bind(this));

        this.setCallbackInterval(500);
    }

    airQualityValueChanged(iaqIndex, iaqIndexAccuracy, temperature, humidity, airPressure, err) {

        var values = [];
        var sensorId = this.uid + "_airquality";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'iaqIndex',
            value: iaqIndex
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'iaqIndexAccuracy',
            value: iaqIndexAccuracy
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'temperature',
            value: temperature
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'humidity',
            value: humidity
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'airPressure',
            value: airPressure
        })

        return super.valueChanged(values, err);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setAllValuesCallbackConfiguration(intervalInMs, false);
    }
}

exports.AirQualityWrapper = AirQualityWrapper;