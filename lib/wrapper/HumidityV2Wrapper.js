var Tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class HumidityV2Wrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);
        
        this.device.on(Tinkerforge.BrickletHumidityV2.CALLBACK_HUMIDITY, this.humidityValueChanged.bind(this));
        this.device.on(Tinkerforge.BrickletHumidityV2.CALLBACK_TEMPERATURE, this.temperatureValueChanged.bind(this));
        this.setCallbackInterval(500);
    }
    
    humidityValueChanged(value, err) {
        return super.valueChanged({ type: "humidity", value : value}, err);
    }
   
    temperatureValueChanged(value, err) {
        return super.valueChanged({ type: "temperature", value : value}, err);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setHumidityCallbackConfiguration(intervalInMs, false, 'x', 0, 0);
        this.device.setTemperatureCallbackConfiguration(intervalInMs, false, 'x', 0, 0);        
    }

}

exports.HumidityV2Wrapper = HumidityV2Wrapper;