var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class CO2V2Wrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(tinkerforge.BrickletCO2V2.CALLBACK_ALL_VALUES, this.co2ValueChanged.bind(this));
        this.setCallbackInterval(500);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setAllValuesCallbackConfiguration(intervalInMs);
    }

    co2ValueChanged(co2Concentration, temperature, humidity, err) {
        var values = [];
        var sensorId = this.uid + "_co2";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'co2',
            value: co2Concentration
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

        return super.valueChanged(values, err);
    }

}

exports.CO2V2Wrapper = CO2V2Wrapper;