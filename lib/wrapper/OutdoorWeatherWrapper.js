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
        var dataObj = {
            type: "station",
            stationIdentifier: identifier,
            temperature: temperature,
            humidity: humidity,
            windSpeed: windSpeed,
            gustSpeed: gustSpeed,
            rain: rain,
            windDirection: windDirection,
            batteryLow: batteryLow
        }

        return super.valueChanged(dataObj);
    }

    sensorDataChanged(identifier, temperature, humidity) {
        var dataObj = {};
        dataObj.type = "sensor";
        dataObj.temperature = temperature;
        dataObj.humidity = humidity;
        dataObj.stationIdentifier = identifier;
        return super.valueChanged( dataObj );
    }
}

exports.OutdoorWeatherWrapper = OutdoorWeatherWrapper;