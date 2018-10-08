var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class BarometerWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);
        
        this.device.on(tinkerforge.BrickletBarometer.CALLBACK_AIR_PRESSURE, this.valueChanged.bind(this));
        this.setCallbackInterval(500);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setAirPressureCallbackPeriod(intervalInMs);
    }

}

exports.BarometerWrapper = BarometerWrapper;