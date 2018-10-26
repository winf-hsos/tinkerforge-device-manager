var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class AirQualityWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(tinkerforge.BrickletAirQuality.CALLBACK_ALL_VALUES, this.airQualityValueChanged.bind(this));

        this.setCallbackInterval(500);
    }

    airQualityValueChanged(iaqIndex, iaqIndexAccuracy, temperature, humidity, airPressure, err) {
        var value = {
            iaqIndex: iaqIndex,
            iaqIndexAccuracy: iaqIndexAccuracy,
            temperature: temperature,
            humidity: humidity,
            airPressure: airPressure
        }

        return super.valueChanged(value, err);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setAllValuesCallbackConfiguration(intervalInMs, false);
    }
}

exports.AirQualityWrapper = AirQualityWrapper;