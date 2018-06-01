var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class OutdoorWeatherWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(tinkerforge.BrickletOutdoorWeather.CALLBACK_STATION_DATA, this.stationDataChanged.bind(this));
        this.device.on(tinkerforge.BrickletOutdoorWeather.CALLBACK_SENSOR_DATA, this.sensorDataChanged.bind(this));
        this.device.setStationCallbackConfiguration(true);
        this.device.setSensorCallbackConfiguration(true);

    }

    stationDataChanged(identifier, temperature, humidity, windSpeed, gustSpeed, rain,
        windDirection, batteryLow) {
        console.log("station not implemented yet");
        //return super.valueChanged({ type: "station", value : value}, err);
    }

    sensorDataChanged(identifier, temperature, humidity) {
        var dataObj = {};
        dataObj.temperature = temperature;
        dataObj.humidity = humidity;
        dataObj.stationIdentifier = identifier;
        return super.valueChanged(dataObj);
    }
}

exports.OutdoorWeatherWrapper = OutdoorWeatherWrapper;